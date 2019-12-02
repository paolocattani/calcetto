import { Router } from 'express'
import util from 'util'
import { logger } from '../core/logger';
import Player from '../model/sequelize/player.model';

module.exports = Router({ mergeParams: true })

    .post('/player', async (req, res, next) => {
        logger.info(`player controller : req.body => ${util.inspect(req.body)}`);
        try {
            const player = await Player.create(req.body);
            logger.info(`player controller : created Player => ${util.inspect(player)}`);
            return res.json(player);
        }
        catch (err) {
            return next(err);
        }
    })
