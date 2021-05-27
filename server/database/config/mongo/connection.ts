import { isProductionMode } from '@common/utils/env.utils';
import { logger } from '@core/logger';
import chalk from 'chalk';
import mongoose, { Mongoose } from 'mongoose';

mongoose.Promise = global.Promise;

// https://getstream.io/blog/tutorial-create-a-graphql-api-with-node-mongoose-and-express/
let connection: Mongoose;
export const getConnection = async () => {
	try {
		if (connection == null) {
			if (!isProductionMode()) {
				logger.info(`Moongoose URI : ${chalk.red.bold(process.env.MONGODB_URI)}`);
			}
			logger.info(chalk.cyan.bold('Moongoose is connecting....'));
			connection = await mongoose.connect(<string>process.env.MONGODB_URI, {
				autoIndex: true,
				poolSize: 50,
				bufferMaxEntries: 0,
				useCreateIndex: true,
				keepAlive: true,
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
			mongoose.set('debug', (collectionName: string, method: string, query: Record<string, unknown>, doc: unknown) => {
				logger.warn(`${collectionName}.${method}`, JSON.stringify(query), doc);
			});
			logger.info(chalk.cyan.bold('Moongoose connected!'));
		}
	} catch (error) {
		logger.error(error);
	}
	return connection;
};
