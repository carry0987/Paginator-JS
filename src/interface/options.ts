import { Config } from './config';
import { TCell } from '@/type/types';
import { ComponentChild } from 'preact';

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

export interface Options extends Config, CommonOptions {
    display: Partial<DisplayControls>;
    className: Partial<ClassName>;
}
