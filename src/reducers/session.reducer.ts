import { createReducer, Action } from 'typesafe-actions';
import { SessionState } from 'models/session.model';
import { SessionAction } from 'actions/session.action';
import { UserRole } from 'models/user.model';

const initialState: SessionState = {
  isAuthenticated: false,
  isAdmin: false,
  isLoading: false,
};

export const SessionReducer = createReducer<SessionState, Action>(initialState)
  // Request
  .handleAction([SessionAction.checkAuthentication.request], (state) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
  }))
  // Failure
  .handleAction([SessionAction.checkAuthentication.failure], (state, { payload: { message } }) => ({
    ...state,
    errorMessage: message,
    isLoading: false,
  }))
  .handleAction(
    [
      SessionAction.checkAuthentication.success,
      SessionAction.register.success,
      SessionAction.login.success,
      SessionAction.updateSession,
    ],
    (state, { payload: { user, message, showMessage } }) => ({
      user,
      showMessage,
      message,
      isAuthenticated: user ? true : false,
      isAdmin: user ? user.role === UserRole.Admin : false,
      isLoading: false,
    })
  );
