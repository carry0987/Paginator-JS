import { Config } from '@/component/config';
import { useOption } from '@/module/hook/useOption';
import PluginManager from '@/plugin/pluginManager';
import { PluginPosition } from '@/plugin/pluginPosition';
import { describe, it, expect } from 'vitest';
import { h } from 'preact';

interface DummyConfig extends Config {
    dummy: {
        text: string;
    };
}

interface TestProps {
    test: string;
}

describe('Plugin', () => {
    function DummyPlugin<T extends DummyConfig>() {
        const option = useOption() as unknown as T;

        return h('b', {}, option?.dummy?.text || 'hello!');
    }

    it('should add and remove plugins', () => {
        const manager = new PluginManager();

        expect(manager.list()).toHaveLength(0);

        manager.add<TestProps>({
            id: 'dummy',
            position: PluginPosition.Header,
            component: DummyPlugin,
            props: {
                test: 'test'
            }
        });

        manager.add({
            id: 'dummy2',
            position: PluginPosition.Header,
            component: DummyPlugin
        });

        expect(manager.list()).toHaveLength(2);
        manager.remove('dummy');
        expect(manager.list()).toHaveLength(1);
        manager.remove('dummy2');
        expect(manager.list()).toHaveLength(0);
        manager.remove('doesntexist');
        expect(manager.list()).toHaveLength(0);
    });

    it('should return unordered plugins', () => {
        const manager = new PluginManager();

        expect(manager.list()).toHaveLength(0);

        manager.add({
            id: 'dummy',
            position: PluginPosition.Header,
            component: DummyPlugin.prototype
        });

        manager.add({
            id: 'dummy2',
            order: 1,
            position: PluginPosition.Header,
            component: DummyPlugin.prototype
        });

        manager.add({
            id: 'dummy3',
            order: 10,
            position: PluginPosition.Footer,
            component: DummyPlugin.prototype
        });

        expect(manager.list().map((x) => x.id)).toStrictEqual(['dummy', 'dummy2', 'dummy3']);
    });

    it('should return plugins in the correct order', () => {
        const manager = new PluginManager();

        expect(manager.list()).toHaveLength(0);

        manager.add({
            id: 'dummy',
            order: 5,
            position: PluginPosition.Header,
            component: DummyPlugin.prototype
        });

        manager.add({
            id: 'dummy2',
            order: 1,
            position: PluginPosition.Header,
            component: DummyPlugin.prototype
        });

        manager.add({
            id: 'dummy3',
            order: 10,
            position: PluginPosition.Footer,
            component: DummyPlugin.prototype
        });

        manager.add({
            id: 'dummy4',
            position: PluginPosition.Footer,
            component: DummyPlugin.prototype
        });

        expect(manager.list().map((x) => x.id)).toStrictEqual(['dummy2', 'dummy', 'dummy3', 'dummy4']);
        expect(manager.list(PluginPosition.Header).map((x) => x.id)).toStrictEqual(['dummy2', 'dummy']);
    });

    it('should return existing plugin by id', () => {
        const manager = new PluginManager();

        const component = DummyPlugin.prototype;
        manager.add({
            id: 'dummy',
            position: PluginPosition.Header,
            component: component
        });

        const plugin = manager.get('dummy');

        expect(plugin!.component).toBe(component);
        expect(plugin!.position).toBe(PluginPosition.Header);

        expect(manager.get('doesnexist')).toBeUndefined();
    });

    it('should create a userConfig with custom plugin', () => {
        const config = new Config().update({
            data: [[1, 2, 3]],
            plugins: [
                {
                    id: 'dummyheader',
                    position: PluginPosition.Header,
                    component: DummyPlugin
                }
            ]
        });

        expect(config.internal.plugin.get('dummyheader')).toMatchObject({
            id: 'dummyheader',
            position: PluginPosition.Header
        });
    });
});
