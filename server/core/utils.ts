import { WhereOptions, Sequelize, Op, Model } from 'sequelize';
//-----------------------------
// Math
//
export const getRandomIntInclusive = (min: number, max: number): number =>
	Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);

export function getBaseLog(x: number, y: number) {
	return Math.log(y) / Math.log(x);
}
export const roundNumber = (num: number, decimal: number) =>
	Math.round((num + Number.EPSILON) * 10 ** decimal) / 10 ** decimal;

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
export const logEntity = <T extends Model<any, any>>(entity: T) => JSON.stringify(entity, null, 2);

export const isNotNull = () => ({
	[Op.not]: '',
	[Op.ne]: null,
});

export const getWhereFromMap = (parameters: Map<string, WhereOptions | Object>): WhereOptions =>
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

//-----------------------------
// Date utils
// https://stackoverflow.com/questions/2698725/comparing-date-part-only-without-comparing-time-in-javascript
//

export const justADate = (initDate?: Date | string) => {
	let utcMidnightDateObj: Date;
	// if no date supplied, use Now.
	if (!initDate) initDate = new Date();

	// if initDate specifies a timezone offset, or is already UTC, just keep the date part, reflecting the date _in that timezone_
	if (typeof initDate === 'string' && initDate.match(/((\+|-)\d{2}:\d{2}|Z)$/gm)) {
		utcMidnightDateObj = new Date(initDate.substring(0, 10) + 'T00:00:00Z');
	} else {
		// if init date is not already a date object, feed it to the date constructor.
		if (!(initDate instanceof Date)) initDate = new Date(initDate);
		// Vital Step! Strip time part. Create UTC midnight dateObj according to local timezone.
		utcMidnightDateObj = new Date(Date.UTC(initDate.getFullYear(), initDate.getMonth(), initDate.getDate()));
	}

	return {
		toISOString: () => utcMidnightDateObj.toISOString(),
		getUTCDate: () => utcMidnightDateObj.getUTCDate(),
		getUTCDay: () => utcMidnightDateObj.getUTCDay(),
		getUTCFullYear: () => utcMidnightDateObj.getUTCFullYear(),
		getUTCMonth: () => utcMidnightDateObj.getUTCMonth(),
		setUTCDate: (date: number) => utcMidnightDateObj.setUTCDate(date),
		setUTCFullYear: (years: number) => utcMidnightDateObj.setUTCFullYear(years),
		setUTCMonth: (months: number) => utcMidnightDateObj.setUTCMonth(months),
		addDays: function (days: number) {
			utcMidnightDateObj.setUTCDate(utcMidnightDateObj.getUTCDate() + days);
			return this;
		},
		toString: () => utcMidnightDateObj.toString(),
		toLocaleDateString: (
			locales?: string | string[] | undefined,
			options?: Intl.DateTimeFormatOptions | undefined
		): string => {
			const option = options || {};
			option.timeZone = 'UTC';
			const locale = locales || 'en-EN';
			return utcMidnightDateObj.toLocaleDateString(locale, option);
		},
	};
};
