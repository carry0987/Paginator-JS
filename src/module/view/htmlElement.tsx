import { HTMLContentProps } from '@/interface/view';
import { h } from 'preact';

export function HTMLElement(props: HTMLContentProps) {
    return h(props.parentElement || 'span', {
        dangerouslySetInnerHTML: { __html: props.content }
    });
}
