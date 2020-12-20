//-----------------------------
// Fetch utils
//
import { GenericReponse, OmitHistory, UnexpectedServerError } from '../models/common.models';
import { toast } from 'react-toastify';

//
export const DEFAULT_HEADERS: { headers: HeadersInit } = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getWrapper = <T extends GenericReponse>(url: string) => fetchWrapper<never,T>(url, 'GET');
export const deleteWrapper = <B, T extends GenericReponse>(url: string, body?: OmitHistory<B>) => fetchWrapper<B,T>(url, 'DELETE', body);
export const putWrapper = <B, T extends GenericReponse>(url: string, body?: OmitHistory<B>) => fetchWrapper<B,T>(url, 'PUT', body);
export const postWrapper = <B, T extends GenericReponse>(url: string, body?: OmitHistory<B>) => fetchWrapper<B,T>(url, 'POST', body);

export const fetchWrapper = async <B, T extends GenericReponse>(
  url: string,
  method: string,
  body?: OmitHistory<B>
): Promise<T | typeof UnexpectedServerError> => {
  console.log('fetchWrapper : ', method, url, body);
  let response = null;
  try {
    response = await fetch(url, {
      method,
      body: method === 'PUT' || method === 'POST' || method === 'DELETE' ? JSON.stringify(body) : undefined,
      ...DEFAULT_HEADERS,
    });
    return await response.json();
  } catch (error) {
    console.group('An error occur : ');
    console.error('Error', error);
    console.error('Details : ', response);
    console.groupEnd();
    toast.error('Whoooops...Something went wrong...');
    /*  FIXME:
      Type 'GenericReponse' is not assignable to type 'T'.
      'GenericReponse' is assignable to the constraint of type 'T', but 'T' could be instantiated with a different subtype of constraint 'GenericReponse'.
    */
    return UnexpectedServerError;
  }
};
