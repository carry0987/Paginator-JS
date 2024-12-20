import { Config } from '@/component/config';
import StorageResponseToArrayTransformer from '@/module/pipeline/transformer/storageResponseToArray';
import Header from '@/component/header';
import { describe, it, expect, beforeEach } from 'vitest';

describe('StorageResponseToArray', () => {
    let config: Config;

    beforeEach(() => {
        config = new Config().update({
            data: [[1, 2, 3]],
            columns: ['Name', 'Age', 'Location']
        });
    });

    it('should convert array of arrays', async () => {
        const raw = {
            data: [
                [1, 2, 3],
                ['a', 'b', 'c']
            ],
            total: 2
        };

        const transformer = new StorageResponseToArrayTransformer();
        const data = await transformer.process(raw);

        expect(data.total).toBe(2);
        expect(data.data).toHaveLength(2);
        expect(data.data).toStrictEqual([
            [1, 2, 3],
            ['a', 'b', 'c']
        ]);
    });

    it('should convert array of objects', async () => {
        const raw = {
            data: [
                {
                    name: 'boo',
                    age: 8
                },
                {
                    name: 'foo',
                    age: 10
                }
            ],
            total: 2
        };

        config.update({
            columns: [
                {
                    name: 'name'
                },
                {
                    name: 'age'
                }
            ]
        });
        const transformer = new StorageResponseToArrayTransformer({
            header: Header.createFromConfig(config)
        });
        const data = await transformer.process(raw);

        expect(data.total).toBe(2);
        expect(data.data).toHaveLength(2);
        expect(data.data).toStrictEqual([
            ['boo', 8],
            ['foo', 10]
        ]);
    });

    it('should use static data field', async () => {
        const raw = {
            data: [
                [1, 2, 3],
                ['a', 'b', 'c']
            ],
            total: 2
        };

        config.update({
            columns: [
                {
                    name: 'a'
                },
                {
                    name: 'b'
                },
                {
                    name: 'c'
                },
                {
                    name: 'def',
                    data: 42
                }
            ]
        });
        const transformer = new StorageResponseToArrayTransformer({
            header: Header.createFromConfig(config)
        });
        const data = await transformer.process(raw);

        expect(data.total).toBe(2);
        expect(data.data).toHaveLength(2);
        expect(data.data).toStrictEqual([
            [1, 2, 3, 42],
            ['a', 'b', 'c', 42]
        ]);
    });

    it('should convert array of objects when selector is a function', async () => {
        const raw = {
            data: [
                {
                    name: {
                        first: 'boo',
                        last: 'bar'
                    },
                    _age: 8
                },
                {
                    name: {
                        first: 'foo',
                        last: 'far'
                    },
                    _age: 10
                }
            ],
            total: 2
        };

        config.update({
            columns: [
                {
                    data: (row: any) => row.name.first,
                    name: 'firstName'
                },
                {
                    data: (row: any) => row.name.last,
                    name: 'lastname'
                },
                {
                    data: (row: any) => row.name.first + ' ' + row.name.last,
                    name: 'firstlastname'
                },
                {
                    name: 'age',
                    id: '_age'
                }
            ]
        });
        const transformer = new StorageResponseToArrayTransformer({
            header: Header.createFromConfig(config)
        });
        const data = await transformer.process(raw);

        expect(data.data).toStrictEqual([
            ['boo', 'bar', 'boo bar', 8],
            ['foo', 'far', 'foo far', 10]
        ]);
    });
});
