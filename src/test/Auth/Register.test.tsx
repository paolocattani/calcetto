import React from 'react';
import configureStore from 'redux-mock-store';
import Register from 'components/Auth/Register';
import { render } from '../test-utils';

const mockStore = configureStore([]);
describe('<Register />', () => {
  it('should render correctly and match snapshot', () => {
    const component = render(<Register />);
    expect(component).toMatchSnapshot();
  });

  /* let store;
  let component;

  beforeEach(() => {
    store = mockStore(initialState);
    component = (render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    ) as unknown) as ShallowWrapper<{}, {}, React.Component<{}, {}, any>>;
  });

  it('Should render with initial store state', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should render all fields', () => {
    [
      'username',
      'name',
      'surname',
      'email',
      'cemail',
      'password',
      'cpassword',
      'phone',
      'birthday',
      'playerRole',
    ].forEach((f) => {
      expect(component.find(`#${f}`).length).toEqual(1);
    });
  });
  */
});
