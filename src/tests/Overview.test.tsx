import {render} from '@testing-library/react';
import {vi} from 'vitest';
import Overview from '../components/Overview';
vi.mock('react-router-dom', () => ({
    ...require('react-router-dom'),
    useNavigate: () => vi.fn(),
}));
describe('render Overview component corectly', () => {
    it('should render Overview component correctly', () => {
        const {container} = render(<Overview />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
