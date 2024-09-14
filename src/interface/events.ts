export interface PageEvents {
    ready: () => void;
    go: (pageNumber: number) => void;
}

export interface InternalEvents {
    rendered: () => void;
    pageClick: (pageNumber: number) => void;
    previousClick: (pageNumber: number) => void;
    nextClick: (pageNumber: number) => void;
    isFirstPage: () => void;
    isLastPage: () => void;
    beforePaging: (pageNumber: number) => void;
    afterPaging: (pageNumber: number) => void;
    beforeDestroy: () => void;
    afterDestroy: () => void;
}
