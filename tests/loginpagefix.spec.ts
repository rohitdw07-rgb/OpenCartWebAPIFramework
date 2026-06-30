import {test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';
//import { JsonHelper } from '../src/utils/JsonHelper';

test.beforeEach(async({loginpage})=>{ 
    await loginpage.goToLoginPage(); 
});

test('Login page title test', async({loginpage})=>{  
    const pageTitle= await loginpage.getLoginPageTitle();
    console.log('login page title is ', pageTitle);
    expect(pageTitle).toBe('Account Login');
});

test ('forgot password link exist test', async({loginpage})=>{
    expect(await loginpage.isForgotPwdLinkExist()).toBeTruthy();
});

test('user able to login into app test', async({loginpage, homepage})=>{
    await loginpage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
    expect.soft(await homepage.isLogoutLinkExist()).toBeTruthy();
    expect.soft(await homepage.getHomePageTitle()).toBe('My Account');
});

//DD.1 sequance mode -- only 1 test cases is running using testdata from fixtures
test('login to app using wrong credentials with data driven test', async({loginpage, testData})=>{
    for(let row of testData){
        await loginpage.doLogin(row.username, row.password);
        expect(await loginpage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    }
});

//DD.2 Without fixures , parallel mode read csv data directly and loop the test method loop wise

let testData= CsvHelper.readCsv('src/data/loginData.csv');

for(let row of testData){
    test(`Invalid login test - ${row.username} - ${row.password}`, async({loginpage})=>{
        await loginpage.doLogin(row.username, row.password);
        expect(await loginpage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
};

//DD with json

//let userdata=JsonHelper.readjson('src/utils/JsonHelper.ts');

for(let row of testData){
    test(`Invalid login test with ${row.username}`, async({loginpage})=>{
        await loginpage.doLogin(row.username, row.password);
        expect(await loginpage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    })
}