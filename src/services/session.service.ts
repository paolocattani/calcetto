import { CheckAuthenticationRequest, CheckAuthenticationResponse } from 'models';
import { UserDTO } from 'models/user.model';

// eslint-disable-next-line no-empty-pattern
export const CheckAuthentication = async ({}: CheckAuthenticationRequest): Promise<CheckAuthenticationResponse> => {
  try {
    const response = await fetch('/api/v1/auth/');
    const user: UserDTO | null = await response.json();
    console.log('SessionContext.user : ', user);

    return { user: user && response.ok ? user : undefined };
  } catch (error) {
    handleError('SessionContext.error :');
    return { user: undefined };
  }
};

const handleError = (errorMessage: string) => {
  console.warn('Session Error : ', errorMessage);
  throw new Error('Something went wrong');
};
