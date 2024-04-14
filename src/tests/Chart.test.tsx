import {render} from '@testing-library/react';
import {vi} from 'vitest';
import BasicPie from '../components/Chart';
vi.mock('react-router-dom', () => ({
    ...require('react-router-dom'),
    useNavigate: () => vi.fn(),
}));
describe('render Details component corectly', () => {
    it('should render Details component correctly', () => {
        const {container} = render(<BasicPie />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
