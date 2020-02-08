import { Router, Application as ExpressApplication } from 'express';
import { Op } from 'sequelize';
// Model
import Stage1Model from '../model/sequelize/s1Matrix.model';
// Core
import { asyncForEach } from '../core/utils';
import { logger } from '../core/logger';
import { isDevMode } from '../core/debug';

const router = Router();
router.use('/', (req, res, next) => {
  if (isDevMode()) logger.info(`Stage 1 Manager : ${req.method} ${req.originalUrl.replace('/api/stage1', '')} `);
  next();
});

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
router.post('/', async (req, res, next) => {
  const { rows, stageName } = req.body;
  // logger.info('Model : ', rows);
  try {
    await asyncForEach(rows, async (e: any, i: number) => {
      if (i !== 0) return null;
      for (let key in e) {
        if (key.startsWith('col')) {
          const rowIndex = parseInt(e.rowNumber);
          const colIndex = parseInt(key.substring(3));
          // console.log(` (row,col) = (${rowIndex} , ${colIndex}) `);
          if (rowIndex !== colIndex) {
            try {
              const p1 = e.pair;
              const p2 = rows[colIndex - 1].pair;
              /**
               * Se non mi è stato passato un valore dal FE non o assegno al modello perchè
               * potrei gia aver un valore assegnato sul db.
               */
              const score = e[key] ? e[key] : undefined;
              const opposisteScore = rows[colIndex - 1][`col${rowIndex}`]
                ? rows[colIndex - 1][`col${rowIndex}`]
                : undefined;
              // console.log(`     ( p1,p2,score ) = ( ${p1},${p2}, ${score} )`);
              const model = {
                name: stageName,
                tournamentId: p1.tId,
                pair1Id: p1.id,
                pair2Id: p2.id,
                score
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
                    { [Op.and]: { pair1Id: p1.id, pair2Id: p2.id } },
                    { [Op.and]: { pair1Id: p2.id, pair2Id: p1.id } }
                  ]
                },
                defaults: model
              });
              // logger.info('model : ', created, record);
              if (!created) {
                // Se non è stato creato aggiorno il modello per FE con i dati del Db
                e[key] = record.pair1Id === p1.id ? model.score : getOpposite(model.score);
                rows[colIndex - 1][`col${rowIndex}`] =
                  record.pair1Id === p1.id ? getOpposite(model.score) : model.score;
              }
            } catch (error) {
              logger.error('Error on  : ', e, key);
            }
          }
        }
      }
    });
    return res.status(200).json(rows);
  } catch (error) {
    logger.error('Error while update matrix  : ', error);
    return res.status(500).json(rows);
  }
});

export default router;

/**
 *
 * @param value il valore di partenza
 * @returns il valore opposto a quello di partenze
 *
 *  3->0 , 2->1 , 1->2 , 0->3
 */
function getOpposite(value: number | null): number | null {
  if (!value) return null;
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
