import { render, screen } from '@testing-library/preact';
import { describe, it, expect } from 'vitest';
import HelloWorld from '../src/helloWorld';

describe('HelloWorldPlugin', () => {
    it('should render Hello World text', () => {
        render(<HelloWorld />);

        const element = screen.getByText('Hello World');

        expect(element).toBeTruthy();
    });
});
