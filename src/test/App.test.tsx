import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App name='' greeting='' />, div);
  ReactDOM.unmountComponentAtNode(div);
});
