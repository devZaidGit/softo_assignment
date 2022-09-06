import express from 'express';
import stockController from '../controllers/stock.controller';
import { checkStockValidation } from '../validation/stock.validation';


const router = express.Router();

router.post('/checkStock', checkStockValidation, stockController.checkStock);

export = router;
