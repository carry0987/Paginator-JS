import { debounce } from '@/module/utils/debounce';
import { vi, describe, it, expect } from 'vitest';

// Describe the test suite
describe('debounce', () => {
    it('should call the debounced function once after the wait period', async () => {
        const fn = vi.fn((x) => x * 2);
        const waitFor = 100;
        const debouncedFn = debounce(fn, waitFor);

        // Call the debounced function multiple times
        debouncedFn(1);
        debouncedFn(2);
        debouncedFn(3);

        // Wait for more than the debounce period
        await new Promise((resolve) => setTimeout(resolve, waitFor + 50));

        // The original function should be called only once
        expect(fn).toHaveBeenCalledOnce();
        // The result should be based on the last call
        expect(fn).toHaveBeenCalledWith(3);
    });

    it('should resolve with the result of the original function', async () => {
        const fn = vi.fn((x) => x + 1);
        const waitFor = 100;
        const debouncedFn = debounce(fn, waitFor);

        // Call the debounced function
        const result = await debouncedFn(5);

        // Check the result
        expect(result).toBe(6);
        expect(fn).toHaveBeenCalledOnce();
    });

    it('should clear the timeout on successive calls within the wait period', async () => {
        const fn = vi.fn((x) => x * 10);
        const waitFor = 100;
        const debouncedFn = debounce(fn, waitFor);

        // Call the debounced function at intervals less than waitFor
        debouncedFn(2);
        await new Promise((resolve) => setTimeout(resolve, 50));
        debouncedFn(3);

        // Wait for more than the debounce period after the last call
        await new Promise((resolve) => setTimeout(resolve, waitFor + 50));

        // The original function should be called with the last argument
        expect(fn).toHaveBeenCalledWith(3);
    });
});
