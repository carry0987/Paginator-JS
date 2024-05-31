import Paginator from '../component/paginator';
import { IConfig } from './config';
import { DataSource } from '../type/types';
import { Interfaces } from '@carry0987/utils';

interface CommonOptions {
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

interface ClassName {
    container: string;
    prefix: string;
    active: string;
    disable: string;
    ul: string;
    pageButton: string;
    prevButton: string;
    nextButton: string;
    loading: string;
    notfound: string;
    error: string;
}

interface CustomizeOptions {
    prevText: string;
    nextText: string;
    ellipsisText: string;
    formatNavigator: string | ((currentPage: number, totalPage: number, totalNumber: number, rangeStart?: number, rangeEnd?: number) => string);
    pageLink: string;
}

interface UtilitiesOptions {
    formatResult: (data: DataSource<Array<any>>) => DataSource<Array<any>>;
    triggerPagingOnInit: boolean;
    resetPageNumberOnInit: boolean;
    hideOnlyOnePage: boolean;
    onError: (err: unknown) => void;
}

export interface PageData {
    isAsync: boolean;
    direction: number;
    currentPage: number;
    totalNumber: number;
    totalPage: number;
}

export interface Options extends IConfig, CommonOptions {
    display: DisplayControls;
    className: ClassName;
    customize: CustomizeOptions;
    utilities: UtilitiesOptions;
}

export interface SendFormDataOptions extends Interfaces.SendFormDataOptions {}
