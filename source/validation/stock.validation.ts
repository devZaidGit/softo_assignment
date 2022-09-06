import { check } from 'express-validator';


import { ANY }  from './../interfaces/stock'

export const checkStockValidation: ANY = [

  check('sku')
      .exists()
      .withMessage( 'SKU is required field' )
];
