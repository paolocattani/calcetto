import '../core/env';
import { logger } from '../core/logger';
import { isDevMode } from '../core/debug';

import { Router } from 'express';
import User from '../model/sequelize/user.model';
import { generatePassword, comparePasswords, generateToken } from '../core/utils';

const router = Router();

router.use('/', (req, res, next) => {
  if (isDevMode()) logger.info(`Auth Manager : ${req.method} ${req.originalUrl.replace('/api/v1/auth', '')} `);
  next();
});

router.post('/register', async (req, res, next) => {
  const model: User = req.body;
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
    logger.info('error :', error);
    return res.status(500).json(error);
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

    return res.cookie('token', generateToken(email), { httpOnly: true }).sendStatus(200);
  } catch (error) {
    res.status(500).json({
      error: 'Internal error please try again'
    });
  }
});

export default router;
