import ArrayToTabularTransformer from '../../../../src/module/pipeline/transformer/arrayToTabular';
import Tabular from '../../../../src/component/tabular';
import { describe, it, expect } from 'vitest';

describe('ArrayToTabularTransformer', () => {
    it('should convert raw data to Tabular', async () => {
        const raw = {
            data: [
                [1, 2, 3],
                ['a', 'b', 'c'],
            ],
        };

        const transformer = new ArrayToTabularTransformer();
        const data = await transformer.process(raw);

        expect(data).toBeInstanceOf(Tabular);
        expect(data).toHaveLength(2);
    });
});
