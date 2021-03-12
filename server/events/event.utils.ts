import chalk from 'chalk';
import { Socket } from 'socket.io';
import { EventMessage } from '../../src/@common/models';
import { logger } from '../core/logger';

export const broadcastUpdates = (socket: Socket, room: string, message: EventMessage) => {
	logEvent('Broadcasting updates to rooom : ', room);
	socket.to(room).emit('new_message', message);
};

export const logEvent = (str: string, ...args: any) =>
	logger.info(`${chalk.blueBright('[ Event ]')} : ${str} `, ...args);
