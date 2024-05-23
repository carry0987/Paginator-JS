export interface PaginatorEvents {
    go: (pageNumber: number, done?: () => void) => void;
    previous: (done?: () => void) => void;
    next: (done?: () => void) => void;
    refresh: (done?: () => void) => void;
    disable: () => void;
    enable: () => void;
    show: () => void;
    hide: () => void;
    destroy: () => void;
}
