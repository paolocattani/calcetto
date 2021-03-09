import { Request, Response, NextFunction } from 'express';
import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';

//--------- Resolve promises
export const asyncMiddleware = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
	Promise.resolve(fn(req, res, next)).catch(next);
};

export const asyncSocketMiddleware = (fn: any) => (socket: Socket, next: (err?: ExtendedError) => void) => {
	Promise.resolve(fn(socket, socket.request as Request, next)).catch(next);
};
