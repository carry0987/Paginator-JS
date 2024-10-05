import { PluginPosition } from '@/type/plugin';
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

    public add<T extends FunctionComponent<any>>(plugin: Plugin<T>): this {
        if (!plugin.id) {
            log.error('Plugin ID cannot be empty');
            return this;
        }

        if (this.get(plugin.id)) {
            log.error(`Duplicate plugin ID: ${plugin.id}`);
            return this;
        }

        this.plugins.push(plugin);

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
