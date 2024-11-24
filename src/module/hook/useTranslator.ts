import { useConfig } from './useConfig';
import { VNode } from 'preact';

export function useTranslator() {
    const config = useConfig();

    return function (message: string, ...args: any[]): VNode | string {
        return config.translator.translate(message, ...args);
    };
}
