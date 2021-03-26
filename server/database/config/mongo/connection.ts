import { logger } from '@core/logger';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

// https://getstream.io/blog/tutorial-create-a-graphql-api-with-node-mongoose-and-express/
const connection = mongoose.connect(<string>process.env.MONGODB_URI, {
	autoIndex: true,
	reconnectTries: Number.MAX_VALUE,
	reconnectInterval: 500,
	poolSize: 50,
	bufferMaxEntries: 0,
	keepAlive: true,
	useNewUrlParser: true,
});

mongoose.set('useCreateIndex', true);

connection
	.then((db) => db)
	.catch((err) => {
		logger.log(err);
	});

export default connection;
