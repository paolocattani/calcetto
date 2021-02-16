"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailRegExp = exports.passwordRegExp = exports.phoneRegExp = exports.roundNumber = exports.getBaseLog = exports.getRandomIntInclusive = void 0;
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.getRandomIntInclusive = getRandomIntInclusive;
function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}
exports.getBaseLog = getBaseLog;
const roundNumber = (num, decimal) => Math.round((num + Number.EPSILON) * Math.pow(10, decimal)) / Math.pow(10, decimal);
exports.roundNumber = roundNumber;
exports.phoneRegExp = new RegExp('^d{10}$');
exports.passwordRegExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,16})');
exports.emailRegExp = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
