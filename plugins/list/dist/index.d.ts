import * as preact from 'preact';
import { FunctionComponent } from 'preact';
import { PluginPosition } from '@carry0987/paginator';

declare const List: FunctionComponent;

declare const listPlugin: {
    id: string;
    component: preact.FunctionComponent<{}>;
    position: PluginPosition;
    order: number;
};

export { List, listPlugin };
