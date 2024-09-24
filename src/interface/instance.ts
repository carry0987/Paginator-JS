import { Config } from '@/component/config';
import { ComponentChildren } from 'preact';

export interface Instance {
    value: Config;
    children?: ComponentChildren;
}
