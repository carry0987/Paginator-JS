import Header from '@/component/header';
import { Config } from '@/component/config';
import { OneDArray } from '@/type/types';
import { TColumn } from '@/interface/column';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Header Class', () => {
    let config: Config;

    beforeEach(() => {
        config = new Config().update({
            data: [[1, 2, 3]],
            columns: ['Name', 'Age', 'Location']
        });
    });

    it('should initialize with no columns', () => {
        const header = new Header();
        expect(header.columns).toHaveLength(0);
    });

    it('should set and get columns correctly', () => {
        const header = new Header();
        const columns: OneDArray<TColumn> = [{ name: 'Name' }, { name: 'Age', hidden: true }];

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

        const nonJsonData = [
            [1, 2],
            [3, 4]
        ];
        expect(Header['isJsonPayload'](nonJsonData)).toBe(false);
    });

    it('should create header from config with columns', () => {
        const config = new Config().update({
            data: [[1, 2]],
            columns: ['User', 'Email']
        });
        config.update({
            columns: ['User', 'Email']
        });
        const header = Header.createFromConfig(config);

        expect(header).toBeDefined();
        expect(header!.columns).toHaveLength(2);
    });

    it('should create header from config with JSON data', () => {
        config = new Config().update({
            data: [[1, 2]],
            columns: ['User', 'Email']
        });
        config.update({
            data: [[{ User: 'John', Email: 'john@example.com' }]]
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
        const columns: OneDArray<TColumn> = [{ name: 'Name' }, { name: 'Email' }];
        const leafCols = Header.leafColumns(columns);
        expect(leafCols).toHaveLength(2);
    });

    it('should return a tabular header cell', () => {
        const config = new Config().update({
            data: [[1, 2]],
            columns: [
                {
                    name: 'h1'
                },
                'h2',
                {
                    name: 'h3'
                }
            ]
        });
        const header = Header.createFromConfig(config);

        const tabularColumns = Header.tabularFormat(header!.columns);
        expect(tabularColumns).toHaveLength(1);

        expect(tabularColumns[0][0].name).toBe('h1');
        expect(tabularColumns[0][1].name).toBe('h2');
        expect(tabularColumns[0][2].name).toBe('h3');
    });
});
