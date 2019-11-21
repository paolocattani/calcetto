import { logger } from '../core/logger'
import { isDevMode } from '../core/debug';

import { Request, Response, NextFunction } from 'express';

// Auth middleware
export const secured = (req: Request, res: Response, next: NextFunction) => {
    if (req.user)
        return next();
    req.session!.returnTo = req.originalUrl;
    res.redirect("/login");
};

// dev logger
export const routeLogger = (req: Request, res: Response, next: NextFunction) => {
    if (isDevMode())
        logger.info(`Serving route : ${req.originalUrl}`);
};
