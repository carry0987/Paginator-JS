import { Config, ConfigContext } from './config';
import { Container } from '@/module/view/container';
import { PluginContainer } from '@/module/view/plugin/pluginContainer';
import log from '@/module/utils/log';
import { PaginatorEvents } from '@/type/events';
import { Options } from '@/interface/options';
import { Instance } from '@/interface/instance';
import PluginManager from '@/plugin/pluginManager';
import { EventEmitter } from '@carry0987/event-emitter';
import { h, render as renderVNode, VNode } from 'preact';
import '@/theme/index.scss';

class Paginator extends EventEmitter<PaginatorEvents> {
    private static version: string = '__version__';
    private config: Config;
    public plugin: PluginManager;

    constructor(config: Partial<Options>) {
        super();
        this.config = new Config().assignInteral({ instance: this, eventEmitter: this }).update(config);
        this.plugin = this.config.internal.plugin;
    }

    public get version(): string {
        return Paginator.version;
    }

    public updateConfig(config: Partial<Options>): this {
        this.config.update(config);

        return this;
    }

    public forceRender(): this {
        if (!this.config || !this.config.options.container) {
            return log.error('Container is empty. Make sure you call render() before forceRender()', true);
        }

        // Destroy the current Paginator instance
        this.emit('beforeDestroy');
        this.destroy();
        this.emit('afterDestroy');

        // Recreate the Paginator instance
        renderVNode(this.createElement(), this.config.options.container);

        // Render plugin container as well
        if (this.config.options.pluginContainer) {
            renderVNode(this.createPluginElement(), this.config.options.pluginContainer);
        }

        return this;
    }

    public destroy(): void {
        // Clear cache or perform other cleanup tasks if needed
        this.config.internal.pipeline.clearCache();
        if (!this.config.options.container) {
            return log.error('Container is empty. Make sure you call render() before destroy()', true);
        }
        renderVNode(null, this.config.options.container);

        // Destroy plugin container as well
        if (this.config.options.pluginContainer) {
            renderVNode(null, this.config.options.pluginContainer);
        }
    }

    public render(container: Element): this {
        if (!container) {
            log.error('Container element cannot be null', true);
        }

        if (container.childNodes.length > 0) {
            log.error(
                `The container element ${container} is not empty. Make sure the container is empty and call render() again`
            );
            return this;
        }

        this.config.options.container = container;
        renderVNode(this.createElement(), container);

        // Render plugin container as well
        if (this.config.options.pluginContainer) {
            renderVNode(this.createPluginElement(), this.config.options.pluginContainer);
        }

        return this;
    }

    private createPluginElement(): VNode<Instance> {
        return h<Instance>(ConfigContext.Provider, {
            value: this.config,
            children: h(PluginContainer, {})
        });
    }

    private createElement(): VNode<Instance> {
        return h<Instance>(ConfigContext.Provider, {
            value: this.config,
            children: h(Container, {})
        });
    }
}

export default Paginator;
