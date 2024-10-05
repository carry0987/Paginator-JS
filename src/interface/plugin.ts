import { PluginPosition } from '@/type/plugin';
import { FunctionComponent } from 'preact';

export interface Plugin<T extends FunctionComponent> {
    id: string;
    position: PluginPosition;
    component: T;
    order?: number;
}
