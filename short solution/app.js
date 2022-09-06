const fs = require('fs');

let stockFile = fs.readFileSync('stock.json');
let transactionFile = fs.readFileSync('transactions.json');
let stock = JSON.parse(stockFile);
let transaction = JSON.parse(transactionFile);





function calcualtion(sku){


    let stockSKU = stock.find(o => o.sku === sku);
    let TransactionSKU = transaction.find(o => o.sku === sku);

    console.log('stockSKU', stockSKU)
    console.log('TransactionSKU', TransactionSKU)



    // let order = transaction.filter(function (e) {
    //     return e.sku === sku && e.type === 'order';
    // });

    // let refund = transaction.filter(function (e) {
    //     return e.sku === sku && e.type === 'refund';
    // });

    // console.log('order', order)
    // console.log('refund', refund)



    let allTransaction = transaction.filter(function (e) {
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


    console.log('all order', allTransaction)

    console.log('overlall stock', stockSKU.stock);

}

calcualtion('XOE089797/10/74');


