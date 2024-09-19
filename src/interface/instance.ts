import { Options } from './options';
import { ComponentChildren } from 'preact';

export interface Instance {
    value: Options | undefined;
    children?: ComponentChildren;
}
