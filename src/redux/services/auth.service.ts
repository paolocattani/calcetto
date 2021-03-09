import {
	AuthenticationResponse,
	LoginRequest,
	RegistrationRequest,
	UpdateUserRequest,
	DeleteUserRequest,
	LogoutRequest,
	SessionStatus,
	Message,
	UnsubscribeRequest,
	UnsubscribeResponse,
	CSRFResponse,
} from '../../@common/models';
import { OmitHistory } from '../../@common/models/common.models';
import { putWrapper, deleteWrapper, postWrapper, getWrapper } from '../../@common/utils';
import { buffers, END, eventChannel } from 'redux-saga';

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
export const unsubscribe = () => putWrapper<UnsubscribeRequest, UnsubscribeResponse>(`${authAPI}/unsubscribe`);
// CSRF
export const setCSRFToken = () => getWrapper<CSRFResponse>(`${authAPI}/csrf`);

export const createSessionChannel = (channel: EventSource) =>
	eventChannel<Message>((emitter) => {
		// Listen for open channel
		const openListener = (event: Event) => console.log('Connected...');
		// Listen for new message
		const messageListener = (messageEvent: MessageEvent<Message>) => {
			if (messageEvent) {
				const message = JSON.parse(messageEvent.data) as Message;
				emitter(message);
				// Close connection on session expires
				if (message.status === SessionStatus.SESSION_EXPIRED) {
					closeConnection();
				}
			}
		};
		// Listen for error
		const errorListener = (event: Event) => {
			console.error('An Error Occur: ', event);
			emitter(END);
			closeConnection();
		};

		// Add listener
		channel.addEventListener('open', openListener);
		channel.addEventListener('message', messageListener);
		channel.addEventListener('error', errorListener);
		// Cleanup function
		const closeConnection = () => {
			// Remove listener
			channel.removeEventListener('open', openListener);
			channel.removeEventListener('message', messageListener);
			channel.removeEventListener('error', errorListener);
			channel.close();
		};
		return closeConnection;
	}, buffers.expanding());
