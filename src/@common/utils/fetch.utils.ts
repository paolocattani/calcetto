//-----------------------------
// Fetch utils
//
import { GenericResponse, OmitHistory, UnexpectedServerError } from '../models/common.models';
import { toast } from 'react-toastify';

interface IFetchCallback<T> {
	(response: T): T | Promise<T>;
}

// Get
export const getWrapper = <T extends GenericResponse>(url: string, afterResponse?: IFetchCallback<T>) =>
	fetchWrapper<never, T>(url, 'GET', undefined, afterResponse);
// Delete
export const deleteWrapper = <B, T extends GenericResponse>(
	url: string,
	body?: OmitHistory<B>,
	afterResponse?: IFetchCallback<T>
) => fetchWrapper<B, T>(url, 'DELETE', body, afterResponse);

// Put
export const putWrapper = <B, T extends GenericResponse>(
	url: string,
	body?: OmitHistory<B>,
	afterResponse?: IFetchCallback<T>
) => fetchWrapper<B, T>(url, 'PUT', body, afterResponse);

// Post
export const postWrapper = <B, T extends GenericResponse>(
	url: string,
	body?: OmitHistory<B>,
	afterResponse?: IFetchCallback<T>
) => fetchWrapper<B, T>(url, 'POST', body, afterResponse);

// FIXME: wrapper
const rawHost = process.env.REACT_APP_SERVER_HOST ? process.env.REACT_APP_SERVER_HOST : 'http://localhost:5001';
const host = rawHost.slice(-1) === '/' ? rawHost.substring(0, rawHost.length - 1) : rawHost;
export const fetchWrapper = async <B, T extends GenericResponse>(
	url: string,
	method: string,
	body?: OmitHistory<B>,
	afterResponse?: IFetchCallback<T>
): Promise<T | GenericResponse> => {
	const completeUrl = host + url;
	console.log('fetchWrapper.request : ', method, completeUrl, body);
	let response = null;
	try {
		response = await fetch(completeUrl, {
			method,
			body: ['PUT', 'POST', 'DELETE'].includes(method) ? JSON.stringify(body) : undefined,
			credentials: 'include',
			mode: 'cors',
			cache: 'default',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
		const result: T = await response.json();
		console.log('fetchWrapper.response : ', result);
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
