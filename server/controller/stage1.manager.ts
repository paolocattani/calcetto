import { Router, Application as ExpressApplication, NextFunction } from 'express';
import { Op } from 'sequelize';
// Model
import Stage1Model from '../model/sequelize/s1Matrix.model';
// Core
import { asyncForEach } from '../core/utils';
import { logger } from '../core/logger';
import { isDevMode } from '../core/debug';
import { asyncMiddleware } from '../core/middleware';
const router = Router();
router.use('/', (req, res, next) => {
  if (isDevMode()) logger.info(`Stage 1 Manager : ${req.method} ${req.originalUrl.replace('/api/stage1', '')} `);
  next();
});

/**
 * Aggiornamento record specifico
 */
router.delete(
  '/',
  asyncMiddleware(async (req: Request, res: any, next: NextFunction) => {
    const { tId } = req.body as any;
    await Stage1Model.destroy({ where: { tournamentId: tId } });
    return res.status(200).json({ saved: true });
  })
);

// TODO: aggiungere definizione dati passati su body

/**
 * Aggiornamento record specifico
 */
router.post(
  '/cell',
  asyncMiddleware(async (req: Request, res: any, next: NextFunction) => {
    const { tId, tableName, pair1Id, pair2Id, score } = req.body as any;
    // logger.info('/cell1', req.body.tableName, req.body.tId, req.body.pair1Id, req.body.pair2Id);
    try {
      const record = await Stage1Model.findOne({
        where: {
          [Op.or]: [
            { [Op.and]: { pair1Id: pair1Id, pair2Id: pair2Id } },
            { [Op.and]: { pair1Id: pair2Id, pair2Id: pair1Id } }
          ],
          name: tableName,
          tournamentId: tId
        }
      });
      if (!record) return res.status(500).json('Error');
      // logger.info(record);
      if (record.pair1Id === (pair1Id as number)) {
        logger.info(score);
        await record.update({ score });
      } else {
        await record.update({ score: getOpposite(score) });
      }
      return res.status(200).json({ saved: true });
    } catch (error) {
      logger.error('/cell error', error);
      return res.status(500).json({ error, saved: false });
    }
  })
);

/**
 * Reperimento e aggiornamento tabella Stage1.
 * Riceva da FE : rows e stageName
 *  @param stageName : nome della tabella ( girone )
 *  @param rows : righe del girone nella forma di ( vedi 'dummy_data/tableRows' per l'esempio completo )
 * [
 *  {
 *    "pair": {
 *      "id": 3, "rowNumber": 3, "tId": 1,
 *      "player1": { "id": 5, "alias": "Alias5", "name": "Nome5", "surname": "Cognome5" },
 *      "player2": { "id": 2, "alias": "Alias2", "name": "Nome2", "surname": "Cognome2"},
 *      "pairAlias": "",
 *      "stage1Name": "1",
 *      "label": "Alias5 - Alias2"
 *    }, "rowNumber": 1,
 *    "col1": null, "col2": null, "col3": null, .... "col-ennesima": null
 *    "total": 0, "place": 0
 *  },
 *  { ... },{ ... },{ ... }, ... ,
 *  {
 *    "pair": {
 *      "id": 3, "rowNumber": 3, "tId": 1,
 *      "player1": { "id": 5, "alias": "Alias5", "name": "Nome5", "surname": "Cognome5" },
 *      "player2": { "id": 2, "alias": "Alias2", "name": "Nome2", "surname": "Cognome2"},
 *      "pairAlias": "",
 *      "stage1Name": "1",
 *      "label": "Alias5 - Alias2"
 *    }, "rowNumber": 1,
 *    "col1": null, "col2": null, "col3": null, .... "col-ennesima": null
 *    "total": 0, "place": 0
 *  }
 * ]
 */
router.post(
  '/',
  asyncMiddleware(async (req: Request, res: any, next: NextFunction) => {
    // FIXME: type def
    const { rows, stageName } = req.body as any;
    // logger.info('Model : ', rows);
    try {
      await asyncForEach(rows, async (currentRow: any, index: number, rowsRef: any) => {
        for (let currentRowKey in currentRow) {
          if (currentRowKey.startsWith('col')) {
            // Numero riga/colonna corrente
            let currentRowRef = rowsRef[index]; // Riga attuale da a rowRef
            const rowIndex = parseInt(currentRowRef.rowNumber);
            const colIndex = parseInt(currentRowKey.substring(3));
            // Valore attuale della cella e della sua opposta
            let currentCellValue = rowsRef[index][currentRowKey];
            let oppositeRow = rowsRef[colIndex - 1];
            let oppositeCellValue = oppositeRow[`col${rowIndex}`];
            // totale / posizionamento
            let currentRowTotal = rowsRef[index]['total'];
            let currentRowPlacement = rowsRef[index]['place'];
            // Coppie e punteggi
            const pair1 = currentRowRef.pair;
            const pair2 = oppositeRow.pair;
            const currentScore = currentCellValue ? currentCellValue : undefined;
            const opposisteScore = oppositeCellValue ? oppositeCellValue : undefined;
            const tournamentId = pair1.tId;
            if (rowIndex !== colIndex) {
              try {
                /**
                 * Se non mi è stato passato un valore dal FE non lo assegno al modello perchè
                 * potrei gia aver un valore assegnato sul db.
                 */

                // console.log(`     ( p1,p2,score ) = ( ${p1},${p2}, ${score} )`);
                const model = {
                  name: stageName,
                  tournamentId,
                  pair1Id: pair1.id,
                  pair2Id: pair2.id,
                  // score: currentScore,
                  placement: null
                };
                /**
                 * Salvo solo una parte della matrice in quanto l'altra posso calcolarla
                 * Quindi dal record sotto posso ricavare il risultato di :
                 *
                 *    28 vs 17 = 3
                 *    17 vs 28 = 0
                 *
                 * |  ID  | tId | p1Id | p2Id | score |
                 * ------------------------------------
                 * |  1   |  1  |  28  |   17 |   3   |
                 *
                 *
                 */
                // logger.info('model1 : ', model);
                // Salvo solo uno scontro e l'altro lo calcolo.
                const [record, created] = await Stage1Model.findOrCreate({
                  where: {
                    // where ( p1Id = .. and p2Id = .. ) or ( p2Id = .. and p1Id = .. )
                    [Op.or]: [
                      { [Op.and]: { pair1Id: pair1.id, pair2Id: pair2.id } },
                      { [Op.and]: { pair1Id: pair2.id, pair2Id: pair1.id } }
                    ],
                    name: stageName,
                    tournamentId
                  },
                  defaults: model
                });
                // if (stageName === '1') logger.info('model : ', created, record);

                // Se è stato creato non server che aggiorno l'oggetto row, altrimenti aggiorno il modello per FE con i dati del Db
                if (!created) {
                  if (record.pair1Id === (pair1.id as number)) {
                    currentRowRef[currentRowKey] = record.score;
                    oppositeRow[`col${rowIndex}`] = getOpposite(record.score);
                    currentRowRef['total'] = currentRowTotal ? parseInt(currentRowTotal) + record.score : record.score;
                    currentRowPlacement = 0;
                  } else {
                    currentRowRef[currentRowKey] = getOpposite(record.score);
                    oppositeRow[`col${rowIndex}`] = record.score;
                    if (record.score !== undefined) {
                      currentRowRef['total'] = currentRowTotal
                        ? parseInt(currentRowTotal) + getOpposite(record.score)!
                        : getOpposite(record.score);
                      currentRowPlacement = 0;
                    }
                  }
                  //if (stageName === '1') logger.info('Sbam1....', currentCellValue, oppositeCellValue, currentRow);
                }
                if (stageName === '1' && ((pair1.id === 10 && pair2.id === 18) || (pair1.id === 28 && pair2.id === 10)))
                  logger.info('updating : ', model);
              } catch (error) {
                logger.error('Error on  : ', currentRowRef, currentRowKey);
              }
            }
          }
        }
      });
      //if (stageName === '1') logger.info('Sbam2....', rows);
      return res.status(200).json(rows);
    } catch (error) {
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
  //logger.info('getOpposite of  ', value);
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
