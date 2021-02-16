"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vardump = exports.isTestMode = exports.isDevMode = exports.isProductionMode = exports.getEnv = void 0;
require("./env");
const util_1 = __importDefault(require("util"));
function getEnv() {
    return process.env.NODE_ENV;
}
exports.getEnv = getEnv;
function isProductionMode() {
    return process.env.NODE_ENV === 'production';
}
exports.isProductionMode = isProductionMode;
function isDevMode() {
    return process.env.NODE_ENV == undefined || process.env.NODE_ENV == 'development';
}
exports.isDevMode = isDevMode;
function isTestMode() {
    return process.env.NODE_ENV == 'test';
}
exports.isTestMode = isTestMode;
function vardump(target) {
    return util_1.default.inspect(target, { showHidden: true, showProxy: true, depth: 10 });
}
exports.vardump = vardump;
