import { render, screen } from '@testing-library/preact';
import { vi, describe, it, expect } from 'vitest';
import { List } from '../src/list';

// Mock the API methods necessary for testing
vi.mock('@carry0987/paginator', () => {
    const mockSignal = {
        data: [['Item 1'], ['Item 2'], ['Item 3']],
        get value() {
            return this;
        },
        set value(data: any) {
            this.data = data;
        },
        toArray() {
            return this.data;
        }
    };

    return {
        pluginAPI: {
            useSelector: vi.fn(() => mockSignal.data),
            useEffect: vi.fn((effect: () => void) => effect()),
            useSignal: () => mockSignal,
            className: (name: string) => name
        }
    };
});

describe('List Plugin', () => {
    it('should render list items correctly', () => {
        render(<List />);

        // Check if all list items are rendered correctly
        const items = screen.getAllByRole('listitem');

        expect(items).toHaveLength(3);
        expect(items[0].textContent).toBe('Item 1');
        expect(items[1].textContent).toBe('Item 2');
        expect(items[2].textContent).toBe('Item 3');
    });
});
