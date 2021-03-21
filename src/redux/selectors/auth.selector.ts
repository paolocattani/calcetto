import { UserDTO } from 'src/@common/dto';
import { AuthState, RootState } from '../../@common/models';

// Get state from store
export const AuthSelector = {
	isLoading: ({ authState: { isLoading } }: RootState): boolean => isLoading,
	isAdmin: ({ authState: { isAdmin } }: RootState): boolean => isAdmin,
	isAuthenticated: ({ authState: { isAuthenticated } }: RootState): boolean => isAuthenticated,
	getUser: ({ authState: { user } }: RootState): UserDTO | undefined => user,
	getAuth: ({ authState }: RootState): AuthState => authState,
};
