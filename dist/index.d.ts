import { ComponentChild, VNode } from 'preact';
export { h } from 'preact';
import { Interfaces } from '@carry0987/utils';
import { EventEmitter } from '@carry0987/event-emitter';
import { Pipeline } from '@carry0987/pipeline';

type ID = string;
declare enum Status {
    Init = 0,
    Loading = 1,
    Loaded = 2,
    Rendered = 3,
    Error = 4
}
/**
 * Table cell types
 */
type OneDArray<T> = T[];
type TwoDArray<T> = T[][];
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
interface ServerStorageOptions extends RequestInit {
    url: string;
    processData?: <T = any>(data: T) => T[][];
    handle?: <T = StorageResponse>(response: T) => Promise<T>;
    total?: <T = any>(data: T) => number;
    data?: (opts: ServerStorageOptions) => Promise<StorageResponse>;
    param?: ServerStorageParam;
    pageUrl?: (prevUrl: string, page: number, limit: number) => string;
    pageBody?: (prevBody: BodyInit, page: number, limit: number) => BodyInit;
}

declare class Base {
    private readonly _id;
    constructor(id?: ID);
    get id(): ID;
}

declare class Cell extends Base {
    data: number | string | boolean | ComponentChild;
    constructor(data: TCell);
    private cast;
    /**
     * Updates the Cell's data
     *
     * @param data
     */
    update(data: TCell): Cell;
}

declare class Row extends Base {
    private _cells;
    constructor(cells?: Cell[]);
    cell(index: number): Cell;
    get cells(): Cell[];
    set cells(cells: Cell[]);
    toArray(): TCell[];
    /**
     * Creates a new Row from an array of Cell(s)
     * This method generates a new ID for the Row and all nested elements
     *
     * @param cells
     * @returns Row
     */
    static fromCells(cells: Cell[]): Row;
    get length(): number;
}

declare class Tabular extends Base {
    private _rows;
    private _length;
    constructor(rows?: Row[] | Row);
    get data(): Row[];
    set data(rows: Row[]);
    get length(): number;
    set length(len: number);
    toArray(): TCell[][];
    /**
     * Creates a new Tabular from an array of Row(s)
     * This method generates a new ID for the Tabular and all nested elements
     *
     * @param rows
     * @returns Tabular
     */
    static fromRows(rows: Row[]): Tabular;
    /**
     * Creates a new Tabular from a 2D array
     * This method generates a new ID for the Tabular and all nested elements
     *
     * @param data
     * @returns Tabular
     */
    static fromArray<T extends TCell>(data: OneDArray<T> | TwoDArray<T>): Tabular;
}

interface State {
    status: Status;
    tabular: Tabular | null;
}

interface TColumn {
    id?: string;
    data?: ((row: TDataArrayRow | TDataObjectRow) => TCell) | TCell;
    name?: string | ComponentChild;
    hidden?: boolean;
}

declare class Header extends Base {
    private _columns;
    constructor();
    get columns(): OneDArray<TColumn>;
    set columns(columns: OneDArray<TColumn>);
    get visibleColumns(): OneDArray<TColumn>;
    private setID;
    private static isJsonPayload;
    private static fromColumns;
    static createFromConfig(config: Config): Header | undefined;
    /**
     * Returns an array of leaf columns (last columns in the tree)
     *
     * @param columns
     */
    static leafColumns(columns: OneDArray<TColumn>): OneDArray<TColumn>;
}

interface PageEvents {
    ready: () => void;
    go: (pageNumber: number) => void;
}
interface InternalEvents {
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

/**
 * Paginator events
 */
type PaginatorEvents = PageEvents & InternalEvents;

declare enum ProcessorType {
    Initiator = 0,
    ServerLimit = 1,
    Extractor = 2,
    Transformer = 3,
    Limit = 4
}

type MessageFormat = (...args: any[]) => string;
type Message = string | MessageFormat;
type Language = {
    [key: string]: Message | Language;
};

declare class StateManager<S = Record<string, unknown>> {
    private state;
    private listeners;
    private isDispatching;
    constructor(initialState: S);
    getState: () => S;
    getListeners: () => ((current?: S, prev?: S) => void)[];
    dispatch: (reducer: (state: S) => S) => S;
    subscribe: (listener: (current?: S, prev?: S) => void) => (() => void);
}

/**
 * Base Storage class. All storage implementation must inherit this class
 */
declare abstract class Storage<I> {
    /**
     * Returns all rows based on ...args
     *
     * @param args
     */
    abstract get(...args: any[]): Promise<StorageResponse>;
    /**
     * To set all rows
     *
     * @param data
     */
    set?(data: I | ((...args: any[]) => void)): this;
}

declare class Translator {
    private readonly _language;
    private readonly _defaultLanguage;
    constructor(language: Language);
    /**
     * Tries to split the message with "." and find
     * the key in the given language
     *
     * @param message
     * @param lang
     */
    private getString;
    translate(message: string, ...args: any[]): string;
}

interface Config$1 {
    instance: Paginator;
    state: StateManager<State>;
    eventEmitter: EventEmitter<PaginatorEvents>;
    storage: Storage<any>;
    pipeline: Pipeline<Tabular | ServerStorageOptions, ProcessorType>;
    container?: Element;
    data?: TData | (() => TData) | (() => Promise<TData>);
    header?: Header;
    columns: OneDArray<TColumn | string | ComponentChild>;
    server?: ServerStorageOptions;
    language: Language;
    translator: Translator;
}

interface CommonOptions {
    pageNumber: number;
    pageSize: number;
    pageRange: number;
    beforeDataLoad?: () => void;
    dataRender?: (response: TCell[][]) => ComponentChild;
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
interface Options extends Config$1, CommonOptions {
    display: Partial<DisplayControls>;
    className: Partial<ClassName>;
}

declare class Config {
    options: Options;
    constructor();
    assign(partialConfig: Partial<Options>): this;
    update(partialConfig: Partial<Options>): this;
    private static defaultConfig;
    private static fromPartialConfig;
}

declare class Paginator extends EventEmitter<PaginatorEvents> {
    private static version;
    config: Config;
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

export { Config, Paginator, html };