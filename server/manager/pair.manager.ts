import { PairDTO, UserDTO } from '../models/dto/';
import { logProcess, logger } from '../core/logger';
import { Op } from 'sequelize';
import { Stage2, Pair } from '../models/sequelize';

const className = 'Pairs Manager';

export const findAlias = async (player1Id: number, player2Id: number): Promise<string> => {
  logProcess(className + 'findAlias', 'start');
  try {
    const pair = await Pair.findOne({
      where: {
        player1Id,
        player2Id,
        alias: {
          [Op.not]: '',
          [Op.not]: null,
        },
      },
      order: [['updatedAt', 'DESC']],
    });
    logProcess(className + 'findAlias', 'end');
    return pair?.alias ?? '';
  } catch (error) {
    logProcess(className + 'findAlias', 'error');
    return '';
  }
};
export const listInTournament = async (tId: number, user: UserDTO): Promise<PairDTO[]> => {
  logProcess(className + 'listInTournament', 'start');
  try {
    const pairsList = await Pair.findAll({
      where: {
        tournamentId: tId,
        [Op.or]: [{ '$tournament.ownerId$': user!.id }, { '$tournament.public$': true }],
      },
      order: [['id', 'ASC']],
      include: [Pair.associations.tournament, Pair.associations.player1, Pair.associations.player2],
    });
    const modelList = pairsList.map((row, index) => rowToModel(row, index));
    logProcess(className + 'listInTournament', 'end');
    return modelList;
  } catch (error) {
    logProcess(className + 'listInTournament', 'error');
    return [];
  }
};

export const fetchPairsStage2 = async (tournamentId: number): Promise<PairDTO[]> => {
  logProcess(className + '.fetchPairsStage2', 'start');
  let result: PairDTO[] = [];
  try {
    const selectedStage2 = ((await Stage2.findAll({
      attributes: ['pairId'],
      where: { tournamentId, pairId: { [Op.not]: null } },
      group: ['pairId'],
    })) as unknown) as { pairId: number }[];
    logger.info('selectedStage2 : ', selectedStage2);
    const selectedPairs = await Pair.findAll({
      where: {
        tournamentId,
        stage2Selected: true,
        placement: { [Op.not]: null },
        id: { [Op.notIn]: selectedStage2.map((p) => p.pairId) },
      },
      include: [Pair.associations.tournament, Pair.associations.player1, Pair.associations.player2],
      order: [
        ['stage1Name', 'ASC'],
        ['placement', 'ASC'],
      ],
    });
    result = selectedPairs.map((p, i) => rowToModel(p, i));
  } catch (error) {
    logProcess(className + '.fetchPairsStage2', 'error');
    logger.error('fetchPairsStage2 : ', error);
  }
  logProcess(className + '.fetchPairsStage2', `end (${result.length})`);
  return result;
};

export function rowToModel(row: Pair, index: number): PairDTO {
  return {
    id: row.id,
    rowNumber: index + 1,
    tId: row.tournamentId,
    alias: row.alias,
    stage1Name: row.stage1Name,
    paid1: row.paid1,
    paid2: row.paid2,
    placement: row.placement,
    label: valueFormatter(row),
    player1: {
      id: row.player1?.id ?? null,
      name: row.player1?.name ?? '',
      surname: row.player1?.surname ?? '',
      alias: row.player1?.alias ?? '',
      label: row.player1?.alias ?? '',
      role: row.player1?.role ?? null,
      email: row.player1?.email ?? '',
      phone: row.player1?.phone ?? '',
      match_played: row.player1?.match_played ?? 0,
      match_won: row.player1?.match_won ?? 0,
      total_score: row.player1?.total_score ?? 0,
      editable: row.player1?.editable ?? false,
    },
    player2: {
      id: row.player2?.id ?? null,
      name: row.player2?.name ?? '',
      surname: row.player2?.surname ?? '',
      alias: row.player2?.alias ?? '',
      label: row.player2?.alias ?? '',
      role: row.player2?.role ?? null,
      email: row.player2?.email ?? '',
      phone: row.player2?.phone ?? '',
      match_played: row.player2?.match_played ?? 0,
      match_won: row.player2?.match_won ?? 0,
      total_score: row.player2?.total_score ?? 0,
      editable: row.player2?.editable ?? false,
    },
  };
}

export function valueFormatter(row: any) {
  const { alias, id, player1, player2 } = row;
  if (alias && alias !== '') return `${alias} ( ${id} )`;
  if (!player1 || !player2) return '';
  return `${player1.alias ? player1.alias : player1.name} - ${player2.alias ? player2.alias : player2.name} ( ${id} )`;
}
