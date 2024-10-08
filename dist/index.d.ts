import * as preact from 'preact';
import { ComponentChild, FunctionComponent, VNode, JSX } from 'preact';
export { h } from 'preact';
import { Interfaces } from '@carry0987/utils';
import { EventEmitter } from '@carry0987/event-emitter';
import { Pipeline } from '@carry0987/pipeline';
import { useEffect, useState, useRef } from 'preact/hooks';

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
    [key: string]: any;
}

interface InternalEvents {
    go: (pageNumber: number) => void;
}

/**
 * Paginator events
 */
type PaginatorEvents = PageEvents & InternalEvents;

type ID = string;
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

declare enum PluginPosition {
    Header = 0,
    Body = 1,
    Footer = 2,
    Cell = 3
}

interface Plugin<T extends FunctionComponent> {
    id: string;
    position: PluginPosition;
    component: T;
    order?: number;
}

type MessageFormat = (...args: any[]) => string;
type Message = string | MessageFormat;
type Language = {
    [key: string]: Message | Language;
};

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

interface TColumn {
    id?: string;
    data?: ((row: TDataArrayRow | TDataObjectRow) => TCell) | TCell;
    name?: string | ComponentChild;
    hidden?: boolean;
    plugin?: Plugin<any>;
    formatter?: (cell: TCell, row: Row, column: TColumn) => ComponentChild;
}

interface MainOptions {
    container?: Element;
    data?: TData | (() => TData) | (() => Promise<TData>);
    columns: OneDArray<TColumn | string | ComponentChild>;
    server?: ServerStorageOptions;
    language: Language;
}
interface PluginOptions {
    pluginContainer?: Element;
    plugins?: Plugin<any>[];
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
interface Options extends MainOptions, CommonOptions, PluginOptions {
    display: Partial<DisplayControls>;
    className: Partial<ClassName>;
}

declare class PluginManager {
    private readonly plugins;
    constructor();
    get<T extends FunctionComponent>(id: string): Plugin<T> | undefined;
    add<T extends FunctionComponent<any>>(plugin: Plugin<T>): this;
    remove(id: string): this;
    list<T extends FunctionComponent>(position?: PluginPosition): Plugin<T>[];
}

declare class Paginator extends EventEmitter<PaginatorEvents> {
    private static version;
    private config;
    plugin: PluginManager;
    constructor(config: Partial<Options>);
    get version(): string;
    updateConfig(config: Partial<Options>): this;
    forceRender(): this;
    destroy(): void;
    render(container: Element): this;
    private createPluginElement;
    private createElement;
}

interface HTMLContentProps {
    content: string;
    parentElement?: string;
}

declare function html(content: string, parentElement?: string): VNode<HTMLContentProps>;

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

declare class Config {
    private internalConfig;
    options: Options;
    constructor();
    assign(partialOption: Partial<Options>): this;
    assignInteral(partialConfig: Partial<InternalConfig>): this;
    update(partialOption: Partial<Options>): this;
    get internal(): InternalConfig;
    private static defaultConfig;
    private static defaultOption;
    private static fromPartialConfig;
    private static fromPartialOption;
}

declare class Header extends Base {
    private _columns;
    constructor();
    get columns(): OneDArray<TColumn>;
    set columns(columns: OneDArray<TColumn>);
    get visibleColumns(): OneDArray<TColumn>;
    private setID;
    private populatePlugins;
    /**
     * Creates a new Header from a Config object
     * This method generates a new ID for the Header and all nested elements
     * It also populates the plugin manager with the plugins from the columns
     *
     * @param config
     */
    static createFromConfig(config: Config): Header | undefined;
    /**
     * Returns an array of leaf columns (last columns in the tree)
     *
     * @param columns
     */
    static leafColumns(columns: OneDArray<TColumn>): OneDArray<TColumn>;
    /**
     * Converts the tree-like format of Header to a tabular format
     *
     * @param columns
     */
    static tabularFormat(columns: OneDArray<TColumn>): TwoDArray<TColumn>;
    private static isJsonPayload;
    private static fromColumns;
}

declare enum Status {
    Init = 0,
    Loading = 1,
    Loaded = 2,
    Rendered = 3,
    Error = 4
}

interface State {
    status: Status;
    tabular: Tabular | null;
    header: Header | null;
    [key: string]: any;
}

declare enum ProcessorType {
    Initiator = 0,
    ServerLimit = 1,
    Extractor = 2,
    Transformer = 3,
    Limit = 4
}

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

interface InternalConfig {
    instance: Paginator;
    state: StateManager<State>;
    eventEmitter: EventEmitter<PaginatorEvents>;
    storage: Storage<any>;
    pipeline: Pipeline<Tabular | ServerStorageOptions, ProcessorType>;
    header?: Header;
    translator: Translator;
    plugin: PluginManager;
}

declare function useStore(): StateManager<State>;

declare function useSelector<T>(selector: (state: State) => T): T;

declare function useTranslator(): (message: string, ...args: any[]) => string;

declare class PluginAPI {
    useStore: typeof useStore;
    useSelector: typeof useSelector;
    useConfig: () => InternalConfig;
    useOption: () => Options;
    useTranslator: typeof useTranslator;
    useEffect: typeof useEffect;
    useState: typeof useState;
    useRef: typeof useRef;
}
declare const pluginAPI: PluginAPI;

declare function PluginRenderer(props: {
    props?: any;
    pluginId?: string;
    position?: PluginPosition;
}): preact.VNode<preact.Attributes> | null;

declare function className(...args: string[]): string;
declare function classJoin(...classNames: (undefined | null | string | JSX.SignalLike<string>)[]): string;

declare class PluginUtil {
    Status: typeof Status;
    leafColumns: typeof Header.leafColumns;
    tabularFormat: typeof Header.tabularFormat;
    PluginRenderer: typeof PluginRenderer;
    classJoin: typeof classJoin;
    className: typeof className;
}
declare const pluginUtil: PluginUtil;

export { type Options, Paginator, PluginPosition, html, pluginAPI, pluginUtil };
