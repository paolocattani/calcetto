import { Application as ExpressApplication } from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginInlineTrace } from 'apollo-server-core';
import { isProductionMode } from '@common/utils/env.utils';
import { getschema } from '../graphql/schema';
import mongoose from 'mongoose';
import chalk from 'chalk';
import { logger } from '@core/logger';
import expressPlayground from 'graphql-playground-middleware-express';

export const GRAPHQL_ENDPOINT = '/graphql';
export const PLAYGROUND_ENDPOINT = '/playground';
export const createApolloServer = async (application: ExpressApplication, corsOptions: cors.CorsOptions) => {
	try {
		logger.info(chalk.greenBright('Starting Apollo server...'));
		const server = new ApolloServer({
			schema: getschema(),
			debug: true,
			playground: !isProductionMode(),
			introspection: true,
			tracing: true,
			logger,
			plugins: [ApolloServerPluginInlineTrace()],
		});
		await server.start();
		logger.info(chalk.greenBright('Apollo server is alive!'));
		server.applyMiddleware({
			app: application,
			path: GRAPHQL_ENDPOINT,
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

		// Expose IDE for GraphQL playground
		application.get(PLAYGROUND_ENDPOINT, expressPlayground({ endpoint: GRAPHQL_ENDPOINT }));
	} catch (error) {
		logger.info(chalk.redBright('Something went wrong while starting Apollo server...'));
	}
};
