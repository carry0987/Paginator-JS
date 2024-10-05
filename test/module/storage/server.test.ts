import ServerStorage from '../../../src/module/storage/server';
import { ServerStorageOptions } from '../../../src/interface/storage';
import Utils from '../../../src/module/utils/utils-ext';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('ServerStorage class', () => {
    let fetchDataMock: any;

    beforeEach(() => {
        const mockSuccessResponse = {
            rows: [
                [6, 6, 6],
                [7, 7, 7],
            ],
            numRows: 10,
        };
        fetchDataMock = vi.spyOn(Utils, 'fetchData').mockResolvedValue(mockSuccessResponse);
    });

    afterEach(() => {
        fetchDataMock.mockRestore();
    });

    it('should call fetchData once get is called', async () => {
        const opts: ServerStorageOptions = {
            url: 'https://example.com',
            processData: (res) => [[res]],
        };
        await new ServerStorage(opts).get();

        expect(fetchDataMock).toHaveBeenCalledTimes(1);
        expect(fetchDataMock).toHaveBeenCalledWith(
            expect.objectContaining({
                url: 'https://example.com',
                data: new FormData(),
            }),
        );
    });

    it('should pass options to fetchData', async () => {
        const opts: ServerStorageOptions = {
            url: 'https://example.com',
            param: {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Test': 'HelloWorld',
                }
            },
            processData: (res) => [[res]],
        };
        await new ServerStorage(opts).get();

        expect(fetchDataMock).toHaveBeenCalledTimes(1);
        expect(fetchDataMock).toHaveBeenCalledWith(
            expect.objectContaining({
                url: 'https://example.com',
                data: new FormData(),
            }),
        );
    });

    it('should format the response with then callback', async () => {
        const opts: ServerStorageOptions = {
            url: 'https://example.com',
            processData: (data: any) => [data.rows],
        };

        const resp = await new ServerStorage(opts).get();
        expect(resp).toStrictEqual({
            data: [
                [
                    [6, 6, 6],
                    [7, 7, 7],
                ],
            ],
            total: 0,
        });
    });

    it('should set total', async () => {
        const opts: ServerStorageOptions = {
            url: 'https://example.com',
            processData: (res: any) => [res.rows],
            total: (res: any) => res.numRows + 2,
        };

        const resp = await new ServerStorage(opts).get();
        expect(resp).toStrictEqual({
            data: [
                [
                    [6, 6, 6],
                    [7, 7, 7],
                ],
            ],
            total: 12,
        });
    });

    it('should call custom data function', async () => {
        const opts: ServerStorageOptions = {
            url: 'https://example.com',
            data: async () => {
                return {
                    data: [
                        [3, 3, 3],
                        [9, 9, 9],
                    ],
                    total: 100,
                };
            },
        };

        const resp = await new ServerStorage(opts).get();
        expect(resp).toStrictEqual({
            data: [
                [3, 3, 3],
                [9, 9, 9],
            ],
            total: 100,
        });

        expect(fetchDataMock).toHaveBeenCalledTimes(0);
    });
});
