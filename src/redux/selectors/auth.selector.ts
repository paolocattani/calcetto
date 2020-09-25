import { RootState } from '@common/models';

// Get state from store
export const AuthSelector = {
  isLoading: ({ authState: { isLoading } }: RootState) => isLoading,
  isAdmin: ({ authState: { isAdmin } }: RootState) => isAdmin,
  isAuthenticated: ({ authState: { isAuthenticated } }: RootState) => isAuthenticated,
  getUser: ({ authState: { user } }: RootState) => user,
  getSession: ({ authState }: RootState) => authState,
};
