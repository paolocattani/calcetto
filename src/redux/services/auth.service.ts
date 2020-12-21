import {
	AuthenticationResponse,
	LoginRequest,
	RegistrationRequest,
	UpdateUserRequest,
	DeleteUserRequest,
	LogoutRequest, SessionStatus, Message
} from '../../@common/models';
import { OmitHistory } from '../../@common/models/common.models';
import {putWrapper, deleteWrapper, postWrapper, getWrapper} from '../../@common/utils';
import {buffers, END, eventChannel} from 'redux-saga';

// Update
export const updateUser = (updateUserRequest: OmitHistory<UpdateUserRequest>) =>
	putWrapper<UpdateUserRequest, AuthenticationResponse>('/api/v2/auth/update', updateUserRequest);
// Delete
export const deleteUser = (deleteUserRequest: OmitHistory<DeleteUserRequest>) =>
	deleteWrapper<DeleteUserRequest, AuthenticationResponse>('/api/v2/auth/delete', deleteUserRequest);
// Login
export const login = (loginRequest: OmitHistory<LoginRequest>) =>
	postWrapper<LoginRequest, AuthenticationResponse>('/api/v2/auth/login', loginRequest);
// Login
export const logout = (logoutRequest:OmitHistory<LogoutRequest>) => getWrapper<AuthenticationResponse>('/api/v2/auth/logout');
// Registration
export const registration = ( registrationRequest: OmitHistory<RegistrationRequest>) => postWrapper<RegistrationRequest, AuthenticationResponse>('/api/v2/auth/register', registrationRequest);
export const checkAuthentication = () => getWrapper<AuthenticationResponse>('/api/v2/auth/check');


export const createSessionChannel = (channel: EventSource) =>
	eventChannel<Message>((emitter) => {
		// Listen for open channel
		const openListener = (event: Event) => console.log('Connected...');
		// Listen for new message
		const messageListener = (messageEvent: MessageEvent) => {
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
