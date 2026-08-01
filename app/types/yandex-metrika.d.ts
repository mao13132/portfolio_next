export {};

declare global {
    interface Window {
        /** Яндекс.Метрика — функция отправки событий */
        ym: (id: number, method: string, ...args: unknown[]) => void;
    }
}
