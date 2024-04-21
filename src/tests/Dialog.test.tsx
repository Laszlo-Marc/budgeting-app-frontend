import {render} from '@testing-library/react';
import ExpenseDialog from '../components/expenseComponents/Dialog';

describe('render ExpenseDialog component corectly', () => {
    it('should render ExpenseDialog component correctly', () => {
        const {container} = render(<ExpenseDialog />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
