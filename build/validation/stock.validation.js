"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkStockValidation = void 0;
var express_validator_1 = require("express-validator");
exports.checkStockValidation = [
    (0, express_validator_1.check)('sku')
        .exists()
        .withMessage('SKU is required field')
];
