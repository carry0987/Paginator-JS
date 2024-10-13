import { Options } from '@/interface/options';

export type PageButtonProps = {
    page: number;
    isActive: boolean;
    onClick: () => void;
    option: Options;
    lang: (key: string, ...args: unknown[]) => string;
    text?: string;
};

export type EllipsisButtonProps = {
    option: Options;
    lang: (key: string, ...args: unknown[]) => string;
};

export type ActionButtonProps = {
    act: string;
    onClick?: () => void;
    option: Options;
    text?: string;
};
