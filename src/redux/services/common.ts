import { toast } from 'react-toastify';
import { GenericReponse, UserMessageType } from '@common/models/common.models';
import { HTTPStatusCode } from '@common/models/HttpStatusCode';

export const handleError = (error: any, message: string): void => {
  console.error(`${message}`, error);
  toast.error(message);
  throw new Error(`Something went wrong : ${message}`);
};

export const handleGenericError = (error: any, response: any): void => {
  console.group('An error occur : ');
  console.error('Error', error);
  console.error('Details : ', response);
  console.groupEnd();
  toast.error('Whoooops...Something went wrong...');
};

export const UnexpectedServerError: GenericReponse = {
  code: HTTPStatusCode.InternalServerError,
  message: 'Unexpected Server Error',
  userMessage: {
    type: UserMessageType.Danger,
    // eslint-disable-next-line quotes
    message: "Errore server non previsto. E' stata avviata la procedura di autodistruzione.",
  },
};

//-----------------------------
// Fetch utils
//
export const BASE_URL = `http://${process.env.SERVER_HOST || 'localhost'}:${process.env.PORT || '5001'}`;
export const DEFAULT_HEADERS = { headers: { 'Content-Type': 'application/json' } };

export const getWrapper = async <T extends GenericReponse>(url: string, version?: string): Promise<T> =>
  await fetchWrapper(url, 'GET', undefined, version);
export const deleteWrapper = async <T extends GenericReponse>(url: string, body?: any, version?: string): Promise<T> =>
  await fetchWrapper(url, 'DELETE', body, version);
export const putWrapper = async <T extends GenericReponse>(url: string, body?: any, version?: string): Promise<T> =>
  await fetchWrapper(url, 'PUT', body, version);
export const postWrapper = async <T extends GenericReponse>(url: string, body?: any, version?: string): Promise<T> =>
  await fetchWrapper(url, 'POST', body, version);

export const fetchWrapper = async <T extends GenericReponse>(
  url: string,
  method: string,
  body?: any,
  version?: string
): Promise<T> => {
  let response = null;
  try {
    response = await fetch(`/api/${version || 'v1'}/${url}`, {
      method,
      body: method === 'PUT' || method === 'POST' || method === 'DELETE' ? JSON.stringify(body) : undefined,
      ...DEFAULT_HEADERS,
    });
    return await response.json();
  } catch (error) {
    handleGenericError(error, response);
    /*  FIXME:
      Type 'GenericReponse' is not assignable to type 'T'.
      'GenericReponse' is assignable to the constraint of type 'T', but 'T' could be instantiated with a different subtype of constraint 'GenericReponse'.
    */
    return UnexpectedServerError as any;
  }
};
