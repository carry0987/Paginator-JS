import { Language, MessageFormat } from '@/type/i18n';
import enUS from './en_US';

export class Translator {
    private readonly _language: Language;
    private readonly _defaultLanguage: Language;

    constructor(language: Language) {
        this._language = language;
        this._defaultLanguage = enUS;
    }

    /**
     * Tries to split the message with "." and find
     * the key in the given language
     *
     * @param message
     * @param lang
     */
    private getString(message: string, lang: Language): MessageFormat | null {
        if (!lang || !message) return null;

        const splitted = message.split('.');
        const key = splitted[0];

        if (lang[key]) {
            const val = lang[key];

            if (typeof val === 'string') {
                return (): string => val;
            } else if (typeof val === 'function') {
                return val;
            } else {
                return this.getString(splitted.slice(1).join('.'), val);
            }
        }

        return null;
    }

    public translate(message: string, ...args: any[]): string {
        const translated = this.getString(message, this._language);
        let messageFormat;

        if (translated) {
            messageFormat = translated;
        } else {
            messageFormat = this.getString(message, this._defaultLanguage);
        }

        if (messageFormat) {
            return messageFormat(...args);
        }

        return message;
    }
}
