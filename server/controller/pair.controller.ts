import { Router, Request, Response } from 'express';
import chalk from 'chalk';
import { logger } from '../core/logger';
import { getDbConnection } from '../database/config/connection';
// Models
import { Pair } from '../database/models';
import { asyncMiddleware, withAuth, withAdminRights, doNotCacheThis } from '../core/middleware';
import { AppRequest } from './index';
import { listInTournament, findAlias, rowToModel, parseBodyToPair } from '../manager/pair.manager';
import { missingParameters, serverError, success } from './common.response';
import {
	DeletePairsRequest,
	FetchPairsResponse,
	FindAliasRequest,
	FindAliasResponse,
	SavePairResponse,
	SelectPairsRequest,
	SelectPairsResponse,
} from '../../src/@common/models';

const router = Router();

// GET
router.get(
	'/list/',
	withAuth,
	doNotCacheThis,
	asyncMiddleware(async (req: AppRequest, res: Response) => {
		try {
			const { user, query } = req;
			if (!query.tId) {
				return missingParameters(res);
			}
			const tId = parseInt(query.tId as string);
			logger.info(`Looking for pairs in tournament ${chalk.greenBright(tId.toString())}`);
			const pairsList = await listInTournament(tId, user!);
			return success<FetchPairsResponse>(res, { label: 'pair:loaded' }, { pairsList });
		} catch (err) {
			return serverError('GET pair/list error : ', err, res);
		}
	})
);

router.get(
	'/alias',
	withAuth,
	withAdminRights,
	asyncMiddleware(async (req: AppRequest, res: Response) => {
		try {
			// FIXME:
			const { player1Id, player2Id } = (req.query as unknown) as FindAliasRequest;
			logger.info('/alias : ', player1Id, player2Id);
			if (!player1Id || !player2Id) {
				return missingParameters(res);
			}
			const alias = await findAlias(
				parseInt((player1Id as unknown) as string),
				parseInt((player2Id as unknown) as string)
			);
			return success<FindAliasResponse>(res, { label: 'pair:loaded' }, { alias });
		} catch (err) {
			return serverError('GET pair/alias error : ', err, res);
		}
	})
);

// PUT
// Seleziona coppie per fase2
router.put(
	'/selected',
	withAuth,
	withAdminRights,
	asyncMiddleware(async (req: Request, res: Response) => {
		const { stage1Rows, stage1Name, tournamentId }: SelectPairsRequest = req.body;
		const connection = await getDbConnection();
		const transaction = await connection.transaction();
		if (!stage1Rows) {
			return missingParameters(res);
		}
		try {
			// Reset selection
			await Pair.update({ stage2Selected: false }, { where: { tournamentId, stage1Name }, transaction });
			if (stage1Rows.length > 0) {
				await Pair.update(
					{ stage2Selected: true },
					{ where: { tournamentId, stage1Name, id: stage1Rows.map((e) => e.pair.id!) }, transaction }
				);
			}
			await transaction.commit();
		} catch (err) {
			logger.error('PUT pair/selected error : ', err);
			await transaction.rollback();
			return serverError('PUT pair/selected error : ', err, res);
		}
		// FIXME:
		return success<SelectPairsResponse>(
			res,
			{ label: stage1Rows.length > 1 ? 'pair:selected_2' : 'pair:selected_1' },
			{ stage1Rows, stage1Name }
		);
	})
);

// POST
router.post(
	'/new',
	withAuth,
	withAdminRights,
	asyncMiddleware(async (req: Request, res: Response) => {
		const dto = parseBodyToPair(req.body.pair);
		try {
			let pair: Pair | null = null;
			if (dto.id) pair = await Pair.findOne({ where: { id: dto.id } });
			// creazione coppia
			if (pair) {
				await pair.update(dto);
				logger.info(`updated => ${pair.toString()}`);
			} else {
				pair = await Pair.create(dto);
				logger.info(`created => ${pair.toString()}`);
			}
			return success<SavePairResponse>(res, { label: 'pair:saved' }, { pair: rowToModel(pair, pair.id) });
		} catch (err) {
			return serverError('POST pair/ error : ', err, res);
		}
	})
);

// DELETE
router.delete(
	'/delete',
	withAuth,
	withAdminRights,
	asyncMiddleware(async (req: Request, res: Response) => {
		try {
			const request: DeletePairsRequest = req.body;
			if (request.pairsList.length === 0) {
				return missingParameters(res);
			}
			await Pair.destroy({ where: { id: request.pairsList.map((e) => e.id!) } });
			return success(
				res,
				{ label: request.pairsList.length > 1 ? 'pair:deleted_2' : 'pair:deleted_1' },
				{
					pairsList: request.pairsList,
				}
			);
		} catch (err) {
			return serverError('DELETE pair/delete error : ', err, res);
		}
	})
);

export default router;
