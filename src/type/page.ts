import { MessageFormat } from './i18n';
import { Options } from '@/interface/options';
import { VNode } from 'preact';

export type PageButtonProps = {
    page: number;
    isActive: boolean;
    onClick: () => void;
    option: Options;
    lang: (key: string, ...args: unknown[]) => ReturnType<MessageFormat>;
    text?: ReturnType<MessageFormat>;
};

export type EllipsisButtonProps = {
    option: Options;
    lang: (key: string, ...args: unknown[]) => ReturnType<MessageFormat>;
};

export type ActionButtonProps = {
    act: string;
    onClick?: () => void;
    option: Options;
    text?: ReturnType<MessageFormat>;
};
