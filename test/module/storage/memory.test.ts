import MemoryStorage from '../../../src/module/storage/memory';
import { describe, it, expect, beforeEach } from 'vitest';

describe('MemoryStorage class', () => {
    let data: any;

    beforeEach(() => {
        data = [
            [1, 2, 3],
            [4, 5, 6],
        ];
    });

    it('should load from the config', async () => {
        const memoryStorage = new MemoryStorage(data);
        expect((await memoryStorage.get()).total).toBe(2);
    });

    it('should return the correct length', async () => {
        const memoryStorage = new MemoryStorage(data);

        memoryStorage.set([[1, 2, 3]]);

        expect((await memoryStorage.get()).total).toBe(1);
    });

    it('should set and get rows', async () => {
        const memoryStorage = new MemoryStorage(data);

        memoryStorage.set([['a', 'b', 'c']]);

        expect((await memoryStorage.get()).data).toStrictEqual([['a', 'b', 'c']]);
    });

    it('should set rows from a function', async () => {
        const memoryStorage = new MemoryStorage(data);

        memoryStorage.set(() => [['a', 'b', 'c']]);

        expect((await memoryStorage.get()).data).toStrictEqual([['a', 'b', 'c']]);
    });

    it('should set rows from an async function', async () => {
        const memoryStorage = new MemoryStorage(data);

        memoryStorage.set(async () => {
            return new Promise((resolve) => {
                setTimeout(() => resolve([['a', 'b', 'c']]), 500);
            });
        });

        expect((await memoryStorage.get()).data).toStrictEqual([['a', 'b', 'c']]);
    });
});
