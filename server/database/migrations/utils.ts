import { Sequelize } from 'sequelize';

// Views
export async function viewUp(context: Sequelize, viewName: string, viewBody: string) {
	// https://stackoverflow.com/questions/48407329/cant-able-to-create-views-in-mysql-using-sequelize-orm
	await context.query('CREATE OR REPLACE VIEW :viewName AS :viewBody', { replacements: { viewName, viewBody } });
}

export async function viewDown(context: Sequelize, viewName: string) {
	await context.query('DROP VIEW :viewName', { replacements: { viewName } });
}

// Functions
export async function functionUp(
	context: Sequelize,
	functionName: string,
	params: string,
	returnType: string,
	functionBody: string
) {
	// FIXME: 	await context.getQueryInterface().createFunction(functionName, params, returnType, 'sql', functionBody,[);
	await context.query(
		'CREATE OR REPLACE FUNCTION :functionName(:params) returns :returnType AS $func$ :functionBody $func$ LANGUAGE sql',
		{ replacements: { functionName, params, returnType, functionBody } }
	);
}
export async function functionDown(context: Sequelize, functionName: string) {
	await context.query('DROP FUNCTION :functionName', { replacements: { functionName } });
}
