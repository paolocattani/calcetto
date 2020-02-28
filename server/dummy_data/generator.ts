import Player from '../model/sequelize/player.model';
import Pair from '../model/sequelize/pair.model';
import { getRandomIntInclusive } from '../core/utils';
import Tournament from '../model/sequelize/tournament.model';
import { logger } from '../core/logger';
import { isProductionMode } from '../core/debug';
import chalk from 'chalk';

const TOURNAMENT_RECORDS = 10;
const PLAYER_RECORDS = 20;
const PAIRS_RECORDS = 20;

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
      ownerId: 1,
      progress: '1',
      public: true
    };
    await Tournament.create(model);
  }
}

async function playerGenerator(): Promise<void> {
  const players = [
    { name: 'Andrea', surname: 'Messi', alias: 'Messi', role: 2 },
    { name: 'Paolo', surname: 'Cattani', alias: 'Pool', role: 2 },
    { name: 'Gilberto', surname: 'Turato', alias: 'Gilbe', role: 2 },
    { name: 'Enrico', surname: 'Bevilacqua', alias: 'Tocio', role: 2 },
    { name: 'Dante', surname: 'Riello', alias: 'Dante - The Wall ', role: 2 },
    { name: 'Michele', surname: 'Maschio', alias: 'Tope', role: 2 },
    { name: 'Fede', surname: 'Beggiato', alias: 'Fede', role: 1 },
    { name: 'Salvatore', surname: 'Bonanno', alias: 'Salvo', role: 0 },
    { name: 'Gianni', surname: 'Guion', alias: 'Gianni', role: 0 },
    { name: 'Lorenzo', surname: '', alias: 'Lorenzo', role: 0 },
    { name: 'Niero', surname: '', alias: 'Niero', role: 1 },
    { name: 'Renzo', surname: 'Pinton', alias: 'Renzo', role: 0 },
    { name: 'Fabio', surname: 'Zambello', alias: 'Fabio', role: 1 },
    { name: 'Amante', surname: '', alias: 'Amante', role: 1 },
    { name: 'Vanni', surname: '', alias: 'Vanni', role: 0 },
    { name: 'Mirco', surname: 'Dalan', alias: 'Mirco', role: 2 },
    { name: 'Jacopo', surname: '', alias: 'Jacopo', role: 1 },
    { name: 'Melanie', surname: '', alias: 'Melanie', role: 1 },
    { name: 'Luca', surname: '', alias: 'Luca', role: 0 },
    { name: 'Daniel', surname: '', alias: 'Daniel', role: 1 }
  ];

  for (let ii = 0; ii < players.length; ii++)
    await Player.create({
      name: players[ii].name,
      surname: players[ii].surname,
      alias: players[ii].alias,
      role: players[ii].role
    });
}

async function pairGenerator(): Promise<void> {
  for (let ii = 1; ii <= PAIRS_RECORDS; ii++) {
    const model = {
      id: null,
      tournamentId: 1,
      player1Id: getRandomIntInclusive(1, PLAYER_RECORDS),
      player2Id: getRandomIntInclusive(1, PLAYER_RECORDS),
      pairAlias: ii % 2 === 0 ? `PAlias${ii}` : '',
      stage1Name: getRandomIntInclusive(1, 3)
    };
    await Pair.create(model);
  }
}
