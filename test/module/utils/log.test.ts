import logger from '@/module/utils/log';
import { vi, beforeEach, afterEach, it, expect } from 'vitest';

// Mock console methods before each test and restore after
beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
});

afterEach(() => {
    vi.restoreAllMocks();
});

// Test error with throwException = true
it('should throw error with formatted message when throwException is true', () => {
    const testMsg = 'testErr';
    expect(() => logger.error(testMsg, true)).toThrow('[Paginator] [ERROR]: testErr');
});

// Test error with throwException = false (or undefined)
it('should log error with formatted message when throwException is not true', () => {
    const testMsg = 'something wrong';
    logger.error(testMsg);
    expect(console.error).toHaveBeenCalledWith('[Paginator] [ERROR]: something wrong');
});

// Test warn
it('should warn with formatted message', () => {
    const testMsg = 'warning';
    logger.warn(testMsg);
    expect(console.warn).toHaveBeenCalledWith('[Paginator] [WARN]: warning');
});

// Test info
it('should info with formatted message', () => {
    const testMsg = 'hihi';
    logger.info(testMsg);
    expect(console.info).toHaveBeenCalledWith('[Paginator] [INFO]: hihi');
});
