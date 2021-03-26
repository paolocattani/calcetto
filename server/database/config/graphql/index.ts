import fs from 'fs-extra';
import path from 'path';
import { graphql } from 'graphql';
import { getIntrospectionQuery, printSchema } from 'graphql/utilities';

import Schema from './schema';
import { logger } from '@core/logger';

async function buildSchema() {
	await fs.ensureFile('./data/schema.graphql.json');
	await fs.ensureFile('./data/schema.graphql');

	fs.writeFileSync(
		path.join(__dirname, '../data/schema.graphql.json'),
		JSON.stringify(await graphql(Schema, getIntrospectionQuery()), null, 2)
	);

	fs.writeFileSync(path.join(__dirname, '../data/schema.graphql.txt'), printSchema(Schema));
}

async function run() {
	await buildSchema();
	logger.log('Schema build complete!');
}

run().catch((e) => {
	logger.log(e);
	process.exit(0);
});
