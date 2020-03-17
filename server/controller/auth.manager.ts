import '../core/env';
import { logger } from '../core/logger';
import { isDevMode } from '../core/debug';

import { Router } from 'express';
import User from '../model/sequelize/user.model';
import { generatePassword, comparePasswords, generateToken } from '../core/utils';
import { withAuth } from '../core/middleware';

const router = Router();

router.use('/', (req, res, next) => {
  if (isDevMode()) logger.info(`Auth Manager : ${req.method} ${req.originalUrl.replace('/api/v1/auth', '')} `);
  next();
});
// FTODO: add asyncMiddleware
router.post('/register', async (req, res, next) => {
  const password = await generatePassword(req.body.email, req.body.password);
  const model = {
    name: req.body.name,
    surname: req.body.surname,
    password,
    email: req.body.email,
    phone: req.body.phone
  };
  logger.info('model :', model);
  try {
    const password = await generatePassword(model.name, model.password);
    const [record, created] = await User.findOrCreate({
      where: {
        email: model.email,
        password
      },
      defaults: model
    });
    logger.info('record :', record);
    return res.status(200).json(record);
  } catch (error) {
    logger.error('/register error : ', error);
    return res.status(500).json({ error: 'Internal error please try again' });
  }
});

router.post('/authenticate', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    // utente non trovato
    if (!user) return res.status(401).json({ error: 'Incorrect email or password' });

    if (!comparePasswords(email, password, user.password))
      return res.status(401).json({ error: 'Incorrect email or password' });

    res.cookie('token', generateToken(email), { httpOnly: true });
    return res.status(200).json(user);
  } catch (error) {
    logger.error('/authenticate error : ', error);
    return res.status(500).json({ error: 'Internal error please try again' });
  }
});

router.get('/checkToken', withAuth, (req, res) => res.sendStatus(200));

export default router;
