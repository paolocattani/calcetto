import { PairDTO, UserDTO } from '../../src/@common/dto';
import { logProcess, logger } from '../core/logger';
import { Op } from 'sequelize';
import { Stage2, Pair, Player } from '../database/models';
import { asyncForEach } from '../core/utils';
import { convertEntityToDTO } from './player.manager';

const className = 'Pairs Manager';

export const findById = async (pairId: number) => {
	const methodName = className + '.findById';
	logProcess(methodName, 'start');
	try {
		const pair = await Pair.findOne({
			where: { id: pairId },
			include: [Pair.associations.tournament, Pair.associations.player1, Pair.associations.player2],
		});
		const dto = pair ? rowToModel(pair, 0) : null;
		logProcess(methodName, 'end');
		return dto;
	} catch (error) {
		logProcess(methodName, 'error', error);
	}
	logProcess(methodName, 'end');
};

export const updatePlacement = async (mapper: { id: number; placement: number }[]): Promise<boolean> => {
	const methodName = className + '.updatePlacement';
	logProcess(methodName, 'start');
	try {
		await asyncForEach(mapper, async (current, index, ref) => {
			await Pair.update({ placement: current.placement }, { where: { id: current.id } });
		});
	} catch (error) {
		logProcess(methodName, 'error : ', error);
		return false;
	}
	logProcess(methodName, 'end');
	return true;
};

export const findAlias = async (player1Id: number, player2Id: number): Promise<string> => {
	const methodName = className + '.findAlias';
	logProcess(methodName, 'start');
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
		logProcess(methodName, 'end');
		return pair?.alias ?? '';
	} catch (error) {
		logProcess(methodName, 'error', error);
		return '';
	}
};
export const listInTournament = async (tId: number, user: UserDTO): Promise<Array<PairDTO>> => {
	const methodName = className + '.listInTournament';
	logProcess(methodName, 'start');
	try {
		const pairsList = await Pair.findAll({
			where: {
				tournamentId: tId,
				[Op.or]: [{ '$tournament.ownerId$': user.id }, { '$tournament.public$': true }],
			},
			order: [['id', 'ASC']],
			include: [Pair.associations.tournament, Pair.associations.player1, Pair.associations.player2],
		});
		const modelList = pairsList.map((row, index) => rowToModel(row, index));
		logProcess(methodName, 'end');
		return modelList;
	} catch (error) {
		logProcess(methodName, 'error', error);
		return [];
	}
};

export const fetchPairsStage2 = async (tournamentId: number): Promise<Array<PairDTO>> => {
	const methodName = className + '.fetchPairsStage2';
	logProcess(methodName, 'start');
	let result: PairDTO[] = [];
	try {
		const selectedStage2 = await Stage2.findAll({
			attributes: ['pairId'],
			where: { tournamentId, pairId: { [Op.not]: null }, step: 0 },
			group: ['pairId'],
		});
		logger.info(
			'selectedStage2 : ',
			selectedStage2.map((p) => p.pairId)
		);
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
		result = selectedPairs.length !== 0 ? selectedPairs.map((p, i) => rowToModel(p, i)) : [];
	} catch (error) {
		logProcess(methodName, 'error', error);
		logger.error('fetchPairsStage2 : ', error);
	}
	logProcess(methodName, `end (${result.length})`);
	return result;
};

export const parseBodyToPair = (body: any): Partial<Pair> => ({
	id: body.id,
	alias: body.alias,
	stage1Name: body.stage1Name,
	placement: body.placement,
	paid1: body.paid1,
	paid2: body.paid2,
	tournamentId: body.tournamentId,
	player1Id: body.player1?.id ?? body.player1Id,
	player1: body.player1,
	player2Id: body.player2?.id ?? body.player2Id,
	player2: body.player2,
});

export function rowToModel(row: Pair, index: number): PairDTO {
	return {
		id: row.id,
		rowNumber: index + 1,
		tournamentId: row.tournamentId,
		alias: row.alias,
		stage1Name: row.stage1Name,
		paid1: row.paid1,
		paid2: row.paid2,
		placement: row.placement,
		label: valueFormatter(row),
		player1: convertEntityToDTO(row.player1, index + 2, row.player1?.editable, row.player1?.label),
		player2: convertEntityToDTO(row.player2, index + 3, row.player2?.editable, row.player2?.label),
	};
}

export function valueFormatter(row: PairDTO | Pair) {
	const { alias, id, player1, player2 } = row;
	if (alias && alias !== '') {
		return alias;
	}
	if (!player1 || !player2) {
		return '';
	}
	return `${player1.alias ? player1.alias : player1.name} - ${player2.alias ? player2.alias : player2.name}`;
}
