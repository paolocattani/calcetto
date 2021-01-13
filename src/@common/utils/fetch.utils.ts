//-----------------------------
// Fetch utils
//
import { GenericReponse, OmitHistory, UnexpectedServerError } from '../models/common.models';
import { toast } from 'react-toastify';

//
export const default_headers: HeadersInit = {
	'Content-Type': 'application/json',
	// credentials: 'same-origin',
};

interface IFetchCallback<T> {
	(response: T): T | Promise<T>;
}

// Get
export const getWrapper = <T extends GenericReponse>(url: string, afterResponse?: IFetchCallback<T>) =>
	fetchWrapper<never, T>(url, 'GET', undefined, afterResponse);
// Delete
export const deleteWrapper = <B, T extends GenericReponse>(
	url: string,
	body?: OmitHistory<B>,
	afterResponse?: IFetchCallback<T>
) => fetchWrapper<B, T>(url, 'DELETE', body, afterResponse);

// Put
export const putWrapper = <B, T extends GenericReponse>(
	url: string,
	body?: OmitHistory<B>,
	afterResponse?: IFetchCallback<T>
) => fetchWrapper<B, T>(url, 'PUT', body, afterResponse);

// Post
export const postWrapper = <B, T extends GenericReponse>(
	url: string,
	body?: OmitHistory<B>,
	afterResponse?: IFetchCallback<T>
) => fetchWrapper<B, T>(url, 'POST', body, afterResponse);

// wrapper
export const fetchWrapper = async <B, T extends GenericReponse>(
	url: string,
	method: string,
	body?: OmitHistory<B>,
	afterResponse?: IFetchCallback<T>
): Promise<T | GenericReponse> => {
	console.log('fetchWrapper : ', method, url, body);
	let response = null;
	try {
		response = await fetch(url, {
			method,
			body: method === 'PUT' || method === 'POST' || method === 'DELETE' ? JSON.stringify(body) : undefined,
			headers: default_headers,
		});
		const result: T = await response.json();
		return afterResponse ? afterResponse(result) : result;
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
