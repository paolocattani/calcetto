import { Router, Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
// Model
import Stage1Model from '../models/sequelize/stage1.model';
// Core
import { asyncForEach } from '../core/utils';
import { logger } from '../core/logger';
import { isDevMode } from '../core/debug';
import { asyncMiddleware, withAuth } from '../core/middleware';
import { dbConnection } from '../models/server/AppServer';
import { isAdmin } from '../manager/auth.manager';

const router = Router();
router.use('/', (req, res, next) => {
  if (isDevMode()) logger.info(`Stage1 Manager : ${req.method} ${req.originalUrl.replace('/api/v1/stage1', '')} `);
  next();
});

/**
 * Cancellazione record
 */
router.delete(
  '/',
  withAuth,
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const { tId } = req.body;
    await Stage1Model.destroy({ where: { tournamentId: tId } });
    return res.status(200).json({ saved: true });
  })
);

/**
 * Aggiornamento record specifico
 */
router.post(
  '/cell',
  withAuth,
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const { tId, tableName, pair1Id, pair2Id, score } = req.body;
    logger.info('/cell1', score, tableName, tId, pair1Id, pair2Id);
    try {
      const record = await Stage1Model.findOne({
        where: {
          [Op.or]: [
            { [Op.and]: { pair1Id: pair1Id, pair2Id: pair2Id } },
            { [Op.and]: { pair1Id: pair2Id, pair2Id: pair1Id } },
          ],
          name: tableName,
          tournamentId: tId,
        },
      });
      if (!record) return res.status(500).json('Error');
      // logger.info(record);
      if (record.pair1Id === (pair1Id as number)) {
        logger.info('update', score);
        await record.update({ score: score || null });
      } else {
        logger.info('update opposite', getOpposite(parseInt(score)));
        await record.update({ score: getOpposite(parseInt(score)) });
      }
      return res.status(200).json({ saved: true });
    } catch (error) {
      logger.error('/cell error', error);
      return res.status(500).json({ error, saved: false });
    }
  })
);

/**
 *
 * Reperimento e aggiornamento tabella Stage1.
 * Riceva da FE : rows e stageName
 *  @param stageName : nome della tabella ( girone )
 *  @param rows : righe del girone
 *
 */
router.post(
  '/',
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const { rows, stageName } = req.body;
    const t = await dbConnection.transaction();
    try {
      await asyncForEach(rows, async (currentRow: any, index: number, rowsRef: any) => {
        rowsRef[index]['total'] = 0;
        for (let currentRowKey in currentRow) {
          if (currentRowKey.startsWith('col')) {
            // Numero riga/colonna corrente
            let currentRowRef = rowsRef[index]; // Riga attuale da a rowRef
            const rowIndex = parseInt(currentRowRef.rowNumber);
            const colIndex = parseInt(currentRowKey.substring(3));
            // Valore attuale della cella e della sua opposta
            let oppositeRow = rowsRef[colIndex - 1];
            // totale / posizionamento
            let currentRowTotal: number = rowsRef[index]['total'];
            let currentRowPlacement: number = rowsRef[index]['place'];
            // Coppie e punteggi
            const pair1 = currentRowRef.pair;
            const pair2 = oppositeRow.pair;
            const { tId: tournamentId } = pair1;
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
                const isEditable = isAdmin(req.cookies.token);
                const whereCondition = {
                  // where ( p1Id = .. and p2Id = .. ) or ( p2Id = .. and p1Id = .. )
                  [Op.or]: [
                    { [Op.and]: { pair1Id: pair1.id, pair2Id: pair2.id } },
                    { [Op.and]: { pair1Id: pair2.id, pair2Id: pair1.id } },
                  ],
                  name: stageName,
                  tournamentId,
                };
                let record = null;
                let created = false;
                isEditable
                  ? ([record, created] = await Stage1Model.findOrCreate({
                      where: whereCondition,
                      defaults: model,
                      transaction: t,
                    }))
                  : (record = await Stage1Model.findOne({ where: whereCondition, transaction: t }));

                // if (stageName === '1') logger.info('model : ', created, record);

                // Se non sono in inserimento aggiorno il modello per FE con i dati del Db
                if (!created && record) {
                  if (record.pair1Id === (pair1.id as number)) {
                    currentRowRef[currentRowKey] = record.score;
                    oppositeRow[`col${rowIndex}`] = getOpposite(record.score);
                    currentRowRef['total'] = currentRowTotal ? currentRowTotal + record.score : record.score;
                    currentRowPlacement = 0;
                  } else {
                    currentRowRef[currentRowKey] = getOpposite(record.score);
                    oppositeRow[`col${rowIndex}`] = record.score;
                    if (record.score !== undefined) {
                      currentRowRef['total'] = currentRowTotal
                        ? currentRowTotal + getOpposite(record.score)!
                        : getOpposite(record.score);
                      currentRowPlacement = 0;
                    }
                  }
                }
              } catch (error) {
                logger.error('Error on  : ', currentRowRef, currentRowKey, error);
              }
            }
          }
        }
      });
      t.commit();
      return res.status(200).json(rows);
    } catch (error) {
      t.rollback();
      logger.error('Error while update matrix  : ', error);
      return res.status(500).json({ error });
    }
  })
);

export default router;

/**
 *
 * @param value il valore di partenza
 * @returns il valore opposto a quello di partenze
 *
 *  3->0 , 2->1 , 1->2 , 0->3
 */
function getOpposite(value: number | null): number | null {
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
