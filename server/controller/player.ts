import {Router} from 'express';

import Player from '../model/sequelize/player.model';

export const playerManager = () => Router()

    .get('/users', (req, res, next) =>
    Player.findAll({include: [Player]})
    .then(users => res.json(users))
    .catch(next)
    )


    
;