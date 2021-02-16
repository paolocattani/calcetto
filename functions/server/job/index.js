"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../core/logger");
const chalk_1 = __importDefault(require("chalk"));
function default_1(active) {
    if (!active)
        return;
    logger_1.logger.info(chalk_1.default.redBright.bold('Scheduling backgroung jobs !'));
}
exports.default = default_1;
