import {render} from '@testing-library/react';
import Overview from '../components/expenseComponents/Overview';

describe('render Overview component corectly', () => {
    it('should render Overview component correctly', () => {
        const {container} = render(<Overview />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
