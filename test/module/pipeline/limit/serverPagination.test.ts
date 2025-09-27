import { ProcessorType } from '@/type/processor';
import { ServerStorageOptions } from '@/interface/storage';
import ServerPaginationLimit from '@/module/pipeline/limit/serverPagination';
import { describe, vi, it, expect } from 'vitest';

describe('ServerPaginationLimit', () => {
    const page = 3,
        limit = 50;
    const originalOptions: ServerStorageOptions = {
        url: 'https://api/records',
        body: '{"foo":"bar"}'
    };

    it('should update url using url callback', async () => {
        const urlFn = vi.fn((prev, p, l) => prev + `?page=${p}&limit=${l}`);
        const processor = new ServerPaginationLimit({ page, limit, url: urlFn });
        const result = await processor['_process'](originalOptions);

        expect(result.url).toBe('https://api/records?page=3&limit=50');
        expect(urlFn).toHaveBeenCalledWith('https://api/records', 3, 50);
        expect(result.body).toBe(originalOptions.body);
    });

    it('should update body using body callback', async () => {
        const bodyFn = vi.fn((prev, p, l) => JSON.stringify({ ...JSON.parse(prev as string), page: p, limit: l }));
        const processor = new ServerPaginationLimit({ page, limit, body: bodyFn });
        const result = await processor['_process'](originalOptions);

        expect(result.body).toBe(JSON.stringify({ foo: 'bar', page: 3, limit: 50 }));
        expect(bodyFn).toHaveBeenCalledWith('{"foo":"bar"}', 3, 50);
        expect(result.url).toBe(originalOptions.url);
    });

    it('should not update if no callbacks provided', async () => {
        const processor = new ServerPaginationLimit({ page, limit });
        const result = await processor['_process'](originalOptions);

        expect(result).toEqual(originalOptions);
    });

    it('should return type ServerLimit', () => {
        const processor = new ServerPaginationLimit({ page, limit });
        expect(processor.type).toBe(ProcessorType.ServerLimit);
    });
});
