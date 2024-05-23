import { Interfaces } from '@carry0987/utils';

interface IPaginator {
    go(pageNumber: number, callback?: () => void): void;
    previous(callback?: () => void): void;
    next(callback?: () => void): void;
    disable(): void;
    enable(): void;
    refresh(callback?: () => void): void;
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
interface EventOptions {
    afterInit?: (paginator: IPaginator, ...args: any[]) => boolean | void;
    beforeRender?: (paginator: IPaginator, isBoot: boolean) => boolean | void;
    afterRender?: (paginator: IPaginator, isBoot: boolean) => boolean | void;
    beforePageOnClick?: (paginator: IPaginator, event: Event, pageNumber: string) => boolean | void;
    afterPageOnClick?: (paginator: IPaginator, event: Event, pageNumber: string) => boolean | void;
    beforePreviousOnClick?: (paginator: IPaginator, event: Event, pageNumber: string) => boolean | void;
    afterPreviousOnClick?: (paginator: IPaginator, event: Event, pageNumber: string) => boolean | void;
    beforeNextOnClick?: (paginator: IPaginator, event: Event, pageNumber: string) => boolean | void;
    afterNextOnClick?: (paginator: IPaginator, event: Event, pageNumber: string) => boolean | void;
    beforeGoButtonOnClick?: (paginator: IPaginator, event: Event, pageNumber: string) => boolean | void;
    afterGoButtonOnClick?: (paginator: IPaginator, event: Event, pageNumber: string) => boolean | void;
    beforeSizeSelectorChange?: (paginator: IPaginator, event: Event, size: number) => boolean | void;
    afterSizeSelectorChange?: (paginator: IPaginator, event: Event, size: number) => boolean | void;
    beforeDisable?: (paginator: IPaginator, source: string) => boolean | void;
    afterDisable?: (paginator: IPaginator, source: string) => boolean | void;
    beforeEnable?: (paginator: IPaginator, source: string) => boolean | void;
    afterEnable?: (paginator: IPaginator, source: string) => boolean | void;
    beforePaging?: (paginator: IPaginator, pageNumber: number) => boolean | void;
    afterPaging?: (paginator: IPaginator, pageNumber: number) => boolean | void;
    beforeDestroy?: (paginator: IPaginator) => boolean | void;
    afterDestroy?: (paginator: IPaginator) => boolean | void;
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
interface Options extends CommonOptions, DisplayControls, StyleOptions, EventOptions, CustomizeOptions, UtilitiesOptions {
}
interface SendFormDataOptions extends Interfaces.SendFormDataOptions {
}

declare class Paginator implements IPaginator {
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
    private eventPrefix;
    constructor(element: string | Element, options: Partial<Options>);
    private initialize;
    private parseDataSource;
    private initPageTrigger;
    private renderHTML;
    private renderData;
    private callHook;
    private observer;
    private getPagingData;
    private getTotalNumber;
    private getTotalPage;
    private getLocator;
    private filterDataWithLocator;
    private bindEvents;
    private getPageLinkTag;
    private generatePageNumbersHTML;
    private generateHTML;
    private findTotalNumberFromRemoteResponse;
    go(pageNumber: number, callback?: () => void): Promise<void>;
    private doCallback;
    destroy(): void;
    previous(callback?: () => void): Promise<void>;
    next(callback?: () => void): Promise<void>;
    disable(): void;
    enable(): void;
    refresh(callback?: () => void): Promise<void>;
    show(): void;
    hide(): void;
    private replaceVariables;
    private unbindEvents;
    private eventHandlers;
    get version(): string;
}

export { type DataLoader, type IPaginator, type Options, type PageData, type SendFormDataOptions, Paginator as default };
