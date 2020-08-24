import { Response } from 'express';

export const missingParamsResponse = (res: Response) =>
  res.status(400).json({ code: 400, message: 'Missing parameters' });
