"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var dotenv = __importStar(require("dotenv"));
dotenv.config({ path: '.env' });
var errorHandler = function (error, _req, res, _next) {
    if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json(error);
    }
    if (error.code === 11000) {
        return res.status(400).json(error);
    }
    if (error.stack && process.env.NODE_ENVR === 'development') {
        console.error(error, error.stack);
    }
    if (error.errors) {
        return res.status(400).json({
            errors: error.errors.map(function (e) { return e.msg; }),
            message: 'Invalid request'
        });
    }
    return res.status(error.status || 500).json({
        status: error.status,
        message: error.message || error.name || error
    });
};
exports.errorHandler = errorHandler;
