import { justADate } from '@common/utils/date.utils';
import { WhereOptions, Sequelize, Op, Model } from 'sequelize';
//----------------------------
// PM2
export const PM2InstanceId = process.env.PM2_INSTANCE_ID || 'NOT_AVAILABLE';

//-----------------------------
// Env
//
export const isTsEnv = () => {
	let detectTSNode = false;
	try {
		if (process[(Symbol.for('ts-node.register.instance') as unknown) as keyof NodeJS.Process]) {
			detectTSNode = true;
		}
	} finally {
		module.exports = detectTSNode;
	}
	return detectTSNode;
};

export const fileExtension = () => (isTsEnv() ? 'ts' : 'js');

//-----------------------------
// Async utils
//
export async function asyncForEach<T>(
	array: Array<T>,
	callback: (element: T, index: number, array: Array<T>) => Promise<void>
): Promise<void> {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

//-----------------------------
// Sequelize utils
//
export const logEntity = <T extends Model>(entity: T) => JSON.stringify(entity, null, 2);

export const isNotNull = () => ({
	[Op.not]: '',
	[Op.ne]: null,
});

export const getWhereFromMap = (parameters: Map<string, WhereOptions | Record<string, unknown>>): WhereOptions =>
	[...parameters.entries()].reduce<WhereOptions>(
		(acc, [key, value]) => (key === 'fn' ? { ...acc, value } : { ...acc, ...{ [key]: value } }),
		{}
	);

export const castWrapper = (isColumn: boolean, value: string, dataType: string) =>
	Sequelize.cast(isColumn ? Sequelize.col(value) : value, dataType);

export const lowerWrapper = (colName: string, value: string): WhereOptions =>
	Sequelize.where(Sequelize.fn('lower', Sequelize.col(colName)), value.toLowerCase());

export const dateInRageWrapper = (colName: string, startDate: string | Date, endDate: string | Date): WhereOptions => ({
	[Op.and]: [
		Sequelize.where(
			castWrapper(true, colName, 'DATE'),
			'>=',
			castWrapper(false, justADate(startDate).toISOString(), 'DATE')
		),
		Sequelize.where(
			castWrapper(true, colName, 'DATE'),
			'<',
			castWrapper(false, justADate(endDate).addDays(1).toISOString(), 'DATE')
		),
	],
});
