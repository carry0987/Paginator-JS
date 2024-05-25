import { h } from 'preact';
import { HTMLContentProps } from '../../interface/view';

export function HTMLElement(props: HTMLContentProps) {
    return h(props.parentElement || 'span', {
        dangerouslySetInnerHTML: { __html: props.content },
    });
}
