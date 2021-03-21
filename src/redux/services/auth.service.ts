import {
	AuthenticationResponse,
	LoginRequest,
	RegistrationRequest,
	UpdateUserRequest,
	DeleteUserRequest,
	CSRFResponse,
} from '../../@common/models';
import { OmitHistory } from '../../@common/models/common.models';
import { putWrapper, deleteWrapper, postWrapper, getWrapper } from '../../@common/utils';

const authAPI = '/api/v2/auth';
// Update
export const updateUser = (updateUserRequest: OmitHistory<UpdateUserRequest>): Promise<AuthenticationResponse> =>
	putWrapper<UpdateUserRequest, AuthenticationResponse>(`${authAPI}/update`, updateUserRequest);
// Delete
export const deleteUser = (deleteUserRequest: OmitHistory<DeleteUserRequest>): Promise<AuthenticationResponse> =>
	deleteWrapper<DeleteUserRequest, AuthenticationResponse>(`${authAPI}/delete`, deleteUserRequest);
// Login
export const login = (loginRequest: OmitHistory<LoginRequest>): Promise<AuthenticationResponse> =>
	postWrapper<LoginRequest, AuthenticationResponse>(`${authAPI}/login`, loginRequest);
// Login
export const logout = (/*logoutRequest: OmitHistory<LogoutRequest>*/): Promise<AuthenticationResponse> =>
	getWrapper<AuthenticationResponse>(`${authAPI}/logout`);
// Registration
export const registration = (registrationRequest: OmitHistory<RegistrationRequest>): Promise<AuthenticationResponse> =>
	postWrapper<RegistrationRequest, AuthenticationResponse>(`${authAPI}/register`, registrationRequest);
export const checkAuthentication = (): Promise<AuthenticationResponse> =>
	getWrapper<AuthenticationResponse>(`${authAPI}/check`);
// CSRF
export const setCSRFToken = (): Promise<CSRFResponse> => getWrapper<CSRFResponse>(`${authAPI}/csrf`);
