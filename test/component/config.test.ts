import { Config } from '../../src/component/config';
import Storage from '../../src/module/storage/storage';
import { Translator } from '../../src/module/i18n/translator';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Config', () => {
    let config: Config;

    beforeEach(() => {
        config = new Config().update({
            data: [[1, 2, 3]]
        });
    });

    it('should have data property', () => {
        expect(config.options.data).toStrictEqual([[1, 2, 3]]);
    });

    it('assign should set the default when partial config is empty', () => {
        config.assign({});
        expect(config.options.className.active).toEqual('active');
    });

    it('assign should set the correct default', () => {
        config.assign({
            position: 'top'
        });
        expect(config.options.position).toEqual('top');
    });

    it('should return the correct values', () => {
        config.update({ data: [] });
        expect(config.internal.storage).toBeInstanceOf(Storage);
    });

    it('should create a userConfig', () => {
        const data = [[1, 2, 3]];
        config.update({
            data: data,
            pageSize: 8,
            pageRange: 5
        });

        expect(config.options.data).toStrictEqual(data);
        expect(config.internal.header).toBeUndefined();
        expect(config.internal.translator).toBeInstanceOf(Translator);
        expect(config.options.pageSize).toBe(8);
        expect(config.options.pageRange).toBe(5);
    });

    it('should create a userConfig with header', () => {
        const data = [[1, 2, 3]];
        const cols = ['a', 'b', 'c'];
        config.update({
            data: data,
            columns: cols
        });

        expect(config.internal.header.columns.map((x: any) => x.name)).toStrictEqual(cols);
        expect(config.internal.header.columns.map((x: any) => x.sort)).toStrictEqual([undefined, undefined, undefined]);
    });

    it('should assign config keys', () => {
        config
            .update({
                data: []
            })
            .assign({
                resetPageOnUpdate: true
            });
        expect(config.options.resetPageOnUpdate).toBe(true);
    });

    it('should update config', () => {
        config
            .assign({
                data: [],
                resetPageOnUpdate: true
            })
            .update({
                resetPageOnUpdate: false
            });
        expect(config.options.pageSize).toBe(10);
        expect(config.options.pageRange).toBe(2);
        expect(config.options.resetPageOnUpdate).toBeFalsy();
    });
});
