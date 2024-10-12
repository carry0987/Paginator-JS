import { PluginPosition } from './pluginPosition';
import { Plugin } from '@/interface/plugin';
import log from '@/module/utils/log';
import { FunctionComponent } from 'preact';

class PluginManager {
    private readonly plugins: Plugin<any>[];

    constructor() {
        this.plugins = [];
    }

    public get<T extends FunctionComponent>(id: string): Plugin<T> | undefined {
        return this.plugins.find((p) => p.id === id);
    }

    public add<P = any, T extends FunctionComponent<P> = FunctionComponent<P>>(plugin: Plugin<T, P>): this {
        if (!plugin.id) {
            log.error('Plugin ID cannot be empty');
            return this;
        }

        if (this.get(plugin.id)) {
            log.error(`Duplicate plugin ID: ${plugin.id}`);
            return this;
        }

        this.plugins.push({
            ...plugin,
            props: plugin.props
        });

        return this;
    }

    public remove(id: string): this {
        const plugin = this.get(id);

        if (plugin) {
            this.plugins.splice(this.plugins.indexOf(plugin), 1);
        }

        return this;
    }

    public list<T extends FunctionComponent>(position?: PluginPosition): Plugin<T>[] {
        let plugins: Plugin<T>[];

        if (position != null || position != undefined) {
            plugins = this.plugins.filter((p) => p.position === position);
        } else {
            plugins = this.plugins;
        }

        return plugins.sort((a, b) => (a.order && b.order ? a.order - b.order : 1));
    }
}

export default PluginManager;
