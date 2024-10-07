import * as preact from 'preact';
import { PluginPosition } from '@carry0987/paginator';

declare const helloWorldPlugin: {
    id: string;
    component: preact.FunctionComponent<{}>;
    position: PluginPosition;
    order: number;
};

export { helloWorldPlugin as default };
