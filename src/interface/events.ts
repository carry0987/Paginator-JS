export interface PaginatorEvents {
    go: (pageNumber: number, done?: () => void) => void;
    previous: (done?: () => void) => void;
    next: (done?: () => void) => void;
    disable: () => void;
    enable: () => void;
    show: () => void;
    hide: () => void;
    destroy: () => void;
}

export interface InternalEvents {
    afterInit: (ele: HTMLElement) => boolean | void;
    beforeRender: (isBoot: boolean) => boolean | void;
    afterRender: (isBoot: boolean) => boolean | void;
    beforePageOnClick: (event: Event, pageNumber: string) => boolean | void;
    afterPageOnClick: (event: Event, pageNumber: string) => boolean | void;
    beforePreviousOnClick: (event: Event, pageNumber: string) => boolean | void;
    afterPreviousOnClick: (event: Event, pageNumber: string) => boolean | void;
    beforeNextOnClick: (event: Event, pageNumber: string) => boolean | void;
    afterNextOnClick: (event: Event, pageNumber: string) => boolean | void;
    beforeGoButtonOnClick: (event: Event, pageNumber: string) => boolean | void;
    afterGoButtonOnClick: (event: Event, pageNumber: string) => boolean | void;
    beforeSizeSelectorChange: (event: Event, size: number) => boolean | void;
    afterSizeSelectorChange: (event: Event, size: number) => boolean | void;
    afterIsFirstPage: () => boolean | void;
    afterIsLastPage: () => boolean | void;
    beforeDisable: (source: string) => boolean | void;
    afterDisable: (source: string) => boolean | void;
    beforeEnable: (source: string) => boolean | void;
    afterEnable: (source: string) => boolean | void;
    beforePaging: (pageNumber: number) => boolean | void;
    afterPaging: (pageNumber: number) => boolean | void;
    beforeDestroy: () => boolean | void;
    afterDestroy: () => boolean | void;
}
