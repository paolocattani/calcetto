import { createReducer, Action } from 'typesafe-actions';
import { AuthState } from '../../@common/models/auth.model';
import { AuthAction } from '../actions/auth.action';
import { UserRole } from '../../@common/dto';

export const initialSessionState: AuthState = {
	isAuthenticated: false,
	isAdmin: false,
	isLoading: false,
};

export const SessionReducer = createReducer<AuthState, Action>(initialSessionState)
	// Just unsubscribe user from tournament
	.handleAction(AuthAction.unsubscribe.request, (state) => state)
	.handleAction(AuthAction.unsubscribe.failure, (state) => state)
	.handleAction(AuthAction.unsubscribe.success, (state) => state)
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
