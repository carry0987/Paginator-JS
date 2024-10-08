import * as preact from 'preact';
import { FunctionComponent } from 'preact';
import { PluginPosition } from '@carry0987/paginator';

declare const Table: FunctionComponent;

declare const tablePlugin: {
    id: string;
    component: preact.FunctionComponent<{}>;
    position: PluginPosition;
    order: number;
};

export { Table, tablePlugin };
