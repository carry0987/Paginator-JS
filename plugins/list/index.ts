import { List } from './src/list';
import { PluginPosition } from '@carry0987/paginator';

const listPlugin = {
    id: 'listPlugin',
    component: List,
    position: PluginPosition.Body,
    order: 1
};

export { listPlugin, List };
