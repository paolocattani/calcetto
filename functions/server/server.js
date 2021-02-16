"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webApi = exports.httpServer = exports.connection = void 0;
const AppServer_1 = __importDefault(require("./express/AppServer"));
const applicationServer = new AppServer_1.default();
exports.connection = applicationServer.connect();
exports.httpServer = applicationServer.start();
exports.webApi = applicationServer.application;
exports.default = applicationServer;
