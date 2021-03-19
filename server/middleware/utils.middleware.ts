import { ClientToServerEvents, ServerToClientEvents } from '@common/models';
import { Request, Response, NextFunction } from 'express';
import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import { AppRequest } from '../controller';

type mw = (req: Request | AppRequest, res: Response, next?: NextFunction) => void;
type mwSocket = (
	socket: Socket<ClientToServerEvents, ServerToClientEvents>,
	request: Request,
	next: (err?: ExtendedError) => void
) => void;
//--------- Resolve promises
export const asyncMiddleware = (middleware: mw) => (req: Request, res: Response, next: NextFunction) => {
	Promise.resolve(middleware(req, res, next)).catch(next);
};

export const asyncSocketMiddleware = (fn: mwSocket) => (socket: Socket, next: (err?: ExtendedError) => void) =>
	Promise.resolve(fn(socket, <Request>socket.request, next)).catch(next);

export const mwWrapper = (middleware: mw) => (socket: Socket, next: (err?: ExtendedError) => void) =>
	middleware(<Request>socket.request, <Response>{}, <NextFunction>next);
