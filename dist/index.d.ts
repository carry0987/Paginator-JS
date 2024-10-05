import { ComponentChild, VNode } from 'preact';
export { h } from 'preact';
import { Interfaces } from '@carry0987/utils';
import { EventEmitter } from '@carry0987/event-emitter';

interface PageEvents {
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
}

interface InternalEvents {
    go: (pageNumber: number) => void;
}

/**
 * Paginator events
 */
type PaginatorEvents = PageEvents & InternalEvents;

/**
 * Table cell types
 */
type OneDArray<T> = T[];
type TCell = number | string | boolean | ComponentChild | HTMLElement;
type TDataArrayRow = OneDArray<TCell>;
type TDataArray = OneDArray<TDataArrayRow>;
type TDataObjectRow = {
    [key: string]: TCell;
};
type TDataObject = OneDArray<TDataObjectRow>;
type TData = TDataArray | TDataObject;

interface StorageResponse {
    data: TData;
    total: number;
}

type ServerStorageParam = Omit<Interfaces.FetchParams, 'url'>;
interface ServerStorageOptions {
    url: string;
    body?: BodyInit | null;
    processData?: <T = any>(data: T) => T[][];
    handle?: <T = StorageResponse>(response: T) => Promise<T>;
    total?: <T = any>(data: T) => number;
    data?: (opts: ServerStorageOptions) => Promise<StorageResponse>;
    param?: ServerStorageParam;
    pageUrl?: (prevUrl: string, page: number, limit: number) => string;
    pageBody?: (prevBody: BodyInit, page: number, limit: number) => BodyInit;
}

type MessageFormat = (...args: any[]) => string;
type Message = string | MessageFormat;
type Language = {
    [key: string]: Message | Language;
};

interface TColumn {
    id?: string;
    data?: ((row: TDataArrayRow | TDataObjectRow) => TCell) | TCell;
    name?: string | ComponentChild;
    hidden?: boolean;
}

interface MainOptions {
    container?: Element;
    data?: TData | (() => TData) | (() => Promise<TData>);
    columns: OneDArray<TColumn | string | ComponentChild>;
    server?: ServerStorageOptions;
    language: Language;
}
interface CommonOptions {
    pageNumber: number;
    pageSize: number;
    pageRange: number;
    beforeDataLoad?: () => void;
    dataRender?: (response: TCell[][]) => void;
    position: string;
    resetPageOnUpdate?: boolean;
}
interface DisplayControls {
    showPrevious: boolean;
    showNext: boolean;
    showPageNumbers: boolean;
    hideFirstOnEllipsisShow: boolean;
    hideLastOnEllipsisShow: boolean;
    autoHidePrevious: boolean;
    autoHideNext: boolean;
}
interface ClassName {
    container: string;
    active: string;
    disable: string;
    pageList: string;
    pageButton: string;
    prevButton: string;
    nextButton: string;
}
interface Options extends MainOptions, CommonOptions {
    display: Partial<DisplayControls>;
    className: Partial<ClassName>;
}

declare class Paginator extends EventEmitter<PaginatorEvents> {
    private static version;
    private config;
    constructor(config: Partial<Options>);
    get version(): string;
    updateConfig(config: Partial<Options>): this;
    forceRender(): this;
    destroy(): void;
    render(container: Element): this;
    private createElement;
}

interface HTMLContentProps {
    content: string;
    parentElement?: string;
}

declare function html(content: string, parentElement?: string): VNode<HTMLContentProps>;

export { type Options, Paginator, html };
