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
exports.functionDown = exports.functionUp = exports.viewDown = exports.viewUp = void 0;
function viewUp(context, viewName, viewBody) {
    return __awaiter(this, void 0, void 0, function* () {
        yield context.query(`CREATE OR REPLACE VIEW ${viewName} AS ${viewBody}`);
    });
}
exports.viewUp = viewUp;
function viewDown(context, viewName) {
    return __awaiter(this, void 0, void 0, function* () {
        yield context.query(`DROP VIEW ${viewName}`);
    });
}
exports.viewDown = viewDown;
function functionUp(context, functionName, params, returnType, functionBody) {
    return __awaiter(this, void 0, void 0, function* () {
        yield context.query(`CREATE OR REPLACE FUNCTION ${functionName}(${params}) returns ${returnType} AS $func$ ${functionBody} $func$ LANGUAGE sql`);
    });
}
exports.functionUp = functionUp;
function functionDown(context, functionName) {
    return __awaiter(this, void 0, void 0, function* () {
        yield context.query(`DROP FUNCTION ${functionName}`);
    });
}
exports.functionDown = functionDown;
