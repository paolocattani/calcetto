import { Application as ExpressApplication } from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { isProductionMode } from '@common/utils/env.utils';
import schema from '../database/config/graphql/schema';
import mongoose from 'mongoose';

export const createApolloServer = async (application: ExpressApplication, corsOptions: cors.CorsOptions) => {
	const server = new ApolloServer({
		schema,
		playground: !isProductionMode(),
		introspection: true,
		tracing: true,
	});
	await server.start();
	server.applyMiddleware({
		app: application,
		path: '/graphql',
		cors: {
			// FIXME:
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			origin: <any>corsOptions.origin,
			...corsOptions,
		},
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
};
