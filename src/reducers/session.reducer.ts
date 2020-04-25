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
  // Check Authentication
  .handleAction(SessionAction.updateSession, (state, { payload }) => ({
    ...state,
    user: payload ? payload : undefined,
    isAuthenticated: payload ? true : false,
    isAdmin: payload ? payload.role === UserRole.Admin : false,
    isLoading: false,
  }))
  .handleAction(SessionAction.checkAuthentication.success, (state, { payload: { user } }) => ({
    ...state,
    user,
    isAuthenticated: user ? true : false,
    isAdmin: user ? user.role === UserRole.Admin : false,
    isLoading: false,
  }));
