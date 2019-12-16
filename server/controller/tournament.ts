import { Router, Application as ExpressApplication } from 'express';
import util from 'util'
import { logger } from '../core/logger';
import Tournament from '../model/sequelize/tournament.model';
import { AggregateOptions } from 'sequelize'

export const tournamentManager = (router: Router): Router => router

    .get('/api/tournament/list', async (req, res, next) => {
        logger.info(`tournament controller`);
        try {
            //const t: string[] = await Tournament.aggregate('name', 'DISTINCT', { plain: false });
            const t: Tournament[] = await Tournament.findAll({
                attributes: ["name"],
                group: ["name"]
            });
            logger.info(t);
            res.json(t)
        }
        catch (err) {
            return next(err);
        }
    }
    )

    .post('/api/tournament', async (req, res, next) => {
        logger.info(`tournament controller : req.body => ${util.inspect(req.body)}`);
        try {
            let t = await Tournament.findOne({ where: { name: req.body.name } });
            if (t) {
                logger.info(`tournament ${req.body.name} already exists!`);
                return res.json(t);
            }
            t = await Tournament.create(req.body);
            logger.info(`tournament controller : created Tournament => ${t.toString()}`);
            return res.json(t);
        }
        catch (err) {
            return next(err);
        }
    })

    ;