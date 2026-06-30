import {test, expect} from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";

let loginpage : LoginPage;
let homepage : HomePage;

test.beforeEach(async({page})=>{
    loginpage = new LoginPage(page);
    await loginpage.goToLoginPage();
    await loginpage.doLogin('rohitdw07@gmail.com', 'Rohit@0707');
    homepage = new HomePage(page);
});

test('Home page Title test', async()=>{
    const pageTitle = await homepage.getHomePageTitle();
    console.log(pageTitle);
    expect(pageTitle).toBe('My Account');
});

test('Logout Link Exist Test', async()=>{
    expect(await homepage.isLogoutLinkExist()).toBeTruthy();
});

test('Home page headers exist test ', async()=>{
    let allHeaders= await homepage.getHomePageHeaders();
    console.log('All headers of Home page ', allHeaders);
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ])
});