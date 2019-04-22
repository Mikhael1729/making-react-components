import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

const adapter = Adapter as any;

enzyme.configure({ adapter: new adapter.default()});