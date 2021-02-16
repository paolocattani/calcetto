"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.justADate = exports.formatDate = exports.getTodayDate = void 0;
const getTodayDate = () => formatDate(new Date());
exports.getTodayDate = getTodayDate;
function formatDate(date, delimiter = '/') {
    var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join(delimiter);
}
exports.formatDate = formatDate;
const justADate = (initDate) => {
    let utcMidnightDateObj;
    if (!initDate)
        initDate = new Date();
    if (typeof initDate === 'string' && initDate.match(/((\+|-)\d{2}:\d{2}|Z)$/gm)) {
        utcMidnightDateObj = new Date(initDate.substring(0, 10) + 'T00:00:00Z');
    }
    else {
        if (!(initDate instanceof Date))
            initDate = new Date(initDate);
        utcMidnightDateObj = new Date(Date.UTC(initDate.getFullYear(), initDate.getMonth(), initDate.getDate()));
    }
    return {
        toISOString: () => utcMidnightDateObj.toISOString(),
        getUTCDate: () => utcMidnightDateObj.getUTCDate(),
        getUTCDay: () => utcMidnightDateObj.getUTCDay(),
        getUTCFullYear: () => utcMidnightDateObj.getUTCFullYear(),
        getUTCMonth: () => utcMidnightDateObj.getUTCMonth(),
        setUTCDate: (date) => utcMidnightDateObj.setUTCDate(date),
        setUTCFullYear: (years) => utcMidnightDateObj.setUTCFullYear(years),
        setUTCMonth: (months) => utcMidnightDateObj.setUTCMonth(months),
        addDays: (days) => {
            utcMidnightDateObj.setUTCDate(utcMidnightDateObj.getUTCDate() + days);
        },
        toString: () => utcMidnightDateObj.toString(),
        toLocaleDateString: (locales, options) => {
            const option = options || {};
            option.timeZone = 'UTC';
            const locale = locales || 'it-IT';
            return utcMidnightDateObj.toLocaleDateString(locale, option);
        },
    };
};
exports.justADate = justADate;
