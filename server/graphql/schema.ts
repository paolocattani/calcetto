import { logger } from '@core/logger';
import chalk from 'chalk';
import { Request } from 'express';
import fs from 'fs-extra';
import { getIntrospectionQuery, graphql, GraphQLSchema, printSchema } from 'graphql';
import { SchemaComposer } from 'graphql-compose';
import path from 'path';
import { TaskMutation, TaskQuery } from './task';
// https://medium.com/@istvanistvan/modern-api-design-with-apollo-graphql-compose-and-mongoose-f67c0df060ea
// https://getstream.io/blog/tutorial-create-a-graphql-api-with-node-mongoose-and-express/
import { UserMutation, UserQuery } from './user';

let schema: GraphQLSchema;


interface TContext {
	req: Request;
}

export const getschema = () => {
	if (schema == null) {
		const schemaComposer = new SchemaComposer<TContext>();
		schemaComposer.Query.addFields({ ...UserQuery, ...TaskQuery });
		schemaComposer.Mutation.addFields({ ...UserMutation, ...TaskMutation });

		schema = schemaComposer.buildSchema();
		logger.info('Schema created...');
	}
	return schema;
};

export async function buildSchema() {
	try {
		fs.createFileSync('./graphql/data/schema.graphql.txt');
		fs.createFileSync('./graphql/data/schema.graphql.json');
		fs.createFileSync('./graphql/data/schema.graphql');
		if (schema == null) {
			logger.info('Bulding schema from models...');
			schema = getschema();
		}
		const graph = await graphql(schema, getIntrospectionQuery());
		logger.info('Printing schema...');
		fs.writeFileSync(path.join(__dirname, './data/schema.graphql.json'), JSON.stringify(graph, null, 2));
		fs.writeFileSync(path.join(__dirname, './data/schema.graphql.txt'), printSchema(schema));
		fs.writeFileSync(path.join(__dirname, './data/schema.graphql'), printSchema(schema));
		logger.info(chalk.cyan.bold('GraphQL schema creation complete !'));
	} catch (error) {
		logger.error('Cannot create graphql schema....', error);
	}
}
