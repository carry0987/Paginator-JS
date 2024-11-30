import { Config, ConfigContext } from '@/component/config';
import { useOption } from '@/module/hook/useOption';
import { PluginUtil } from '@/plugin/pluginUtil';
import { PluginPosition } from '@/plugin/pluginPosition';
import { describe, it, expect } from 'vitest';
import { Fragment, h, render } from 'preact';

interface DummyConfig extends Config {
    dummy: {
        text: string;
    };
}

describe('pluginUtil', () => {
    function DummyPlugin<T extends DummyConfig>() {
        const option = useOption() as unknown as T;

        return h('b', {}, option?.dummy?.text || 'hello!');
    }

    describe('pluginRenderer', () => {
        it('should render the plugins', async () => {
            const config = new Config().update({
                data: [[1, 2, 3]]
            }) as DummyConfig;

            (config.options as any).dummy = {
                text: 'dummyplugin'
            };

            config.internal.plugin.add({
                id: 'dummyheader',
                position: PluginPosition.Header,
                component: DummyPlugin
            });

            config.internal.plugin.add({
                id: 'dummyfooter',
                position: PluginPosition.Footer,
                component: DummyPlugin
            });

            const container = document.createElement('div');
            document.body.appendChild(container);

            render(
                h(
                    ConfigContext.Provider,
                    { value: config },
                    h(
                        Fragment,
                        null,
                        h(PluginUtil.PluginRenderer, { position: PluginPosition.Header }),
                        h(PluginUtil.PluginRenderer, { position: PluginPosition.Footer })
                    )
                ),
                container
            );

            expect(container.innerHTML).toMatchSnapshot();
        });
    });

    describe('className', () => {
        it('should accept two or more args', () => {
            expect(PluginUtil.className('boo', 'foo', 'bar')).toBe('paginatorjs-plugin-boo-foo-bar');
        });

        it('should generate classNames', () => {
            expect(PluginUtil.className('boo')).toBe('paginatorjs-plugin-boo');
        });
    });
});
