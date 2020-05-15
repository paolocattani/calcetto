import { RootState } from 'models';

// Get state from store
export const SessionSelector = {
  isLoading({ sessionState: { isLoading } }: RootState) {
    return isLoading;
  },
  getMessage({ sessionState: { message } }: RootState) {
    return message;
  },
  getUser({ sessionState: { user } }: RootState) {
    return user;
  },
  isAdmin({ sessionState: { isAdmin } }: RootState) {
    return isAdmin;
  },
  isAuthenticated({ sessionState: { isAuthenticated } }: RootState) {
    return isAuthenticated;
  },
  getSession({ sessionState }: RootState) {
    return sessionState;
  },
};
