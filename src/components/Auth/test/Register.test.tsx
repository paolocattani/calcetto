import React from 'react';
import Register from 'src/components/Auth/Register';
import { render, RenderResult, screen } from '../../../test/test-utils';

describe('<Register />.render', () => {
  let component: RenderResult;
  beforeEach(() => {
    component = render(<Register />);
  });

  it('should render correctly and match snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('should contains all elements', async () => {
    await screen.findByRole('button', { name: /confirm/i });
    [
      'username',
      'name',
      'surname',
      'email.email',
      'email.confirm',
      'password.password',
      'password.confirm',
      'mobile',
      'birthday',
      //FIXME:
      // 'Ruolo',
    ].forEach((s) => {
      expect(screen.findByDisplayValue(s)).not.toBeNull();
    });
    expect(screen.getByRole('button', { name: 'confirm' })).not.toBeNull();
    expect(screen.getByRole('button', { name: 'reset' })).not.toBeNull();
  });
  it('input elements should have "required" attritbute', async () => {
    await screen.findByRole('button', { name: /confirm/i });
    [
      'username',
      'name',
      'surname',
      'email.email',
      'email.confirm',
      'password.password',
      'password.confirm',
      'birthday',
    ].forEach((s) => {
      expect(screen.getByLabelText(s)).toBeRequired();
    });
  });
});
