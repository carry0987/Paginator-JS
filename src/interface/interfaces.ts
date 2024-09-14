import { Config } from './config';
import { TCell } from '@/type/types';
import { ComponentChildren, ComponentChild } from 'preact';

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

export interface Instance {
    value: Options | undefined;
    children?: ComponentChildren;
}

export interface Options extends Config, CommonOptions {
    display: DisplayControls;
    className: ClassName;
}
