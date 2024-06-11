import { IConfig } from './config';
import Paginator from '@/component/paginator';
import { TDataArrayRow, TDataObjectRow, TCell, OneDArray, TData } from '@/type/types';
import { ComponentChildren, ComponentChild } from 'preact';

interface CommonOptions {
    locator: string | (() => string);
    totalNumber: number;
    totalNumberLocator?: (response: TData) => number;
    pageNumber: number;
    pageSize: number;
    pageRange: number;
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
    dataRenderer?: (response: TData, paginator: Paginator) => ComponentChild;
}

interface UtilitiesOptions {
    triggerPagingOnInit: boolean;
    resetPageNumberOnInit: boolean;
    hideOnlyOnePage: boolean;
    onError: (err: unknown) => void;
}

export interface Instance {
    value: Options | undefined;
    children?: ComponentChildren;
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

export interface TColumn {
    id?: string;
    // default data for all columns
    data?: ((row: TDataArrayRow | TDataObjectRow) => TCell) | TCell;
    // column label
    name?: string | ComponentChild;
    columns?: OneDArray<TColumn>;
}
