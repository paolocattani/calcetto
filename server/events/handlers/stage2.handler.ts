import { Events } from '../../../src/@common/models/event.model';
import { Server as SocketIoServer, Socket } from 'socket.io';
import { logEvent } from '../event.utils';
import { ClientToServerEvents, EventMessage, ServerToClientEvents, UserMessageType } from '../../../src/@common/models';
import { AppRequest } from '../../controller';
import { TournamentDTO } from '../../../src/@common/dto';

export const stage2Handler = (
	io: SocketIoServer<ClientToServerEvents, ServerToClientEvents>,
	socket: Socket<ClientToServerEvents, ServerToClientEvents>
) => {
	const { user } = <AppRequest>socket.request;

	// Broacast update to all clients inside the room
	const refresh = async (tournament: TournamentDTO) => {
		const room = `tournament-${tournament.id}`;
		logEvent(`Broadcasting Stage2 updated for tournament ${tournament.id}`);
		const message: EventMessage = {
			event: Events.STAGE2_REFRESH,
			data: { tournament },
			label: {
				key: 'event:stage2.updated',
				options: { user: `${user!.name} ${user!.surname}` },
			},
			type: UserMessageType.Success,
		};
		socket.to(room).emit(Events.STAGE2_REFRESH, message, tournament);
	};

	socket.on(Events.STAGE2_UPDATED, refresh);
};
