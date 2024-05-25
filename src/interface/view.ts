import { Options } from './interfaces';

export interface GenerateHTMLProps {
    currentPage: number;
    rangeStart: number;
    rangeEnd: number;
    totalPage: number;
    totalNumber: number;
    options: Options;
}

export interface HTMLContentProps {
    content: string;
    parentElement?: string;
}

