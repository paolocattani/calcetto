import { Request, Response, NextFunction } from 'express';

//--------- Resolve promises
export const asyncMiddleware = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
	Promise.resolve(fn(req, res, next)).catch(next);
};
