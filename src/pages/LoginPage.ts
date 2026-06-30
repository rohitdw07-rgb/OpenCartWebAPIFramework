
import {Locator, Page} from "@playwright/test";
import BasePage from "./BasePage";

export  class LoginPage extends BasePage {

    //Private Locators
    private readonly emailId : Locator ;
    private readonly password : Locator ;
    private readonly loginBtn : Locator ;
    private readonly forgottenPasswordLink : Locator ;
    private readonly logo : Locator;
    private readonly loginErorMessage : Locator;
    private readonly registerBtn : Locator;

    //constructor of class and init the locator 
    constructor(page :Page){

        super(page);
        this.emailId= page.getByRole('textbox' ,{name :'E-mail Address'});
        this.password= page.getByRole('textbox', {name :'Password'});
        this.loginBtn= page.getByRole('button', {name : 'Login'});
        this.forgottenPasswordLink= page.getByRole('link',{name :'Forgotten Password'}).first();
        this.logo = page.getByAltText('naveenopencart');
        this.loginErorMessage= page.locator('.alert.alert-danger.alert-dismissible')
        this.registerBtn = page.getByRole('link', {name :'Register'});
    }

    //public page actions (method)/ behaviour 
    async goToLoginPage() : Promise<void>{
        await this.page.goto('opencart/index.php?route=account/login');
    }

    async getLoginPageTitle() : Promise<String>{
        return await this.page.title();
    }

    async isForgotPwdLinkExist() : Promise<Boolean> {
        return await this.forgottenPasswordLink.isVisible();
    }

    async doLogin(username : string , password : string): Promise<void>{
        console.log(`User Cred : ${username} : ${password}`);
        await this.emailId.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();

    }

    async isInvalidLoginErrorDisplayed(): Promise<boolean>{
        return await this.loginErorMessage.isVisible();
    }

    async goToRegistrationPageByClickingRegBtn(): Promise<void>{
        await this.registerBtn.click();
    }

} 

//export default LoginPage;