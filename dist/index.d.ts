import { ComponentChild, VNode } from 'preact';
export { Component, createElement, createRef, h } from 'preact';
import { EventEmitter } from '@carry0987/event-emitter';
export { useEffect, useRef, useState } from 'preact/hooks';

type DataSource<T = object> = string | T | Array<T> | ((data: T) => Array<T>);
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

interface ServerStorageOptions extends RequestInit {
    url: string;
    then?: (data: any) => any[][];
    handle?: (response: Response) => Promise<any>;
    total?: (data: any) => number;
    data?: (opts: ServerStorageOptions) => Promise<StorageResponse$1>;
}
interface StorageResponse$1 {
    data: TData;
    total: number;
}

interface IConfig {
    instance: Paginator;
    eventEmitter: EventEmitter<PaginatorEvents & InternalEvents>;
    container?: Element;
    data?: TData | (() => TData) | (() => Promise<TData>);
    server?: ServerStorageOptions;
}

interface CommonOptions {
    dataSource: DataSource;
    locator: string | (() => string);
    totalNumber: number;
    totalNumberLocator: ((response: DataSource<object>) => number) | null;
    pageNumber: number;
    pageSize: number | null;
    pageRange: number;
    callback?: (data: DataSource<Array<any>>, paginator: Paginator) => void;
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
    dataLoader: ((data?: Array<any>, paginator?: Paginator) => void) | DataLoader;
    dataLoaderFunction?: (paginator: Paginator) => void;
    triggerPagingOnInit: boolean;
    resetPageNumberOnInit: boolean;
    hideOnlyOnePage: boolean;
    onError: (err: unknown) => void;
}
interface StorageResponse {
    data: DataSource;
    total: number;
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
interface Options extends IConfig, CommonOptions, DisplayControls, StyleOptions, CustomizeOptions, UtilitiesOptions {
}

declare class Config {
    options: Options;
    constructor();
    assign(partialConfig: Partial<Options>): this;
    update(partialConfig: Partial<Options>): this;
}

declare class Paginator extends EventEmitter<PaginatorEvents & InternalEvents> {
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

declare const useConfig: () => Options;

export { Config, Paginator, html, useConfig };
