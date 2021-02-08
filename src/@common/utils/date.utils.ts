export const getTodayDate = () => formatDate(new Date());

export function formatDate(date: Date, delimiter: string = '/') {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join(delimiter);
}

// https://stackoverflow.com/questions/2698725/comparing-date-part-only-without-comparing-time-in-javascript
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
		addDays: (days: number) => {
			utcMidnightDateObj.setUTCDate(utcMidnightDateObj.getUTCDate() + days);
		},
		toString: () => utcMidnightDateObj.toString(),
		toLocaleDateString: (
			locales?: string | string[] | undefined,
			options?: Intl.DateTimeFormatOptions | undefined
		): string => {
			const option = options || {};
			option.timeZone = 'UTC';
			const locale = locales || 'it-IT';
			return utcMidnightDateObj.toLocaleDateString(locale, option);
		},
	};
};
