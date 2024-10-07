import * as preact from 'preact';
import { PluginPosition } from '@carry0987/paginator';

declare const listPlugin: {
    id: string;
    component: preact.FunctionComponent<{}>;
    position: PluginPosition;
    order: number;
};

export { listPlugin as default };
