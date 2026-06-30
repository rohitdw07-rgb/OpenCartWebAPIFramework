
import { Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";

export class RegistrationPage extends BasePage{

    //Private Locators
    private readonly header : Locator;
    private readonly firstName : Locator;
    private readonly lastName : Locator;
    private readonly email : Locator;
    private readonly telephone : Locator;
    private readonly password : Locator;
    private readonly confirmPassword : Locator;
    private readonly NoRadioBtn : Locator;
    private readonly yesRadioBtn : Locator;
    private readonly privacyPolicyCheckBox : Locator;
    private readonly continueBtn : Locator;


    // create constructor to initialize the locator
    constructor(page : Page){
        super(page);
        this.header= page.getByRole('heading', {name : 'Register Account'});
        this.firstName= page.getByRole('textbox', {name : 'First Name'});
        this.lastName = page .getByRole('textbox', {name : 'Last Name'});
        this.email = page.getByRole('textbox', {name : 'E-Mail'});
        this.telephone = page.getByRole('textbox', {name : 'Telephone'});
        this.password = page.locator('#input-password');
        this.confirmPassword = page.locator('#input-confirm');
        this.NoRadioBtn = page.getByRole('radio', {name :'No'});
        this.yesRadioBtn = page.getByRole('radio', {name :'Yes'});
        this.privacyPolicyCheckBox =page.locator("input[type='checkbox']");
        this.continueBtn = page.getByRole('button', {name :'Continue'});
    }

    async getRegistrationPageHeader(): Promise<string>{
        return await this.header.innerText();
    }

    async doRegistrationOfNewUser(firstName: string, lastName :string, email: string, telephone : string, password : string): Promise<void>{
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.telephone.fill(telephone);
        await this.password.fill(password);
        await this.confirmPassword.fill(password);
        await this.privacyPolicyCheckBox.click();
        await this.continueBtn.click();
    }
}