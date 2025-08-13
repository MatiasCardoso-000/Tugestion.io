"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_TOKEN_SECRET = exports.ACCESS_TOKEN_SECRET = exports.PORT = void 0;
exports.PORT = process.env.PORT || 8080;
exports.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN || 'yoursecret';
exports.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN || 'yoursecret';
