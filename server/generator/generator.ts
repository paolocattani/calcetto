import { Tournament, Player, Pair } from '../database/models';
import { getRandomIntInclusive } from '@common/utils/math.utils';
import { logger } from '@core/logger';
import { isProductionMode } from '@common/utils/env.utils';
import chalk from 'chalk';
import { TournamentProgress } from '@common/dto';

const TOURNAMENT_RECORDS = 10;

const players = [
	{ name: 'Andrea', surname: 'Messi', alias: 'Messi', email: 'messi@mailinator.com', phone: '', role: 'Master' },
	{ name: 'Paolo', surname: 'Cattani', alias: 'Pool', email: 'pool@mailinator.com', phone: '', role: 'Master' },
	{ name: 'Gilberto', surname: 'Turato', alias: 'Gilbe', email: 'gilbe@mailinator.com', phone: '', role: 'Master' },
	{ name: 'Enrico', surname: 'Bevilacqua', alias: 'Tocio', email: 'tocio@mailinator.com', phone: '', role: 'Master' },
	{ name: 'Dante', surname: 'Riello', alias: 'The Wall ', email: 'thewall@mailinator.com', phone: '', role: 'Master' },
	{ name: 'Michele', surname: 'Maschio', alias: 'Tope', email: 'tope@mailinator.com', phone: '', role: 'Master' },
	{ name: 'Fede', surname: 'Beggiato', alias: 'Fede', email: 'fede@mailinator.com', phone: '', role: 'Attaccante' },
	{
		name: 'Salvatore',
		surname: 'Bonanno',
		alias: 'Salvo',
		email: 'salvo@mailinator.com',
		phone: '',
		role: 'Attaccante',
	},
	{ name: 'Gianni', surname: 'Guion', alias: 'Gianni', email: 'gianni@mailinator.com', phone: '', role: 'Portiere' },
	{ name: 'Lorenzo', surname: '', alias: 'Lorenzo', email: 'lorenzo@mailinator.com', phone: '', role: 'Portiere' },
	{ name: 'Niero', surname: '', alias: 'Niero', email: 'niero@mailinator.com', phone: '', role: 'Attaccante' },
	{ name: 'Renzo', surname: 'Pinton', alias: 'Renzo', email: 'renzo@mailinator.com', phone: '', role: 'Portiere' },
	{ name: 'Fabio', surname: 'Zambello', alias: 'Fabio', email: 'fabio@mailinator.com', phone: '', role: 'Attaccante' },
	{ name: 'Amante', surname: '', alias: 'Amante', email: 'amante@mailinator.com', phone: '', role: 'Attaccante' },
	{ name: 'Vanni', surname: '', alias: 'Vanni', email: 'vanni@mailinator.com', phone: '', role: 'Portiere' },
	{ name: 'Mirco', surname: 'Dalan', alias: 'Mirco', email: 'mirco@mailinator.com', phone: '', role: 'Portiere' },
	{ name: 'Jacopo', surname: '', alias: 'Jacopo', email: 'jacopo@mailinator.com', phone: '', role: 'Attaccante' },
	{ name: 'Melanie', surname: '', alias: 'Melanie', email: 'mela@mailinator.com', phone: '', role: 'Attaccante' },
	{ name: 'Luca', surname: '', alias: 'Luca', email: 'luca@mailinator.com', phone: '', role: 'Portiere' },
	{ name: 'Daniel', surname: '', alias: 'Daniel', email: 'daniel@mailinator.com', phone: '', role: 'Attaccante' },
];

export default async function generator(start: boolean): Promise<void> {
	if (start === false || isProductionMode()) {
		return;
	}

	logger.info(chalk.cyan.bold('Starting dummy data generator....'));
	await tournamentGenerator();
	await playerGenerator();
	await pairGenerator();
	logger.info(chalk.cyan.bold('Generation complete !'));
}

async function tournamentGenerator(): Promise<void> {
	for (let ii = 1; ii <= TOURNAMENT_RECORDS; ii++) {
		const model: Partial<Tournament> = {
			id: null,
			name: 'Torneo ' + ii,
			date: new Date(),
			progress: TournamentProgress.New,
			autoOrder: ii % 2 == 0,
			public: true,
		};
		await Tournament.create(model);
	}
}

async function playerGenerator(): Promise<void> {
	for (let ii = 0; ii < players.length; ii++) {
		await Player.create(players[ii]);
	}
}

// eslint-disable-next-line sonarjs/cognitive-complexity
async function pairGenerator(): Promise<void> {
	const players: Array<number> = [];
	for (let ii = 1; ii <= players.length / 2; ii++) {
		let playerId = getRandomIntInclusive(1, players.length);
		let player1Id = 0;
		let player2Id = 0;
		while (player1Id === 0 && player2Id === 0) {
			if (!players.includes(playerId)) {
				if (!player1Id) {
					player1Id = playerId;
					players.push(playerId);
				}
				if (!player2Id) {
					player2Id = playerId;
					players.push(playerId);
				}
			}
			playerId = getRandomIntInclusive(1, players.length);
		}
		const model = {
			id: null,
			tournamentId: 1,
			player1Id,
			player2Id,
			alias: ii % 2 === 0 ? `PAlias${ii}` : '',
		};
		await Pair.create(model);
	}
}
