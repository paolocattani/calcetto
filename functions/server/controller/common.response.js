"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.unexpectedServerError = exports.missingParameters = exports.entityNotFound = exports.success = exports.failure = exports.forbidden = exports.unauthorized = exports.ComposeReponse = void 0;
const HttpStatusCode_1 = require("../../src/@common/models/HttpStatusCode");
const common_models_1 = require("../../src/@common/models/common.models");
const logger_1 = require("../core/logger");
const chalk_1 = __importDefault(require("chalk"));
const ComposeReponse = (res, status, internalMessage, type, label, additionalInfo) => {
    logger_1.logger.info(`---->  ${status} : ${internalMessage}`);
    return res.status(status).json(Object.assign(Object.assign({}, additionalInfo), { code: status, message: internalMessage, userMessage: Object.assign({ type }, label) }));
};
exports.ComposeReponse = ComposeReponse;
const unauthorized = (res, label, internalMessage, additionalInfo) => exports.ComposeReponse(res, HttpStatusCode_1.HTTPStatusCode.Unauthorized, internalMessage || 'Unauthorized !', common_models_1.UserMessageType.Danger, label, additionalInfo);
exports.unauthorized = unauthorized;
const forbidden = (res, label, internalMessage, additionalInfo) => exports.ComposeReponse(res, HttpStatusCode_1.HTTPStatusCode.Forbidden, internalMessage || 'Forbidden !', common_models_1.UserMessageType.Danger, label, additionalInfo);
exports.forbidden = forbidden;
const failure = (res, label, internalMessage, status, additionalInfo) => exports.ComposeReponse(res, status || HttpStatusCode_1.HTTPStatusCode.BadRequest, internalMessage || 'Bad Request.', common_models_1.UserMessageType.Danger, label, additionalInfo);
exports.failure = failure;
const success = (res, label, additionalInfo) => exports.ComposeReponse(res, HttpStatusCode_1.HTTPStatusCode.OK, 'Success', common_models_1.UserMessageType.Success, label, additionalInfo);
exports.success = success;
const entityNotFound = (res) => exports.failure(res, { label: 'common:server.not_found' }, 'Entity not found', HttpStatusCode_1.HTTPStatusCode.NotFound);
exports.entityNotFound = entityNotFound;
const missingParameters = (res, additionalInfo) => exports.ComposeReponse(res, HttpStatusCode_1.HTTPStatusCode.BadRequest, 'Missing parameters', common_models_1.UserMessageType.Danger, { label: '' }, additionalInfo);
exports.missingParameters = missingParameters;
const unexpectedServerError = (res, additionalInfo) => exports.ComposeReponse(res, HttpStatusCode_1.HTTPStatusCode.InternalServerError, 'Unexpected Server Error', common_models_1.UserMessageType.Danger, { label: 'common:server.unexpected' }, additionalInfo);
exports.unexpectedServerError = unexpectedServerError;
const serverError = (message, err, res, additionalInfo) => {
    logger_1.logger.error(chalk_1.default.redBright(message), err);
    return exports.unexpectedServerError(res, additionalInfo);
};
exports.serverError = serverError;
