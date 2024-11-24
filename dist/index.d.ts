import * as preact from 'preact';
import { ComponentChild, FunctionComponent, VNode, JSX } from 'preact';
export { h } from 'preact';
import { Interfaces } from '@carry0987/utils';
import { EventEmitter } from '@carry0987/event-emitter';
import * as _carry0987_state_manager from '@carry0987/state-manager';
import { StateManager } from '@carry0987/state-manager';
import { Pipeline } from '@carry0987/pipeline';
import { useEffect, useCallback, useState, useRef, useMemo, useReducer } from 'preact/hooks';

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

/**
 * ID type for unique identification
 */
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

interface Plugin<T extends FunctionComponent<P>, P = any> {
    id: string;
    position: PluginPosition;
    component: T;
    props?: P;
    order?: number;
}

interface HTMLContentProps {
    content: string;
    parentElement?: string;
}

type MessageFormat = (...args: any[]) => VNode<HTMLContentProps> | string;
type Message = ReturnType<MessageFormat> | MessageFormat;
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
    pluginClassName?: Partial<{
        container: string;
        wrapper: string;
        footer: string;
        header: string;
    }>;
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
    add<P = any, T extends FunctionComponent<P> = FunctionComponent<P>>(plugin: Plugin<T, P>): this;
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
    /**
     * Checks if the given value is a valid VNode
     *
     * @param val
     */
    private isValidElement;
    /**
     * Translates the given message using the current language.
     * Falls back to the default language if the translation is not available.
     *
     * @param message
     * @param args
     */
    translate(message: string, ...args: any[]): VNode<HTMLContentProps> | string;
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

declare function useStore(): _carry0987_state_manager.StateManager<State>;

declare function useSelector<T>(selector: (state: State) => T): T;

declare function useTranslator(): (message: string, ...args: any[]) => ReturnType<MessageFormat>;

declare class PluginAPI {
    useStore: typeof useStore;
    useSelector: typeof useSelector;
    useConfig: () => InternalConfig;
    useOption: () => Options;
    useTranslator: typeof useTranslator;
    useEffect: typeof useEffect;
    useCallback: typeof useCallback;
    useState: typeof useState;
    useRef: typeof useRef;
    useMemo: typeof useMemo;
    useReducer: typeof useReducer;
}
declare const pluginAPI: PluginAPI;

declare function PluginRenderer(props: {
    props?: any;
    pluginId?: string;
    position?: PluginPosition;
}): preact.VNode<preact.Attributes> | null;

declare function classJoin(...classNames: (undefined | null | string | JSX.SignalLike<string>)[]): string;

declare class PluginUtil {
    private constructor();
    static Status: typeof Status;
    static Base: typeof Base;
    static leafColumns: typeof Header.leafColumns;
    static tabularFormat: typeof Header.tabularFormat;
    static Cell: typeof Cell;
    static Row: typeof Row;
    static PluginRenderer: typeof PluginRenderer;
    static debounce: <F extends (...args: any[]) => any>(func: F, waitFor: number) => (...args: Parameters<F>) => Promise<ReturnType<F>>;
    static throttle: (fn: (...args: any[]) => void, wait?: number) => (...args: any[]) => void;
    static classJoin: typeof classJoin;
    static className: (...args: string[]) => string;
}
declare namespace PluginUtil {
    type Column = TColumn;
}

export { type Options, Paginator, PluginPosition, PluginUtil, html, pluginAPI };
