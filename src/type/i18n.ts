import { HTMLContentProps } from '@/interface/view';
import { VNode } from 'preact';

export type MessageFormat = (...args: any[]) => VNode<HTMLContentProps> | string;
export type Message = ReturnType<MessageFormat> | MessageFormat;
export type Language = { [key: string]: Message | Language };
