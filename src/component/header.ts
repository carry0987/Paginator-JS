import Base from './base';
import { Config } from './config';
import { OneDArray, TData } from '@/type/types';
import { TColumn } from '@/interface/column';
import { camelCase } from '@/module/utils/string';
import PluginManager from '@/plugin/pluginManager';
import { PluginPosition } from '@/plugin/pluginPosition';
import log from '@/module/utils/log';
import { ComponentChild, isValidElement } from 'preact';

class Header extends Base {
    private _columns: OneDArray<TColumn>;

    constructor() {
        super();

        this._columns = [];
    }

    public get columns(): OneDArray<TColumn> {
        return this._columns;
    }

    public set columns(columns) {
        this._columns = columns;
    }

    public get visibleColumns(): OneDArray<TColumn> {
        return this._columns.filter((column) => !column.hidden);
    }

    private setID(columns?: OneDArray<TColumn>): void {
        const cols = columns || this.columns || [];

        for (const column of cols) {
            if (!column.id && typeof column.name === 'string') {
                // Let's guess the column ID if it's undefined
                column.id = camelCase(column.name);
            }

            if (!column.id) {
                log.error(
                    'Could not find a valid ID for one of the columns. Make sure a valid "id" is set for all columns.'
                );
            }
        }
    }

    private populatePlugins(pluginManager: PluginManager, columns: OneDArray<TColumn>): void {
        // Populate the cell columns
        for (const column of columns) {
            if (column.plugin !== undefined) {
                pluginManager.add({
                    ...column.plugin,
                    position: PluginPosition.Cell
                });
            }
        }
    }

    public static createFromConfig(config: Config): Header | undefined {
        const header = new Header();

        if (config.options.columns) {
            header.columns = Header.fromColumns(config.options.columns).columns;
        } else if (Header.isJsonPayload(config.options.data)) {
            // If data[0] is an object but not an Array
            // used for when a JSON payload is provided
            header.columns = Object.keys(config.options.data[0]).map((name) => {
                return { name: name };
            });
        }

        if (header.columns.length) {
            header.setID();
            header.populatePlugins(config.internal.plugin, header.columns);
            return header;
        }

        return undefined;
    }

    /**
     * Returns an array of leaf columns (last columns in the tree)
     *
     * @param columns
     */
    public static leafColumns(columns: OneDArray<TColumn>): OneDArray<TColumn> {
        let result: OneDArray<TColumn> = [];
        const cols = columns || [];

        if (cols && cols.length) {
            for (const col of cols) {
                result.push(col);
            }
        }

        return result;
    }

    private static isJsonPayload(data?: Config['options']['data']): data is TData[] {
        return !!data && data instanceof Array && typeof data[0] === 'object' && !(data[0] instanceof Array);
    }

    private static fromColumns(columns: OneDArray<TColumn | string | ComponentChild>): Header {
        const header = new Header();

        for (const column of columns) {
            if (typeof column === 'string' || isValidElement(column)) {
                header.columns.push({
                    name: column
                });
            } else if (typeof column === 'object') {
                const typedColumn = column as TColumn;

                // TColumn type
                header.columns.push(typedColumn);
            }
        }

        return header;
    }
}

export default Header;
