import cluster from 'cluster';
import { logger } from '../../core/logger';
import { isDevMode, isProductionMode } from '../../core/debug'
import helmet from 'helmet';
import compression from 'compression';
import chalk from 'chalk'
import { json, urlencoded } from 'body-parser';
import { cpus as osCpus } from 'os';

require('dotenv').config();

// Auth
import cors from 'cors';
import jwt from 'express-jwt';
require('express-jwt-authz');
import jwksRsa from 'jwks-rsa';
import expressSession from "express-session";
import passport from "passport";
import * as AuthManager from '../../controller/authManager';
const Auth0Strategy = require('passport-auth0');

import express, { Application as ExpressApplication, Request, Response, NextFunction } from 'express';

/* Interface */
export interface IServer {
    serverName: string;
    serverPort: number;
    maxCPUs?: number;
}

/* Constants */
export const checkJwt = jwt({
    // Dynamically provide a signing key based on the [Key ID](https://tools.ietf.org/html/rfc7515#section-4.1.4) header parameter ("kid") and the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
});

const session: expressSession.SessionOptions = {
    secret: "LoxodontaElephasMammuthusPalaeoloxodonPrimelephas",
    cookie: {},
    resave: false,
    saveUninitialized: false
};

//export const checkScopes = jwtAuthz(['read:messages']);
/* Class */
export abstract class AbstractServer implements IServer {

    serverName: string;
    serverPort: number;
    maxCPUs?: number;
    application: ExpressApplication;
    corsOptions: cors.CorsOptions;

    constructor(name: string, port: number, maxCPUs?: number, corsOptions?: cors.CorsOptions) {
        this.serverName = name;
        this.serverPort = port;
        this.maxCPUs = maxCPUs ? maxCPUs : Number.parseInt('2');
        this.application = express();
        this.corsOptions = corsOptions ? corsOptions : { origin: 'http://localhost:8080' };
    }

    public start(): void {
        if (cluster.isMaster) {
            if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
                throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
            }
            logger.info(`Starting cluster master for server ${chalk.yellow(this.serverName)}`);
            logger.info(`${osCpus().length} current available CPUs but using ${this.maxCPUs}`);
            /* TODO : fix fork numbers */
            for (let i = 0; i < this.maxCPUs! - 1; i++) {
                cluster.fork();
            }
            cluster.on('exit', (worker, code, signal) => {
                logger.error(`Node cluster worker ${chalk.blue(process.pid.toString())} for server
                                ${chalk.yellow(this.serverName)} exited: code ${chalk.red(code.toString())}, signal ${chalk.red(signal)}`);
            });
        } else {
            //this.application.get('env') !== 'production';
            this.application.disable('x-powered-by');
            this.application.use(compression());
            this.application.use(helmet({ dnsPrefetchControl: { allow: true } }));
            //this.application.set('trust proxy', 1);
            this.application.use(json());
            this.application.use(urlencoded({ extended: false }));
        }

        const strategy = new Auth0Strategy({
            domain: process.env.AUTH0_DOMAIN,
            clientID: process.env.AUTH0_CLIENT_ID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET,
            callbackURL:
                process.env.AUTH0_CALLBACK_URL || `${this.corsOptions.origin}/callback`
        },
            function (accessToken: any, refreshToken: any, extraParams: any, profile: any, done: any) {
                /**
                 * Access tokens are used to authorize users to an API
                 * (resource server)
                 * accessToken is the token to call the Auth0 API
                 * or a secured third-party API
                 * extraParams.id_token has the JSON Web Token
                 * profile has all the information from the user
                 */
                return done(null, profile);
            }
        );

        const secured = (req: Request, res: Response, next: NextFunction) => {
            if (req.user)
                return next();
            req.session!.returnTo = req.originalUrl;
            res.redirect("/login");
        };

        if (this.application.get("env") === "production") {
            // Serve secure cookies, requires HTTPS
            session.cookie!.secure = true;
        }

        this.application.use(expressSession(session));
        this.application.use(cors(this.corsOptions));
        passport.use(strategy);
        this.application.use(passport.initialize());
        this.application.use(passport.session());

        passport.serializeUser((user, done) => done(null, user));
        passport.deserializeUser((user, done) => done(null, user));
        this.application.use((req, res, next) => {
            res.locals.isAuthenticated = req.isAuthenticated();
            next();
        });
        this.application.use('/', AuthManager.default);
        this.routes(this.application);

        this.application.listen(this.serverPort, () => {
            logger.info(`Node cluster worker ${chalk.blue(process.pid.toString())} for server ${chalk.yellow(this.serverName)} : listening on port ${chalk.green(this.serverPort.toString())}`);
        });

    }

    public abstract routes(application: ExpressApplication): void;

}



