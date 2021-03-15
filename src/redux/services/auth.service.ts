import {
	AuthenticationResponse,
	LoginRequest,
	RegistrationRequest,
	UpdateUserRequest,
	DeleteUserRequest,
	LogoutRequest,
	CSRFResponse,
} from '../../@common/models';
import { OmitHistory } from '../../@common/models/common.models';
import { putWrapper, deleteWrapper, postWrapper, getWrapper } from '../../@common/utils';

const authAPI = '/api/v2/auth';
// Update
export const updateUser = (updateUserRequest: OmitHistory<UpdateUserRequest>) =>
	putWrapper<UpdateUserRequest, AuthenticationResponse>(`${authAPI}/update`, updateUserRequest);
// Delete
export const deleteUser = (deleteUserRequest: OmitHistory<DeleteUserRequest>) =>
	deleteWrapper<DeleteUserRequest, AuthenticationResponse>(`${authAPI}/delete`, deleteUserRequest);
// Login
export const login = (loginRequest: OmitHistory<LoginRequest>) =>
	postWrapper<LoginRequest, AuthenticationResponse>(`${authAPI}/login`, loginRequest);
// Login
export const logout = (logoutRequest: OmitHistory<LogoutRequest>) =>
	getWrapper<AuthenticationResponse>(`${authAPI}/logout`);
// Registration
export const registration = (registrationRequest: OmitHistory<RegistrationRequest>) =>
	postWrapper<RegistrationRequest, AuthenticationResponse>(`${authAPI}/register`, registrationRequest);
export const checkAuthentication = () => getWrapper<AuthenticationResponse>(`${authAPI}/check`);
// CSRF
export const setCSRFToken = () => getWrapper<CSRFResponse>(`${authAPI}/csrf`);
