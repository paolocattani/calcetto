import { RootState } from 'redux/models';

// Get state from store
export const SessionSelector = {
  isLoading: ({ sessionState: { isLoading } }: RootState) => isLoading,
  isAdmin: ({ sessionState: { isAdmin } }: RootState) => isAdmin,
  isAuthenticated: ({ sessionState: { isAuthenticated } }: RootState) => isAuthenticated,
  getUser: ({ sessionState: { user } }: RootState) => user,
  getSession: ({ sessionState }: RootState) => sessionState,
  getMessage: ({ sessionState: { message } }: RootState) => message,
};
