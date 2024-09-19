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

export interface PageRendererProps {
    setPage: (page: number) => void;
    currentPage: number;
    totalPage: number;
}
