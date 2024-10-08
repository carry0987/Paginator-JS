export interface PageEvents {
    ready: () => void;
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
    [key: string]: any;
}
