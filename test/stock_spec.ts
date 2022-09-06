import "mocha";
import { expect } from "chai";

import  stockService  from "../source/service/stock.service";


const sku = 'KED089097/68/09'
const wrongSku = 'KED08909'

let expectedResult = { sku: 'KED089097/68/09', remaining_qty: 4842 }

describe("SERVICE Function", () => {

    describe("checkStockTransaction", () => {

        it("should return remaining stock", async () => {
            const result = await stockService.checkStockTransaction(sku);
            expect(result).to.deep.equal(expectedResult);
        })


        it("should not exist sku in stock and transaction", async () => {
            stockService.checkStockTransaction(wrongSku)
            .then(result => {})
            .catch(error => {
               chai
                .assert
                .equal(error, 'SKU not exist in stock and transaction')
            });
            
        })


    });
});
