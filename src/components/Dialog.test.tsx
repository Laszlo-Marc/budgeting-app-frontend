import { render } from '@testing-library/react';
import { vi } from 'vitest';
import ExpenseDialog from './Dialog';
vi.mock('react-router-dom', () => ({
    ...require('react-router-dom'),
    useNavigate: () => vi.fn(),
}));
describe('render ExpenseDialog component corectly', () => {
    it('should render ExpenseDialog component correctly', () => {
        const {container} = render(<ExpenseDialog  />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
