import styles from './landing.module.css';

export const LandingFooter = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerGrid}>
                    <div>
                        <a href="/" className={styles.logo}>
                            <span className={styles.logoAccent}>D</span>imaRazrab
                        </a>
                        <p className={styles.footerDesc}>
                            Разработка ботов, сервисов, автоматизация и веб-приложения для бизнеса.
                        </p>
                    </div>
                    <div>
                        <h4>Навигация</h4>
                        <a href="/">Главная</a>
                        <a href="/razrabotka-botov">Разработка ботов</a>
                        <a href="/razrabotka-servisov">Разработка сервисов</a>
                        <a href="/razrabotka-crm">Разработка CRM</a>
                        <a href="/avtomatizaciya-biznesa">Автоматизация бизнеса</a>
                    </div>
                    <div>
                        <h4>Блог</h4>
                        <a href="/blog">Все статьи</a>
                        <a href="/blog/telegram-bot-dlya-priyoma-zayavok">Бот для приёма заявок</a>
                        <a href="/blog/telegram-bot-dlya-internet-magazina">Бот для интернет-магазина</a>
                        <a href="/blog/telegram-bot-dlya-zapisi-klientov">Бот для записи клиентов</a>
                        <a href="/blog/kak-sdelat-telegram-bota-na-python">Бот на Python</a>
                        <a href="/blog/ai-telegram-bot-dlya-biznesa">AI-бот для бизнеса</a>
                        <a href="/blog/telegram-bot-dlya-biznesa">Бот для бизнеса</a>
                        <a href="/blog/skolko-stoit-razrabotka-telegram-bota">Стоимость бота</a>
                        <a href="/blog/razrabotka-telegram-bota-pod-klyuch">Разработка под ключ</a>
                        <a href="/blog/telegram-bot-dlya-prodazh">Бот для продаж</a>
                        <a href="/blog/kak-sozdat-ai-bot-telegram">Создать AI-бота</a>
                    </div>
                    <div>
                        <h4>Информация</h4>
                        <a href="/privacy" target="_blank" rel="noopener noreferrer">
                            Политика конфиденциальности
                        </a>
                        <a href="mailto:dima@example.com">dima@example.com</a>
                    </div>
                    <div>
                        <h4>Связаться</h4>
                        <a href="https://t.me/dima_razrab" target="_blank" rel="noopener noreferrer">
                            Telegram: @dima_razrab
                        </a>
                    </div>
                </div>
                <div className={styles.footerBottom}>
                    <p>© {new Date().getFullYear()} Дмитрий Малышев. Все права защищены.</p>
                    <p>Самозанятый • Малышев Дмитрий • ИНН: 511690069470</p>
                </div>
            </div>
        </footer>
    );
};
