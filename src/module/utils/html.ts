import { HTMLContentProps } from '@/interface/view';
import { HTMLElement } from '@/module/view/htmlElement';
import { h, VNode } from 'preact';

export function decode(content: string): string {
    const value = new DOMParser().parseFromString(content, 'text/html');

    return value.documentElement.textContent || '';
}

export function html(content: string, parentElement?: string): VNode<HTMLContentProps> {
    return h<HTMLContentProps>(HTMLElement, { content: content, parentElement: parentElement });
}
