import { TypeConstant } from 'typesafe-actions';

export const Request = 'Request';
export const Success = 'Success';
export const Failure = 'Failure';
export const PURGE_STORE_ACTION = 'persist/PURGE';

export const defaultAsyncParams = (actionName: string, name: string): [TypeConstant, TypeConstant, TypeConstant] => [
	`${actionName} ${name} ${Request}`,
	`${actionName} ${name} ${Success}`,
	`${actionName} ${name} ${Failure}`,
];

export const defaultParam = (actionName: string, name: string): [TypeConstant] => [`${actionName} ${name}`];

export interface PurgeResponse {}
