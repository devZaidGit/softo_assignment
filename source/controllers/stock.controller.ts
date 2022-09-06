import { NextFunction, Request, Response } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';
import stockService from '../service/stock.service';
import { ANY, STOCK_RESPONSE }  from './../interfaces/stock'



const checkStock = async (req: Request, res: Response, next: NextFunction): Promise<ANY>  => {

    try {

        const errors: Result<ValidationError> | ANY = validationResult(req);

        if (errors && Object.keys(errors.errors).length) {
            throw errors;
        }
        const { sku } = req.body;

        let result: STOCK_RESPONSE = await stockService.checkStockTransaction(sku);

        res.status(200).json({
            status: 200,
            data: result
        });

    } catch (err) {
        next(err)
    }
};


export default {
    checkStock
};
