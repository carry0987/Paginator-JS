import { Config, ConfigContext } from './config';
import { h, render as renderVNode, VNode } from 'preact';
import { Container } from '../module/view/container';
import log from '../module/utils/log';
import { EventEmitter } from '@carry0987/event-emitter';
import { PaginatorEvents, InternalEvents } from '../interface/events';
import { Options } from '../interface/interfaces';
import '../style/paginator.css';

class Paginator extends EventEmitter<PaginatorEvents & InternalEvents> {
    private static version: string = '__version__';
    public config: Config;

    constructor(config: Partial<Options>) {
        super();
        this.config = new Config()
            .assign({ instance: this, eventEmitter: this })
            .update(config);
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
            return log.error(
                'Container is empty. Make sure you call render() before forceRender()',
                true
            );
        }

        this.destroy();

        // Recreate the Paginator instance
        renderVNode(this.createElement(), this.config.options.container);

        return this;
    }

    public destroy(): void {
        // Clear cache or perform other cleanup tasks if needed
        if (!this.config.options.container) {
            return log.error('Container is empty. Make sure you call render() before destroy()', true);
        }
        renderVNode(null, this.config.options.container);
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

        return this;
    }

    private createElement(): VNode<any> {
        return h(ConfigContext.Provider, {
            value: this.config.options,
            children: h(Container, {}),
        }) as VNode<any>;
    }
}

export default Paginator;
