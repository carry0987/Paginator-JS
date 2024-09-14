import Paginator from '../../src/component/paginator';
import MemoryStorage from '../../src/module/storage/memory';
import { vi, describe, it, afterEach, expect } from 'vitest';

describe('Paginator class', () => {
    afterEach(() => {
        vi.restoreAllMocks();
        vi.clearAllMocks();
    });

    it('should render paginator with given data', () => {
        const container = document.createElement('div');
        document.body.appendChild(container);

        const paginator = new Paginator({
            columns: ['a', 'b', 'c'],
            data: [[1, 2, 3]],
        });

        paginator.render(container);

        // Assert based on rendered content
        expect(container.querySelector('.paginatorjs-pagination')).not.toBeNull();
    });

    it('should raise an exception with empty config', () => {
        expect(() => {
            new Paginator({}).render(document.createElement('div'));
        }).toThrow('Could not determine the storage type');
    });

    it('should init a memory storage', () => {
        const paginator = new Paginator({
            data: [[1, 2, 3]],
            className: {
                container: 'ss',
            },
        }).render(document.createElement('div'));

        expect(paginator.config.options.storage).toBeInstanceOf(MemoryStorage);
    });

    it('should set the config correctly', () => {
        const config = {
            data: [[1, 2, 3]],
        };

        const paginator = new Paginator(config).render(document.createElement('div'));

        expect(paginator.config.options.data).toStrictEqual(config.data);
    });

    it('should update the config correctly', () => {
        const config1 = {
            data: [[1, 2, 3]],
        };

        const config2 = {
            resetPageOnUpdate: true,
        };

        const paginator = new Paginator(config1);

        paginator.updateConfig(config2).render(document.createElement('div'));

        expect(paginator.config.options.data).toStrictEqual(config1.data);
        expect(paginator.config.options.resetPageOnUpdate).toStrictEqual(config2.resetPageOnUpdate);
    });
});
