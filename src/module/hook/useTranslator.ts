import { useConfig } from './useConfig';

export function useTranslator() {
    const config = useConfig();

    return function (message: string, ...args: any[]): string {
        return config.translator.translate(message, ...args);
    };
}
