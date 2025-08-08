import { Paginator } from '@/paginator';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, afterEach, expect } from 'vitest';

describe('Paginator component', () => {
    afterEach(() => {
        vi.restoreAllMocks();
        vi.clearAllMocks();
    });

    it('should render paginator with given data', () => {
        render(
            <Paginator
                columns={['a', 'b', 'c']}
                data={[[1, 2, 3]]}
            />
        );

        expect(screen.getAllByRole('button')).toMatchSnapshot();
    });
});
