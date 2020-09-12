import Player from '../models/sequelize/player.model';
import Pair from '../models/sequelize/pair.model';
import { getRandomIntInclusive } from '../core/utils';
import Tournament from '../models/sequelize/tournament.model';
import { logger } from '../core/logger';
import { isProductionMode } from '../core/debug';
import chalk from 'chalk';
import { TournamentProgress } from '../../src/@common/dto';

const TOURNAMENT_RECORDS = 10;

const players = [
  { name: 'Andrea', surname: 'Messi', alias: 'Messi', email: '', phone: '', role: 'Master' },
  { name: 'Paolo', surname: 'Cattani', alias: 'Pool', email: '', phone: '', role: 'Master' },
  { name: 'Gilberto', surname: 'Turato', alias: 'Gilbe', email: '', phone: '', role: 'Master' },
  { name: 'Enrico', surname: 'Bevilacqua', alias: 'Tocio', email: '', phone: '', role: 'Master' },
  { name: 'Dante', surname: 'Riello', alias: 'The Wall ', email: '', phone: '', role: 'Master' },
  { name: 'Michele', surname: 'Maschio', alias: 'Tope', email: '', phone: '', role: 'Master' },
  { name: 'Fede', surname: 'Beggiato', alias: 'Fede', email: '', phone: '', role: 'Attaccante' },
  { name: 'Salvatore', surname: 'Bonanno', alias: 'Salvo', email: '', phone: '', role: 'Attaccante' },
  { name: 'Gianni', surname: 'Guion', alias: 'Gianni', email: '', phone: '', role: 'Portiere' },
  { name: 'Lorenzo', surname: '', alias: 'Lorenzo', email: '', phone: '', role: 'Portiere' },
  { name: 'Niero', surname: '', alias: 'Niero', email: '', phone: '', role: 'Attaccante' },
  { name: 'Renzo', surname: 'Pinton', alias: 'Renzo', email: '', phone: '', role: 'Portiere' },
  { name: 'Fabio', surname: 'Zambello', alias: 'Fabio', email: '', phone: '', role: 'Attaccante' },
  { name: 'Amante', surname: '', alias: 'Amante', email: '', phone: '', role: 'Attaccante' },
  { name: 'Vanni', surname: '', alias: 'Vanni', email: '', phone: '', role: 'Portiere' },
  { name: 'Mirco', surname: 'Dalan', alias: 'Mirco', email: '', phone: '', role: 'Portiere' },
  { name: 'Jacopo', surname: '', alias: 'Jacopo', email: '', phone: '', role: 'Attaccante' },
  { name: 'Melanie', surname: '', alias: 'Melanie', email: '', phone: '', role: 'Attaccante' },
  { name: 'Luca', surname: '', alias: 'Luca', email: '', phone: '', role: 'Portiere' },
  { name: 'Daniel', surname: '', alias: 'Daniel', email: '', phone: '', role: 'Attaccante' },
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
    const model = {
      id: null,
      name: ii,
      date: new Date(),
      ownerId: null,
      progress: TournamentProgress.New,
      autOrder: ii % 2 == 0,
      public: true,
    };
    await Tournament.create(model);
  }
}

async function playerGenerator(): Promise<void> {
  for (let ii = 0; ii < players.length; ii++)
    await Player.create({
      name: players[ii].name,
      surname: players[ii].surname,
      alias: players[ii].alias,
      role: players[ii].role,
    });
}

async function pairGenerator(): Promise<void> {
  for (let ii = 1; ii <= players.length / 2; ii++) {
    const model = {
      id: null,
      tournamentId: 1,
      player1Id: getRandomIntInclusive(1, players.length),
      player2Id: getRandomIntInclusive(1, players.length),
      alias: ii % 2 === 0 ? `PAlias${ii}` : '',
      // stage1Name: getRandomIntInclusive(1, 3),
    };
    await Pair.create(model);
  }
}
