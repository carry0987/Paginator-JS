import { render, screen } from '@testing-library/preact';
import { vi, describe, it, expect } from 'vitest';
import { List } from '../src/list';

// Mock the API methods necessary for testing
vi.mock('@carry0987/paginator', () => {
    // Using useState hook to manage state with toArray functionality
    const mockData = [['Item 1'], ['Item 2'], ['Item 3']];
    const mockState = {
        data: mockData,
        toArray: function () {
            return this.data;
        }
    };

    let state = { ...mockState };
    const setState = (newState: any) => {
        state = { ...state, data: newState };
    };

    return {
        pluginAPI: {
            useSelector: vi.fn(() => mockState.data),
            useEffect: vi.fn((effect: () => void) => effect()),
            useState: (initialState: any) => [state, setState], // Mocking useState
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
