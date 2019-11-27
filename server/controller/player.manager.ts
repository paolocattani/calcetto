import { Router } from 'express';
import util from 'util'
import Player from '../model/sequelize/player.model';
import { logger } from 'core/logger';

export const playerManager = () => Router()

    .get('/player', async (_req, res, next) => {
        try {
            const users = await Player.findAll({ include: [Player] });
            return res.json(users);
        }
        catch (err) {
            return next(err);
        }
    }
    )

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

    ;