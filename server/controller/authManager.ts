
import express, { Request, Response, NextFunction, Router } from 'express';
const router = express.Router();
const passport = require("passport");
const url = require("url");
const querystring = require("querystring");
import { logger } from '../core/logger';
import * as util from 'util';
require("dotenv").config();


// LOGIN FUNCTION
router.get("/login",
    passport.authenticate("auth0", { scope: "openid email profile" }),
    (req, res) => res.redirect("/")
);

// CALLBACK FUNCTION
router.get("/callback", (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("auth0", (err: any, user: Express.User, info: any) => {
        logger.info(`authManager.CALLBACK : user => ${util.inspect(user)}`);
        if (err) return next(err);
        if (!user) return res.redirect("/login");
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            const returnTo = req.session!.returnTo;
            delete req.session!.returnTo;
            res.redirect(returnTo || "/");
        });
    })(req, res, next);
});

// LOGOUT FUNCTION
router.get("/logout", (req, res) => {
    req.logOut();

    let returnTo = req.protocol + "://" + req.hostname;
    const port = req.connection.localPort;

    if (port !== undefined && port !== 80 && port !== 443) {
        returnTo =
            process.env.NODE_ENV === "production"
                ? `${returnTo}/`
                : `${returnTo}:${port}/`;
    }

    const logoutURL = new URL(util.format("https://%s/logout", process.env.AUTH0_DOMAIN));
    const searchString = querystring.stringify({ client_id: process.env.AUTH0_CLIENT_ID, returnTo: returnTo });
    logoutURL.search = searchString;

    res.redirect(logoutURL.href);
});

export default router;