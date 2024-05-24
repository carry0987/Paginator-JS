import { Interfaces } from '@carry0987/utils';
import { EventEmitter } from '@carry0987/event-emitter';

interface IPaginator {
    go(pageNumber: number, callback?: () => void): void;
    previous(callback?: () => void): void;
    next(callback?: () => void): void;
    disable(): void;
    enable(): void;
    show(): void;
    hide(): void;
    destroy(): void;
}

type DataSource<T = object> = string | T | Array<T> | ((data: T) => Array<T>);

interface CommonOptions {
    dataSource: DataSource;
    locator: string | (() => string);
    totalNumber: number;
    totalNumberLocator: ((response: DataSource<object>) => number) | null;
    pageNumber: number;
    pageSize: number | null;
    pageRange: number;
    callback?: (data: DataSource<Array<any>>, paginator: IPaginator) => void;
    alias: Record<string, string>;
}
interface DisplayControls {
    showPrevious: boolean;
    showNext: boolean;
    showPageNumbers: boolean;
    showNavigator: boolean;
    hideFirstOnEllipsisShow: boolean;
    hideLastOnEllipsisShow: boolean;
    autoHidePrevious: boolean;
    autoHideNext: boolean;
}
interface StyleOptions {
    classPrefix: string;
    className: string;
    activeClassName: string;
    disableClassName: string;
    ulClassName: string;
    pageClassName: string;
    prevClassName: string;
    nextClassName: string;
}
interface CustomizeOptions {
    prevText: string;
    nextText: string;
    ellipsisText: string;
    goButtonText: string;
    formatNavigator: string | ((currentPage: number, totalPage: number, totalNumber: number, rangeStart?: number, rangeEnd?: number) => string);
    header: string | ((currentPage: number, totalPage: number, totalNumber: number) => string);
    footer: string | ((currentPage: number, totalPage: number, totalNumber: number) => string);
    pageLink: string;
    position: string;
}
interface UtilitiesOptions {
    formatResult: (data: DataSource<Array<any>>) => DataSource<Array<any>>;
    dataLoader: ((data?: Array<any>, paginator?: IPaginator) => void) | DataLoader;
    dataLoaderFunction?: (paginator: IPaginator) => void;
    triggerPagingOnInit: boolean;
    resetPageNumberOnInit: boolean;
    hideOnlyOnePage: boolean;
    onError: (err: unknown) => void;
}
interface StorageResponse {
    data: DataSource;
    total: number;
}
interface PageData {
    isAsync: boolean;
    direction: number;
    currentPage: number;
    totalNumber: number;
    totalPage: number;
}
interface DataLoader {
    method: string;
    data: Record<string, unknown> | ((opts: DataLoader) => Promise<StorageResponse>);
    cache?: RequestCache;
    headers?: HeadersInit;
    mode?: RequestMode;
    beforeSend: (data: DataLoader) => void;
    credentials?: RequestCredentials;
    pageNumberStartWithZero: boolean;
}
interface Options extends CommonOptions, DisplayControls, StyleOptions, CustomizeOptions, UtilitiesOptions {
}
interface SendFormDataOptions extends Interfaces.SendFormDataOptions {
}

interface PaginatorEvents {
    go: (pageNumber: number, done?: () => void) => void;
    previous: (done?: () => void) => void;
    next: (done?: () => void) => void;
    disable: () => void;
    enable: () => void;
    show: () => void;
    hide: () => void;
    destroy: () => void;
}
interface InternalEvents {
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

declare class Paginator extends EventEmitter<PaginatorEvents & InternalEvents> implements IPaginator {
    private static version;
    private static instances;
    private static firstLoad;
    private instanceID;
    private options;
    private pageData;
    private container;
    private element;
    private disabled;
    private isDynamicTotalNumber;
    constructor(element: string | Element, options: Partial<Options>);
    private initialize;
    private parseDataSource;
    private initPageTrigger;
    private renderHTML;
    private renderData;
    private doCallback;
    private observer;
    private getPagingData;
    private getTotalNumber;
    private getTotalPage;
    private getLocator;
    private filterDataWithLocator;
    private bindEvents;
    private unbindEvents;
    private getPageLinkTag;
    private generatePageNumbersHTML;
    private generateHTML;
    private findTotalNumberFromRemoteResponse;
    go(pageNumber: number, callback?: () => void): Promise<void>;
    destroy(): void;
    previous(callback?: () => void): Promise<void>;
    next(callback?: () => void): Promise<void>;
    disable(): void;
    enable(): void;
    show(): void;
    hide(): void;
    private replaceVariables;
    get version(): string;
}

export { type DataLoader, type IPaginator, type Options, type PageData, type SendFormDataOptions, Paginator as default };
