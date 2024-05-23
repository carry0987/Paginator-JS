import { IPaginator } from './IPaginator';
import { DataSource } from '../type/types';
import { Interfaces } from '@carry0987/utils';

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

export interface PageData {
    isAsync: boolean;
    direction: number;
    currentPage: number;
    totalNumber: number;
    totalPage: number;
}

export interface DataLoader {
    method: string;
    data: Record<string, unknown> | ((opts: DataLoader) => Promise<StorageResponse>);
    cache?: RequestCache;
    headers?: HeadersInit;
    mode?: RequestMode;
    beforeSend: (data: DataLoader) => void;
    credentials?: RequestCredentials;
    pageNumberStartWithZero: boolean;
}

export interface Options extends CommonOptions, DisplayControls, StyleOptions, CustomizeOptions, UtilitiesOptions {}
export interface SendFormDataOptions extends Interfaces.SendFormDataOptions {}
