import { createReducer, Action } from 'typesafe-actions';
import { AuthState } from '@common/models/auth.model';
import { AuthAction } from 'redux/actions/auth.action';
import { UserRole } from '@common/dto';

export const initialSessionState: AuthState = {
  isAuthenticated: false,
  isAdmin: false,
  isLoading: true,
};

export const SessionReducer = createReducer<AuthState, Action>(initialSessionState)
  // Request
  .handleAction(
    [
      AuthAction.checkAuthentication.request,
      AuthAction.registration.request,
      AuthAction.login.request,
      AuthAction.logout.request,
      AuthAction.update.request,
      AuthAction.delete.request,
    ],
    (state) => ({ ...state, isLoading: true })
  )
  // Failure
  .handleAction(
    [AuthAction.checkAuthentication.failure, AuthAction.registration.failure, AuthAction.login.failure],
    () => ({
      isLoading: false,
      user: undefined,
      isAdmin: false,
      isAuthenticated: false,
    })
  )
  .handleAction([AuthAction.logout.failure, AuthAction.update.failure, AuthAction.delete.failure], (state) => ({
    ...state,
    isLoading: false,
  }))
  // Success
  .handleAction(
    [
      AuthAction.checkAuthentication.success,
      AuthAction.registration.success,
      AuthAction.login.success,
      AuthAction.logout.success,
      AuthAction.update.success,
      AuthAction.delete.success,
      AuthAction.updateSession,
    ],
    (state, { payload: { user } }) => ({
      user,
      isAuthenticated: !!user,
      isAdmin: user ? user.role === UserRole.Admin : false,
      isLoading: false,
    })
  )
  .handleAction(AuthAction.purge, () => initialSessionState);
