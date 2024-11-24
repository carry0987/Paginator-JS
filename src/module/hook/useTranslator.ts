import { useConfig } from './useConfig';
import { MessageFormat } from '@/type/i18n';

export function useTranslator() {
    const config = useConfig();

    return function (message: string, ...args: any[]): ReturnType<MessageFormat> {
        return config.translator.translate(message, ...args);
    };
}
