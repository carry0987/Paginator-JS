import { Table } from './src/table';
import { PluginPosition } from '@carry0987/paginator';

const tablePlugin = {
    id: 'tablePlugin',
    component: Table,
    position: PluginPosition.Body,
    order: 1
};

export { tablePlugin, Table };
