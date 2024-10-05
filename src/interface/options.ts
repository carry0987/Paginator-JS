import { ServerStorageOptions } from './storage';
import { TCell, TData, OneDArray } from '@/type/types';
import { Language } from '@/type/i18n';
import { TColumn } from '@/interface/column';
import { ComponentChild } from 'preact';

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

export interface Options extends MainOptions, CommonOptions {
    display: Partial<DisplayControls>;
    className: Partial<ClassName>;
}
