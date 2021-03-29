import { Application as ExpressApplication } from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { isProductionMode } from '@common/utils/env.utils';
// import { getschema } from '../graphql/schema';
import mongoose from 'mongoose';
import chalk from 'chalk';
import { logger } from '@core/logger';
import { buildSchema } from 'graphql';

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
	hello: () => {
		return 'Hello world!';
	},
};

export const createApolloServer = async (application: ExpressApplication, corsOptions: cors.CorsOptions) => {
	try {
		logger.info(chalk.greenBright('Starting Apollo server...'));
		// const schema = getschema();
		const server = new ApolloServer({
			schema,
			debug: true,
			rootValue: root,
			playground: !isProductionMode(),
			introspection: true,
			tracing: true,
			logger,
		});
		await server.start();
		logger.info(chalk.greenBright('Apollo server is alive!'));
		server.applyMiddleware({
			app: application,
			path: '/graphql',
			cors: isProductionMode()
				? {
						// FIXME:
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						origin: <any>corsOptions.origin,
						...corsOptions,
				  }
				: false,
			bodyParserConfig: { strict: true },
			onHealthCheck: () =>
				new Promise((resolve, reject) => {
					if (mongoose.connection.readyState > 0) {
						resolve(true);
					} else {
						reject();
					}
				}),
		});
	} catch (error) {
		logger.info(chalk.redBright('Something went wrong while starting Apollo server...'));
	}
};
