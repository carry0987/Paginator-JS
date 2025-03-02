import Tabular from '@/component/tabular';
import PaginationLimit from '@/module/pipeline/limit/pagination';
import { describe, it, expect, beforeAll } from 'vitest';

describe('PaginationLimit', () => {
    let data: Tabular;

    beforeAll(() => {
        data = Tabular.fromArray([
            ['a1', 'a2', 'a3'],
            ['b1', 'b2', 'b3'],
            ['c1', 'c2', 'c3'],
            ['d1', 'd2', 'd3'],
            ['e1', 'e2', 'e3']
        ]);
    });

    it('should trim an array (go to page 1)', async () => {
        const pagination = new PaginationLimit().setProps({
            limit: 2,
            page: 1
        });
        const newData = await pagination.process(data);

        expect(newData).toBeInstanceOf(Tabular);
        expect(newData).toHaveLength(2);

        expect(newData.data[0].cells[0].data).toBe('a1');
        expect(newData.data[0].cells[1].data).toBe('a2');
        expect(newData.data[0].cells[2].data).toBe('a3');
        expect(newData.data[1].cells[0].data).toBe('b1');
        expect(newData.data[1].cells[1].data).toBe('b2');
        expect(newData.data[1].cells[2].data).toBe('b3');
    });

    it('should go to page 2', async () => {
        const pagination = new PaginationLimit().setProps({
            limit: 2,
            page: 2
        });
        const newData = await pagination.process(data);

        expect(newData).toBeInstanceOf(Tabular);
        expect(newData).toHaveLength(2);

        expect(newData.data[0].cells[0].data).toBe('c1');
        expect(newData.data[0].cells[1].data).toBe('c2');
        expect(newData.data[0].cells[2].data).toBe('c3');
        expect(newData.data[1].cells[0].data).toBe('d1');
        expect(newData.data[1].cells[1].data).toBe('d2');
        expect(newData.data[1].cells[2].data).toBe('d3');
    });
});
