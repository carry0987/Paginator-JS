import { Options } from '@/interface/interfaces';

export type PageButtonProps = {
    page: number;
    isActive: boolean;
    onClick: () => void;
    config: Options;
    lang: (key: string, ...args: unknown[]) => string;
    text?: string;
};

export type EllipsisButtonProps = {
    key: string;
    config: Options;
    lang: (key: string, ...args: unknown[]) => string;
};

export type ActionButtonProps = {
    key: string;
    onClick?: () => void;
    config: Options;
    text?: string;
};
