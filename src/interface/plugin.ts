import { PluginPosition } from '@/plugin/pluginPosition';
import { FunctionComponent } from 'preact';

export interface Plugin<T extends FunctionComponent<P>, P = any> {
    id: string;
    position: PluginPosition;
    component: T;
    props?: P;
    order?: number;
}
