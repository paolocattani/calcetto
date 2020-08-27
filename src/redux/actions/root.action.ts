import { createAction } from 'typesafe-actions';
import { defaultParam } from './constants';

const actionName = '[Root]';

export const RootAction = {
  // logout
  logout: createAction(...defaultParam(actionName, 'Logout'))(),
};
