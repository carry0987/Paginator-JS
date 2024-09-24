import { useOption } from './useOption';

export function useTranslator() {
    const option = useOption();

    return function (message: string, ...args: any[]): string {
        return option.translator.translate(message, ...args);
    };
}
