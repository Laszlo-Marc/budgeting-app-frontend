/* eslint-disable @typescript-eslint/no-explicit-any */
import {render} from '@testing-library/react';
import {vi} from 'vitest';
import BasicPie from '../components/expenseComponents/Chart';
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: any) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

describe('render Chart component corectly', () => {
    it('should render Chart component correctly', () => {
        const {container} = render(<BasicPie />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
