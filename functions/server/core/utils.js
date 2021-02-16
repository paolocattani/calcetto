"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.justADate = exports.dateInRageWrapper = exports.lowerWrapper = exports.castWrapper = exports.getWhereFromMap = exports.isNotNull = exports.logEntity = exports.asyncForEach = exports.getBaseLog = exports.getRandomIntInclusive = void 0;
const sequelize_1 = require("sequelize");
const getRandomIntInclusive = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
exports.getRandomIntInclusive = getRandomIntInclusive;
function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}
exports.getBaseLog = getBaseLog;
function asyncForEach(array, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let index = 0; index < array.length; index++) {
            yield callback(array[index], index, array);
        }
    });
}
exports.asyncForEach = asyncForEach;
const logEntity = (entity) => JSON.stringify(entity, null, 2);
exports.logEntity = logEntity;
const isNotNull = () => ({
    [sequelize_1.Op.not]: '',
    [sequelize_1.Op.ne]: null,
});
exports.isNotNull = isNotNull;
const getWhereFromMap = (parameters) => [...parameters.entries()].reduce((acc, [key, value]) => (key === 'fn' ? Object.assign(Object.assign({}, acc), { value }) : Object.assign(Object.assign({}, acc), { [key]: value })), {});
exports.getWhereFromMap = getWhereFromMap;
const castWrapper = (isColumn, value, dataType) => sequelize_1.Sequelize.cast(isColumn ? sequelize_1.Sequelize.col(value) : value, dataType);
exports.castWrapper = castWrapper;
const lowerWrapper = (colName, value) => sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn('lower', sequelize_1.Sequelize.col(colName)), value.toLowerCase());
exports.lowerWrapper = lowerWrapper;
const dateInRageWrapper = (colName, startDate, endDate) => ({
    [sequelize_1.Op.and]: [
        sequelize_1.Sequelize.where(exports.castWrapper(true, colName, 'DATE'), '>=', exports.castWrapper(false, exports.justADate(startDate).toISOString(), 'DATE')),
        sequelize_1.Sequelize.where(exports.castWrapper(true, colName, 'DATE'), '<', exports.castWrapper(false, exports.justADate(endDate).addDays(1).toISOString(), 'DATE')),
    ],
});
exports.dateInRageWrapper = dateInRageWrapper;
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
        addDays: function (days) {
            utcMidnightDateObj.setUTCDate(utcMidnightDateObj.getUTCDate() + days);
            return this;
        },
        toString: () => utcMidnightDateObj.toString(),
        toLocaleDateString: (locales, options) => {
            const option = options || {};
            option.timeZone = 'UTC';
            const locale = locales || 'en-EN';
            return utcMidnightDateObj.toLocaleDateString(locale, option);
        },
    };
};
exports.justADate = justADate;
