import Paginator from '@/component/paginator';
import { html } from '@/module/utils/html';
import MemoryStorage from '@/module/storage/memory';
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
            data: [[1, 2, 3]]
        });

        paginator.render(container);

        // Assert based on rendered content
        expect(container.querySelector('.paginatorjs-container')).not.toBeNull();
    });

    it('should render paginator with i18n via string', () => {
        const container = document.createElement('div');
        document.body.appendChild(container);

        const paginator = new Paginator({
            columns: ['a', 'b', 'c'],
            data: [[1, 2, 3]],
            language: {
                pagination: {
                    previous: 'Trước',
                    next: 'Sau'
                }
            }
        });

        paginator.render(container);

        // Assert the language translation
        expect(container.querySelector('.page-prev')?.textContent).toBe('Trước');
        expect(container.querySelector('.page-next')?.textContent).toBe('Sau');
    });

    it('should render paginator with i18n via VNode', () => {
        const container = document.createElement('div');
        document.body.appendChild(container);

        const paginator = new Paginator({
            columns: ['a', 'b', 'c'],
            data: [[1, 2, 3]],
            language: {
                pagination: {
                    previous: html('Trước', 'h1'),
                    next: html('Sau', 'h1')
                }
            }
        });

        paginator.render(container);

        // Assert the language translation
        expect(container.querySelector('.page-prev')?.innerHTML).toBe('<h1>Trước</h1>');
        expect(container.querySelector('.page-next')?.innerHTML).toBe('<h1>Sau</h1>');
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
                container: 'ss'
            }
        }).render(document.createElement('div'));

        // Use Reflect API to access private config
        const configTest = Reflect.get(paginator, 'config');

        expect(configTest.internal.storage).toBeInstanceOf(MemoryStorage);
    });

    it('should set the config correctly', () => {
        const config = {
            data: [[1, 2, 3]]
        };

        const paginator = new Paginator(config).render(document.createElement('div'));

        // Use Reflect API to access private config
        const configTest = Reflect.get(paginator, 'config');

        expect(configTest.options.data).toStrictEqual(config.data);
    });

    it('should update the config correctly', () => {
        const config1 = {
            data: [[1, 2, 3]]
        };

        const config2 = {
            resetPageOnUpdate: true
        };

        const paginator = new Paginator(config1);

        paginator.updateConfig(config2).render(document.createElement('div'));

        // Use Reflect API to access private config
        const configTest = Reflect.get(paginator, 'config');

        expect(configTest.options.data).toStrictEqual(config1.data);
        expect(configTest.options.resetPageOnUpdate).toStrictEqual(config2.resetPageOnUpdate);
    });

    it('should forcefully render the paginator', () => {
        const container = document.createElement('div');
        document.body.appendChild(container);

        const paginator = new Paginator({
            columns: ['a', 'b', 'c'],
            data: [[1, 2, 3]]
        }).render(container);

        // Assert the initial render
        expect(container.querySelector('.paginatorjs-container')).not.toBeNull();

        // Call forceRender
        paginator
            .updateConfig({
                columns: ['a', 'b'],
                data: [[1, 2]]
            })
            .forceRender();

        // Assert that the paginator is re-rendered
        expect(container.querySelector('.paginatorjs-container')).not.toBeNull();
    });

    it('should destroy the paginator instance', () => {
        const container = document.createElement('div');
        document.body.appendChild(container);

        const paginator = new Paginator({
            columns: ['a', 'b', 'c'],
            data: [[1, 2, 3]]
        }).render(container);

        // Assert that paginator has been rendered
        expect(container.querySelector('.paginatorjs-container')).not.toBeNull();

        // Call destroy
        paginator.destroy();

        // Assert that the paginator is destroyed
        expect(container.querySelector('.paginatorjs-container')).toBeNull();
    });
});
