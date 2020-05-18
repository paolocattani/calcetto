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
  // User Message
  getMessage({ sessionState: { message } }: RootState) {
    return message;
  },
  showMessage({ sessionState: { showMessage } }: RootState) {
    return showMessage;
  },
  // User / Session
  getUser({ sessionState: { user } }: RootState) {
    return user;
  },
  getSession({ sessionState }: RootState) {
    return sessionState;
  },
};
