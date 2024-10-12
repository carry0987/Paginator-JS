import { classJoin, className } from '@/module/utils/className';
import { describe, it, expect } from 'vitest';

describe('className', () => {
    describe('classJoin', () => {
        it('should join empty classes', () => {
            expect(classJoin(null, 'boo')).toBe('boo');
        });

        it('should join one class', () => {
            expect(classJoin('boo')).toBe('boo');
        });

        it('should join two or more class', () => {
            expect(classJoin('boo', 'foo', 'bar')).toBe('boo foo bar');
        });

        it('should return empty string when inputs are null and undefined', () => {
            expect(classJoin(null, undefined, null)).toBe('');
        });

        it('should return empty string when inputs are null', () => {
            expect(classJoin(null, null)).toBe('');
        });
    });

    describe('className', () => {
        it('should accept two or more args', () => {
            expect(className('boo', 'foo', 'bar')).toBe('paginatorjs-boo-foo-bar');
        });

        it('should generate classNames', () => {
            expect(className('boo')).toBe('paginatorjs-boo');
        });
    });
});
