import {Locator, Page } from "@playwright/test"
import BasePage from "./BasePage"

export class ProductInfoPage extends BasePage{

    //Private Locators
    private readonly header: Locator;
    private readonly productImage : Locator;
    private readonly productMetadata : Locator;
    private readonly productPricing : Locator;
    private map :Map<string,string | number>;

    //create constructor
    constructor(page : Page){
        super(page);
        this.header = page.getByRole('heading', {level: 1});
        this.productImage= page.locator('div#content li img');
        this.productMetadata= page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
        this.productPricing= page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
        this.map = new Map<string, string |number>();

    }


    //action methods

    async getProductHeader() : Promise<string>{
        return await this.header.innerText();
    }

    async getProductImagesCount() : Promise<number>{
       // await this.page.waitForTimeout(4000);
        await this.productImage.first().waitFor({state :'visible'});
        return await this.productImage.count();
    }

    /**
     * this method returning all product info data
     */
    async getProductInfo(): Promise<Map<string, string| number>>{
        this.map.set('ProductHeader', await this.getProductHeader());
        this.map.set('ProductImages', await this.getProductImagesCount());
        await this.getProductMetaData();
        await this.getproductPricingData();
        return this.map;
    }

    private async getProductMetaData():Promise<void>{
        let metadata=await this.productMetadata.allInnerTexts();
        for(let data of metadata){
            let meta= data.split(':');
            let metakey= meta[0].trim();
            let metavalues= meta[1].trim();
            this.map.set(metakey,metavalues);

        }
    }

    private async getproductPricingData(): Promise<void>{
        let pricedata = await this.productPricing.allInnerTexts();
        let productPrice = pricedata[0].trim();
        let exTaxPrice = pricedata[1].split(':')[1].trim();
        this.map.set('productPrice ',productPrice);
        this.map.set('exTaxPrice', exTaxPrice);
    }
}