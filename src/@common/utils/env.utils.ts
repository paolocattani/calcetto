import util from 'util';

export function getEnv(): string {
	return process.env.NODE_ENV || 'production';
}
/**
 * Detect production environment
 *
 * @returns boolean (if env is 'production' then returns true or not)
 */
export function isProductionMode(): boolean {
	return process.env.NODE_ENV === 'production';
}

/**
 * Detect dev environment
 *
 * @returns boolean (if env is 'development' then returns true or not)
 */
export function isDevMode(): boolean {
	return process.env.NODE_ENV == undefined || process.env.NODE_ENV == 'development';
}

/**
 * Detect test environment
 *
 * @returns boolean (if env is 'test' then returns true or not)
 */
export function isTestMode(): boolean {
	return process.env.NODE_ENV == 'test';
}

/**
 * output debug information
 *
 * @param target  Target object
 * @returns    string
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function vardump(target: any): string {
	return util.inspect(target, { showHidden: true, showProxy: true, depth: 10 });
}
