// Models
import { Stage1, Tournament } from '../database';
import { Stage1Row, UserDTO } from '../../src/@common/dto';
// Core
import { logProcess, logger } from '../core/logger';
import { asyncForEach } from '../core/utils';
//
import { getDbConnection } from '../database/config/connection';
import { isAdmin } from '../manager/auth.manager';
//
import { Op } from 'sequelize';
import { SessionStatus } from '../../src/@common/models';
import { sendNotifications } from '../events/events';

const className = 'Stage1 Manager : ';

export const deleteStage1 = async (tournamentId: number) => {
	logProcess(className + 'deleteStage1', 'start');
	try {
		const tournament = await Tournament.findByPk(tournamentId);
		if (!tournament) {
			return;
		}
		await Stage1.destroy({ where: { tournamentId } });
		const message = {
			status: SessionStatus.STAGE1_DELETE,
			label: 'common:notification.stage1_delete',
			data: { name: tournament.name, date: tournament.date },
		};
		sendNotifications(message);
	} catch (error) {
		logProcess(className + 'deleteStage1', 'error');
		logger.error('deleteStage1 : ', error);
	}
	logProcess(className + 'deleteStage1', 'end');
};

export const findStage1 = async (
	tournamentId: number,
	name: string,
	pair1Id: number,
	pair2Id: number
): Promise<Stage1 | null> => {
	logProcess(className + 'findFromPairs', 'start');
	let stage: Stage1 | null = null;
	try {
		stage = await Stage1.findOne({
			where: {
				[Op.or]: [{ [Op.and]: { pair1Id, pair2Id } }, { [Op.and]: { pair1Id: pair2Id, pair2Id: pair1Id } }],
				name,
				tournamentId,
			},
		});
	} catch (error) {
		logProcess(className + 'updateCell', 'error');
	}
	logProcess(className + 'findFromPairs', 'end');
	return stage;
};

export const updateCell = async (
	tournamentId: number,
	name: string,
	pair1Id: number,
	pair2Id: number,
	score: string | null
) => {
	logProcess(className + 'updateCell', 'start');
	try {
		logger.info('updateCell : ', tournamentId, name, pair1Id, pair2Id, score);
		const record = await findStage1(tournamentId, name, pair1Id, pair2Id);
		if (record) {
			if (record.pair1Id === pair1Id) {
				await record.update({ score: !!score ? score : null });
			} else {
				await record.update({ score: getOpposite(score ? parseInt(score) : null) });
			}
		} else {
			throw new Error('Record not found');
		}
	} catch (error) {
		logProcess(className + 'updateCell', error);
		logger.error('updateCell : ', error);
	}
	logProcess(className + 'updateCell', 'end');
};

export const generateStage1Rows = async (rows: Stage1Row[], stageName: string, user: UserDTO): Promise<Stage1Row[]> => {
	logProcess(className + 'generateStage1Rows', 'start');
	try {
		const connection = await getDbConnection();
		const transaction = await connection.transaction();
		await asyncForEach<Stage1Row>(rows, async (currentRow, index, rowsRef) => {
			rowsRef[index]['total'] = 0;
			for (let currentRowKey in currentRow) {
				if (currentRowKey.startsWith('col')) {
					// Numero riga/colonna corrente
					let currentRowRef = rowsRef[index]; // Riga attuale da a rowRef
					const rowIndex = currentRowRef.rowNumber;
					const colIndex = parseInt(currentRowKey.substring(3));
					// Valore attuale della cella e della sua opposta
					let oppositeRow = rowsRef[colIndex - 1];
					// Coppie e punteggi
					const pair1 = currentRowRef.pair;
					const pair2 = oppositeRow.pair;
					const { tournamentId } = pair1;
					if (rowIndex !== colIndex) {
						try {
							/**
							 * Salvo solo una parte della matrice in quanto l'altra posso calcolarla
							 * Quindi dal record sotto posso ricavare il risultato di :
							 *
							 * |  ID  | tId | p1Id | p2Id | score |
							 * ------------------------------------
							 * |  1   |  1  |  28  |   17 |   3   |
							 *
							 *
							 *            28 vs 17 = 3
							 *            17 vs 28 = 0
							 *
							 */
							// logger.info('model1 : ', model);
							// console.log(`     ( p1,p2,score ) = ( ${p1},${p2}, ${score} )`);
							const model = { name: stageName, tournamentId, pair1Id: pair1.id, pair2Id: pair2.id };
							// Salvo solo uno scontro e l'altro lo calcolo.
							const isEditable = isAdmin(user);
							const where = {
								// where ( p1Id = .. and p2Id = .. ) or ( p2Id = .. and p1Id = .. )
								[Op.or]: [
									{ [Op.and]: { pair1Id: pair1.id, pair2Id: pair2.id } },
									{ [Op.and]: { pair1Id: pair2.id, pair2Id: pair1.id } },
								],
								name: stageName,
								tournamentId,
							};
							const include = [Stage1.associations.pair1, Stage1.associations.pair2];
							let record: Stage1 | null = null;
							let created: boolean = false;
							if (isEditable) {
								[record, created] = await Stage1.findOrCreate({
									where,
									defaults: model,
									transaction,
									// @ts-ignore
									// FIXME:
									include,
								});
							} else record = await Stage1.findOne({ where, transaction, include });

							// if (stageName === '1') logger.info('model : ', created, record);
							if (!created && record) {
								updateRow(
									currentRowRef,
									currentRowKey,
									oppositeRow,
									rowIndex,
									record.pair1Id === pair1.id ? record.score : getOpposite(record.score),
									record.pair1Id === pair1.id ? record.pair1.placement : record.pair2.placement
								);
							}
						} catch (error) {
							logger.error('Error on  : ', currentRowRef, currentRowKey, error);
						}
					}
				}
			}
		});
		await transaction.commit();
		logProcess(className + 'generateStage1Rows', 'end');
		return rows;
	} catch (error) {
		logProcess(className + 'generateStage1Rows', error);
		logger.error('generateStage1Rows : ', error);
	}
	return rows;
};

const updateRow = (
	currentRowRef: Stage1Row,
	currentRowKey: keyof Stage1Row,
	oppositeRow: Stage1Row,
	rowIndex: number,
	score?: number | null,
	placement?: number
) => {
	currentRowRef[currentRowKey] = score !== undefined ? score : null;
	currentRowRef['placement'] = placement ? placement : 0;
	if (score !== undefined && score !== null) {
		currentRowRef['total'] = currentRowRef['total'] ? currentRowRef['total'] + score : score;
	}

	oppositeRow[`col${rowIndex}`] = getOpposite(score);
};

/**
 *
 * @param value il valore di partenza
 * @returns il valore opposto a quello di partenze
 *
 *  3->0 , 2->1 , 1->2 , 0->3
 */
export function getOpposite(value?: number | null): number | null {
	/*
	 * Attenzione :
	 *  !0 = true
	 *  !''  = true
	 *  !null   = true
	 *  !undefined  = true
	 */
	if (value === null) return null;
	switch (value) {
		case 3:
			return 0;
		case 2:
			return 1;
		case 1:
			return 2;
		case 0:
			return 3;
		default:
			return null;
	}
}
