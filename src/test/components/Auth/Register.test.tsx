import React from 'react';
import Register from 'components/Auth/Register';
import { render, RenderResult, screen } from '../../test-utils';

describe('<Register />.render', () => {
  let component: RenderResult;
  beforeEach(() => {
    component = render(<Register />);
  });

  it('should render correctly and match snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('should contains all elements', () => {
    [
      'Username',
      'Nome',
      'Cognome',
      'Email',
      'Conferma Email',
      'Password',
      'Conferma Password',
      'Telefono',
      'Data di nascita',
      //FIXME:
      // 'Ruolo',
    ].forEach((s) => {
      expect(screen.getByLabelText(s)).not.toBe(null);
    });
    expect(screen.getByRole('button', { name: 'Conferma' })).not.toBe(null);
    expect(screen.getByRole('button', { name: 'Reset' })).not.toBe(null);
  });
  it('input elements should have "required" attritbute', () => {
    [
      'Username',
      'Nome',
      'Cognome',
      'Email',
      'Conferma Email',
      'Password',
      'Conferma Password',
      'Data di nascita',
    ].forEach((s) => {
      expect(screen.getByLabelText(s)).toBeRequired();
    });
  });
});
