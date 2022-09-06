"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var stock_controller_1 = __importDefault(require("../controllers/stock.controller"));
var stock_validation_1 = require("../validation/stock.validation");
var router = express_1.default.Router();
router.post('/checkStock', stock_validation_1.checkStockValidation, stock_controller_1.default.checkStock);
module.exports = router;
