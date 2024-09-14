import Header from '../../src/component/header';
import { Config } from '../../src/component/config';
import { OneDArray, TData } from '../../src/type/types';
import { TColumn } from '../../src/interface/column';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Header Class', () => {
    let config: Config;

    beforeEach(() => {
        config = new Config().update({
            data: [[1, 2, 3]],
            columns: ['Name', 'Age', 'Location'],
        });
    });

    it('should initialize with no columns', () => {
        const header = new Header();
        expect(header.columns).toHaveLength(0);
    });

    it('should set and get columns correctly', () => {
        const header = new Header();
        const columns: OneDArray<TColumn> = [
            { name: 'Name' },
            { name: 'Age', hidden: true },
        ];

        header.columns = columns;
        expect(header.columns).toHaveLength(2);
        expect(header.visibleColumns).toHaveLength(1);
        expect(header.visibleColumns[0].name).toBe('Name');
    });

    it('should create headers from column strings', () => {
        const header = Header.createFromConfig(config);
        expect(header?.columns).toHaveLength(3);
        expect(header?.columns[0].name).toBe('Name');
    });

    it('should create ID for columns without ID', () => {
        const columns: OneDArray<TColumn> = [{ name: 'User Name' }];
        const header = new Header();
        header.columns = columns;
        header['setID']();

        expect(header.columns[0].id).toBe('userName');
    });

    it('should validate JSON payload detection', () => {
        const data = [{ name: 'John' }, { name: 'Jane' }];
        expect(Header['isJsonPayload'](data)).toBe(true);

        const nonJsonData = [[1, 2], [3, 4]];
        expect(Header['isJsonPayload'](nonJsonData)).toBe(false);
    });

    it('should create header from config with columns', () => {
        const config = new Config().update({
            data: [[1, 2]],
            options: { columns: ['User', 'Email'] },
            columns: ['User', 'Email'],
        });
        const header = Header.createFromConfig(config);

        expect(header).toBeDefined();
        expect(header!.columns).toHaveLength(2);
    });

    it('should create header from config with JSON data', () => {
        config = new Config().update({
            data: [[1, 2]],
            options: { data: [[{ User: 'John', Email: 'john@example.com' }]] as TData[] },
            columns: ['User', 'Email'],
        });
        const header = Header.createFromConfig(config);

        expect(header).toBeDefined();
        expect(header!.columns).toHaveLength(2);
    });

    it('should return undefined for empty config', () => {
        const config = new Config();
        const header = Header.createFromConfig(config);

        expect(header).toBeUndefined();
    });

    it('should return leaf columns correctly', () => {
        const columns: OneDArray<TColumn> = [
            { name: 'Name' },
            { name: 'Email' },
        ];
        const leafCols = Header.leafColumns(columns);
        expect(leafCols).toHaveLength(2);
    });
});
