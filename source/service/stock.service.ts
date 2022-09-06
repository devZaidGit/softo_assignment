
import stockData from './../models/stock.json';
import TransactionData from './../models/transactions.json';
import { ANY, STOCK_RESPONSE, STOCK_DATA  }  from './../interfaces/stock'


async function checkStockTransaction(sku: string): Promise<STOCK_RESPONSE> {


    let stock = stockData.find(o => o.sku === sku);
    let TransactionSKU = TransactionData.find(o => o.sku === sku);

    if(!stock || !TransactionSKU){
        throw { status: 400, message: `SKU not exist in stock and transaction`};
    }

    let transactionStock = TransactionData.filter(function (e) {
        return e.sku === sku;
    })
    .reduce((acc, cv) => {

        if(cv.type === 'order'){
            return acc + cv.qty;
        }
        if(cv.type === 'refund'){
            return acc - cv.qty;
        }

        return acc
        
    }, 0);

    return  {
        sku: stock.sku,
        remaining_qty: stock.stock - transactionStock
    }

}


export default {
    checkStockTransaction
};
