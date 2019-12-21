import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

export interface IAuthzOptions {
  failWithError: boolean;
  checkAllScopes: boolean;
  customScopeKey: string;
}

export default function(
  expectedScopes: string[],
  options?: IAuthzOptions
): (req: Request, res: Response, next: NextFunction) => void;
