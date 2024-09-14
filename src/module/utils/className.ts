import { JSX } from 'preact';

export function className(...args: string[]): string {
    const prefix = 'paginatorjs';

    return `${prefix}${args.reduce((prev: string, cur: string) => `${prev}-${cur}`, '')}`;
}

export function classJoin(...classNames: (undefined | null | string | JSX.SignalLike<string>)[]): string {
    return classNames
        .map((x) => (x ? x.toString() : ''))
        .filter((x) => x)
        .reduce((className, prev) => `${className || ''} ${prev}`, '')
        .trim();
}
