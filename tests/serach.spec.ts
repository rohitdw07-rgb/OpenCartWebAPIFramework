import {test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';

test.beforeEach(async({loginpage})=>{
    await loginpage.goToLoginPage();
    await loginpage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
})


let productdata=CsvHelper.readCsv('src/data/product.csv');
for(let row of productdata){
    test(`verify search result count for--${row.productname} `, async({homepage, searchResultPage})=>{
        await homepage.doSearch(row.searchkey);
        expect(await searchResultPage.getProductSearchResultCount()).toBe(Number(row.resultcount));
    })
}


for(let row of productdata){
    test(`verify user able to land on the product page--${row.productname} `, async({homepage, searchResultPage, page})=>{
        await homepage.doSearch(row.searchkey);
        await searchResultPage.selectProduct(row.productname);
        expect(await page.title()).toBe(row.productname);
    })
}