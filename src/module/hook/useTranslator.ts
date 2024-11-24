import { useConfig } from './useConfig';
import { MessageFormat } from '@/type/i18n';
import { VNode } from 'preact';

export function useTranslator() {
    const config = useConfig();

    return function (message: string, ...args: any[]): ReturnType<MessageFormat> {
        return config.translator.translate(message, ...args);
    };
}
