// ============================================================
// Journey Chain — трекинг пути пользователя по сайту
// Хранит данные в sessionStorage, отправляет с формами
// ============================================================

const STORAGE_KEY = 'journey_data';

// --- Типы ---

export interface PageVisit {
  page: string;
  ts: number;           // timestamp входа
  timeOnPage: number;   // секунды на странице (обновляется при уходе)
  scrollDepth: number;  // максимальный % прокрутки (0-100)
  ctaClicks: string[];  // какие CTA были нажаты на этой странице
}

export interface DeviceInfo {
  screen: string;       // "1920x1080"
  mobile: boolean;
  browser: string;
  os: string;
  language: string;
  timezone: string;
}

export interface EntrySource {
  referrer: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  landingPage: string;
}

export interface FormInteraction {
  started: boolean;
  startedAt: number | null;
  fieldOrder: string[];
  timeToSubmit: number | null;
  attempts: number;
}

export interface JourneyData {
  journey: PageVisit[];
  device: DeviceInfo;
  entry: EntrySource;
  form: FormInteraction;
  visits: number;           // номер сессии
  firstVisit: string;       // ISO дата первого визита
  lastVisit: string;        // ISO дата предыдущего визита
  createdAt: number;        // timestamp создания
}

// --- Вспомогательные функции ---

function getBrowser(): string {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
  return 'unknown';
}

function getOS(): string {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent;
  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Mac OS')) return 'macOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
  return 'unknown';
}

function isMobile(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Mobile|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function getDevice(): DeviceInfo {
  return {
    screen: typeof window !== 'undefined'
      ? `${window.screen.width}x${window.screen.height}`
      : 'unknown',
    mobile: isMobile(),
    browser: getBrowser(),
    os: getOS(),
    language: typeof navigator !== 'undefined' ? navigator.language : 'ru-RU',
    timezone: typeof Intl !== 'undefined'
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : 'Europe/Moscow',
  };
}

function getEntrySource(landingPage: string): EntrySource {
  if (typeof window === 'undefined') {
    return {
      referrer: '', utm_source: null, utm_medium: null,
      utm_campaign: null, utm_term: null, utm_content: null,
      landingPage,
    };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    referrer: document.referrer || '',
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    utm_term: params.get('utm_term'),
    utm_content: params.get('utm_content'),
    landingPage,
  };
}

// --- Основной трекер ---

class JourneyTracker {
  private data: JourneyData | null = null;
  private pageEnterTime: number = 0;
  private maxScroll: number = 0;
  private scrollListener: (() => void) | null = null;
  private visibilityListener: (() => void) | null = null;
  private initialized = false;

  /** Инициализация — вызывается один раз при загрузке приложения */
  init(pathname: string) {
    if (typeof window === 'undefined' || this.initialized) return;
    this.initialized = true;

    const now = Date.now();
    const existing = this.load();
    const isFirstVisit = !existing;

    if (existing) {
      this.data = existing;
      this.data.visits += 1;
      this.data.lastVisit = new Date().toISOString();
    } else {
      this.data = {
        journey: [],
        device: getDevice(),
        entry: getEntrySource(pathname),
        form: {
          started: false,
          startedAt: null,
          fieldOrder: [],
          timeToSubmit: null,
          attempts: 0,
        },
        visits: 1,
        firstVisit: new Date().toISOString(),
        lastVisit: new Date().toISOString(),
        createdAt: now,
      };
    }

    // Сброс данных формы для новой сессии
    this.data.form = {
      started: false,
      startedAt: null,
      fieldOrder: [],
      timeToSubmit: null,
      attempts: 0,
    };

    this.startPage(pathname);
    this.setupScrollTracking();
    this.setupVisibilityTracking();
    this.save();
  }

  /** Начать отслеживание новой страницы */
  startPage(pathname: string) {
    if (!this.data) return;

    // Закрыть предыдущую страницу
    this.closeCurrentPage();

    this.pageEnterTime = Date.now();
    this.maxScroll = 0;

    // Добавляем новую запись
    this.data.journey.push({
      page: pathname,
      ts: this.pageEnterTime,
      timeOnPage: 0,
      scrollDepth: 0,
      ctaClicks: [],
    });

    this.save();
  }

  /** Закрыть текущую страницу (записать время и скролл) */
  private closeCurrentPage() {
    if (!this.data || this.data.journey.length === 0) return;

    const current = this.data.journey[this.data.journey.length - 1];
    current.timeOnPage = Math.round((Date.now() - this.pageEnterTime) / 1000);
    current.scrollDepth = this.maxScroll;
  }

  /** Трекинг скролла */
  private setupScrollTracking() {
    if (typeof window === 'undefined') return;

    this.scrollListener = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const percent = Math.min(100, Math.round((scrollTop / docHeight) * 100));
        if (percent > this.maxScroll) {
          this.maxScroll = percent;
        }
      }
    };

    window.addEventListener('scroll', this.scrollListener, { passive: true });
  }

  /** Трекинг visibilitychange — обновляет timeOnPage при уходе/возврате */
  private setupVisibilityTracking() {
    if (typeof window === 'undefined') return;

    this.visibilityListener = () => {
      if (document.visibilityState === 'hidden') {
        this.closeCurrentPage();
        this.save();
      }
    };

    document.addEventListener('visibilitychange', this.visibilityListener);
  }

  /** Записать клик по CTA */
  trackCtaClick(ctaId: string) {
    if (!this.data || this.data.journey.length === 0) return;

    const current = this.data.journey[this.data.journey.length - 1];
    if (!current.ctaClicks.includes(ctaId)) {
      current.ctaClicks.push(ctaId);
      this.save();
    }
  }

  /** Записать начало заполнения формы */
  trackFormStart() {
    if (!this.data) return;
    if (!this.data.form.started) {
      this.data.form.started = true;
      this.data.form.startedAt = Date.now();
      this.save();
    }
  }

  /** Записать заполнение поля формы */
  trackFormField(fieldName: string) {
    if (!this.data) return;
    if (!this.data.form.fieldOrder.includes(fieldName)) {
      this.data.form.fieldOrder.push(fieldName);
      this.save();
    }
  }

  /** Записать попытку отправки формы */
  trackFormSubmit() {
    if (!this.data) return;
    this.data.form.attempts += 1;
    if (this.data.form.startedAt) {
      this.data.form.timeToSubmit = Math.round(
        (Date.now() - this.data.form.startedAt) / 1000
      );
    }
    this.save();
  }

  /** Получить данные атрибуции для отправки с формой */
  getAttribution(): JourneyData | null {
    if (!this.data) return null;

    // Обновляем текущую страницу перед отправкой
    this.closeCurrentPage();

    return { ...this.data };
  }

  /** Получить краткую сводку для текста заявки */
  getSummary(): string {
    if (!this.data) return '';

    const pages = this.data.journey.map(v => {
      const time = v.timeOnPage > 0 ? `${v.timeOnPage}s` : '...';
      return `${v.page}(${time}, ${v.scrollDepth}%)`;
    });

    const parts = [
      `Путь: ${pages.join(' → ')}`,
      `Визитов: ${this.data.visits}`,
      `Устройство: ${this.data.device.mobile ? 'моб.' : 'десктоп'} ${this.data.device.browser}`,
    ];

    if (this.data.entry.utm_source) {
      parts.push(`Источник: ${this.data.entry.utm_source}`);
    }

    return parts.join(' | ');
  }

  // --- Persistence ---

  private save() {
    if (typeof window === 'undefined' || !this.data) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch { /* quota exceeded */ }
  }

  private load(): JourneyData | null {
    if (typeof window === 'undefined') return null;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}

// Singleton
export const journey = new JourneyTracker();
