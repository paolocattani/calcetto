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

export const getWrapper = async <T extends GenericReponse>(url: string): Promise<T> => await fetchWrapper(url, 'GET');
export const deleteWrapper = async <B, T extends GenericReponse>(url: string, body?: OmitHistory<B>): Promise<T> =>
  await fetchWrapper(url, 'DELETE', body);
export const putWrapper = async <B, T extends GenericReponse>(url: string, body?: OmitHistory<B>): Promise<T> =>
  await fetchWrapper(url, 'PUT', body);
export const postWrapper = async <B, T extends GenericReponse>(url: string, body?: OmitHistory<B>): Promise<T> =>
  await fetchWrapper(url, 'POST', body);

export const fetchWrapper = async <B, T extends GenericReponse>(
  url: string,
  method: string,
  body?: OmitHistory<B>
): Promise<T> => {
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
    // If performing fetch from FE, show errror.
    if (!url.startsWith('http')) {
      toast.error('Whoooops...Something went wrong...');
    }
    /*  FIXME:
      Type 'GenericReponse' is not assignable to type 'T'.
      'GenericReponse' is assignable to the constraint of type 'T', but 'T' could be instantiated with a different subtype of constraint 'GenericReponse'.
    */
    return UnexpectedServerError as any;
  }
};
