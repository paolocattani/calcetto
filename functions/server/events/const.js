"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EOM = exports.DEFAULT_HEADERS = exports.CHAR_SET = void 0;
exports.CHAR_SET = 'utf-8';
exports.DEFAULT_HEADERS = {
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-transform',
};
exports.EOM = '\n\n';
