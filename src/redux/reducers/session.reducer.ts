import { createReducer, Action } from 'typesafe-actions';
import { SessionState } from '@common/models/session.model';
import { SessionAction } from 'redux/actions/session.action';
import { UserRole } from '@common/dto';

export const initialSessionState: SessionState = {
  isAuthenticated: false,
  isAdmin: false,
  isLoading: true,
};

export const SessionReducer = createReducer<SessionState, Action>(initialSessionState)
  // Request
  .handleAction(
    [
      SessionAction.checkAuthentication.request,
      SessionAction.registration.request,
      SessionAction.login.request,
      SessionAction.logout.request,
      SessionAction.update.request,
      SessionAction.delete.request,
    ],
    (state) => ({ ...state, isLoading: true })
  )
  // Failure
  .handleAction(
    [SessionAction.checkAuthentication.failure, SessionAction.registration.failure, SessionAction.login.failure],
    () => ({
      isLoading: false,
      user: undefined,
      isAdmin: false,
      isAuthenticated: false,
    })
  )
  .handleAction(
    [SessionAction.logout.failure, SessionAction.update.failure, SessionAction.delete.failure],
    (state) => ({ ...state, isLoading: false })
  )
  // Success
  .handleAction(
    [
      SessionAction.checkAuthentication.success,
      SessionAction.registration.success,
      SessionAction.login.success,
      SessionAction.logout.success,
      SessionAction.update.success,
      SessionAction.delete.success,
      SessionAction.updateSession,
    ],
    (state, { payload: { user } }) => ({
      user,
      isAuthenticated: !!user,
      isAdmin: user ? user.role === UserRole.Admin : false,
      isLoading: false,
    })
  )
  .handleAction(SessionAction.purge, () => initialSessionState);
