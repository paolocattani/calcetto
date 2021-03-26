import { SchemaComposer } from 'graphql-compose';

const schemaComposer = new SchemaComposer();

import { UserQuery, UserMutation } from './user';
import { TaskQuery, TaskMutation } from './task';

schemaComposer.Query.addFields({
	...UserQuery,
	...TaskQuery,
});

schemaComposer.Mutation.addFields({
	...UserMutation,
	...TaskMutation,
});

export default schemaComposer.buildSchema();
