
import {test, expect } from "@playwright/test";
import {LoginPage} from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";

let loginpage: LoginPage;
let homepage : HomePage;

test.beforeEach(async({page})=>{
    loginpage = new LoginPage(page);
    await loginpage.goToLoginPage();
    homepage = new HomePage(page);
});

test('Login page title test', async()=>{  
    const pageTitle= await loginpage.getLoginPageTitle();
    console.log('login page title is ', pageTitle);
    expect(pageTitle).toBe('Account Login');
});

test ('forgot password link exist test', async()=>{
    expect(await loginpage.isForgotPwdLinkExist()).toBeTruthy();
});

test('user able to login into app test', async()=>{
    await loginpage.doLogin('rohitdw07@gmail.com', 'Rohit@0707');
    expect.soft(await homepage.isLogoutLinkExist()).toBeTruthy();
    expect.soft(await homepage.getHomePageTitle()).toBe('My Account');
});