import { Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";


export class HomePage extends BasePage{

    //Private Locators
    private readonly logoutLink : Locator;
    private readonly headers : Locator;
    private readonly search : Locator;
    private readonly searchIcon : Locator;

    //constructor of class and init the locator 
    constructor(page :Page){
        super(page);
        this.logoutLink = page.getByRole('link', {name :'Logout'});
        this.headers =page.getByRole('heading', {level :2});
        this.search = page.getByRole('textbox', {name :'Search'});
        this.searchIcon = page.locator('div#search button');
    }

    //public page actions (method)/ behaviour 
    async getHomePageTitle(): Promise<string>{
        return await this.page.title();
    }

    async isLogoutLinkExist() : Promise<boolean>{
        return await this.logoutLink.isVisible();
    }

    async getHomePageHeaders(): Promise<String[]>{
        return await this.headers.allInnerTexts();
    }

    async doSearch(serachkey : string): Promise<void>{
        console.log(`Search key -${serachkey}`);
        await this.search.fill(serachkey);
        await this.searchIcon.click();
    }
}