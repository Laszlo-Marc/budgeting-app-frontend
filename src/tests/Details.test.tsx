import {render} from '@testing-library/react';
import Detail from '../components/expenseComponents/Details';

describe('render Details component corectly', () => {
    it('should render Details component correctly', () => {
        const {container} = render(<Detail />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
