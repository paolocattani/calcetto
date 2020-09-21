//-----------------------------
// Fetch utils

import { GenericReponse, OmitHistory, UnexpectedServerError } from '../models/common.models';
import { toast } from 'react-toastify';

//
export const DEFAULT_HEADERS = { headers: { 'Content-Type': 'application/json' } };

export const getWrapper = async <B, T extends GenericReponse>(url: string, version?: string): Promise<T> =>
  await fetchWrapper(url, 'GET', undefined, version);
export const deleteWrapper = async <B, T extends GenericReponse>(
  url: string,
  body?: OmitHistory<B>,
  version?: string
): Promise<T> => await fetchWrapper(url, 'DELETE', body, version);
export const putWrapper = async <B, T extends GenericReponse>(
  url: string,
  body?: OmitHistory<B>,
  version?: string
): Promise<T> => await fetchWrapper(url, 'PUT', body, version);
export const postWrapper = async <B, T extends GenericReponse>(
  url: string,
  body?: OmitHistory<B>,
  version?: string
): Promise<T> => await fetchWrapper(url, 'POST', body, version);

export const fetchWrapper = async <B, T extends GenericReponse>(
  url: string,
  method: string,
  body?: OmitHistory<B>,
  version?: string
): Promise<T> => {
  let response = null;
  try {
    response = await fetch(url, {
      method,
      body: method === 'PUT' || method === 'POST' || method === 'DELETE' ? JSON.stringify(body) : undefined,
      ...DEFAULT_HEADERS,
    });
    return await response.json();
  } catch (error) {
    // If performing fetch from FE, show errror.
    if (!url.startsWith('http')) {
      handleGenericError(error, response);
    }
    /*  FIXME:
      Type 'GenericReponse' is not assignable to type 'T'.
      'GenericReponse' is assignable to the constraint of type 'T', but 'T' could be instantiated with a different subtype of constraint 'GenericReponse'.
    */
    return UnexpectedServerError as any;
  }
};

export const handleGenericError = (error: any, response: any): void => {
  console.group('An error occur : ');
  console.error('Error', error);
  console.error('Details : ', response);
  console.groupEnd();
  toast.error('Whoooops...Something went wrong...');
};
