import { NextFunction, Response, Request } from 'express';

//--------- Default cache control
export const cacheControl = (req: Request, res: Response, next: NextFunction) => {
	// Period in second, this one is 5 minutes
	const period = 60 * 5;
	// you only want to cache for GET requests
	// for the other requests set strict no caching parameters
	res.set('Cache-control', req.method == 'GET' ? `public, max-age=${period}` : 'no-store');

	next();
};

//--------- Do not cache this request
export const doNotCacheThis = (req: Request, res: Response, next: NextFunction) => {
	res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
	res.set('Pragma', 'no-cache');
	res.set('Expires', '0');

	next();
};
