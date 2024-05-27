export interface GenerateHTMLProps {
    currentPage: number;
    rangeStart: number;
    rangeEnd: number;
    totalPage: number;
    totalNumber: number;
}

export interface HTMLContentProps {
    content: string;
    parentElement?: string;
}
