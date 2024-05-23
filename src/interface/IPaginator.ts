export interface IPaginator {
    go(pageNumber: number, callback?: () => void): void;
    previous(callback?: () => void): void;
    next(callback?: () => void): void;
    disable(): void;
    enable(): void;
    show(): void;
    hide(): void;
    destroy(): void;
}
