import { RootState } from 'models';

// Get state from store
export const SessionSelector = {
  isLoading({ sessionState: { isLoading } }: RootState) {
    return isLoading;
  },
  // Authentication / Role
  isAdmin({ sessionState: { isAdmin } }: RootState) {
    return isAdmin;
  },
  isAuthenticated({ sessionState: { isAuthenticated } }: RootState) {
    return isAuthenticated;
  },
  // User / Session
  getUser({ sessionState: { user } }: RootState) {
    return user;
  },
  getSession({ sessionState }: RootState) {
    return sessionState;
  },
};
