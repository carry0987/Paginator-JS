import HelloWorld from './src/HelloWorld';
import { PluginPosition } from '@carry0987/paginator';

const helloWorldPlugin = {
    id: 'helloWorldPlugin',
    component: HelloWorld,
    position: PluginPosition.Body,
    order: 1
};

export default helloWorldPlugin;
