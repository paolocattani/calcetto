import { toast } from 'react-toastify';
import { GenericReponse, UserMessageType } from '../models/common.model';
import { HTTPStatusCode } from '../models/HttpStatusCode';

export const handleError = (error: any, message: string): void => {
  console.error(`${message}`, error);
  toast.error(message);
  throw new Error(`Something went wrong : ${message}`);
};

export const handleGenericError = <T extends GenericReponse>(error: any, result: T): void => {
  console.group('An error occur : ');
  console.error('Error', error);
  console.error('Details : ', { ...result });
  console.groupEnd();
  toast.error('Whops...Something went wrong...');
  throw new Error(`Something went wrong : ${error}`);
};

export const UnexpectedServerError = {
  code: HTTPStatusCode.InternalServerError,
  message: 'Unexpected Server Error',
  userMessage: {
    type: UserMessageType.Danger,
    // eslint-disable-next-line quotes
    message: "Errore server non previsto. E' stata avviata la procedura di autodistruzione.",
  },
};

export const DEFAULT_HEADERS = { headers: { 'Content-Type': 'application/json' } };
