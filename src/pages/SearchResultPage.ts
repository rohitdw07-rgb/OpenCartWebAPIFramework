import { Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";

export class SearchResultPage extends BasePage{

    //Private Locator
    private readonly searchResult : Locator;


    //constructor
    constructor(page : Page){
        super(page);
        this.searchResult=page.locator('div.product-layout');
    };

    //action methods
    async getProductSearchResultCount() : Promise<number>{
        return await this.searchResult.count();
    }

    async selectProduct(productname : string): Promise<void>{
        await this.page.getByRole('link', {name :productname, exact: true }).first().click();
    }

}