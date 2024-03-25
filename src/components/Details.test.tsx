import {render} from '@testing-library/react';
import {vi} from 'vitest';
import Detail from './Details';
vi.mock('react-router-dom', () => ({
    ...require('react-router-dom'),
    useNavigate: () => vi.fn(),
}));
describe('render Details component corectly', () => {
    it('should render Details component correctly', () => {
        const {container} = render(<Detail />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
