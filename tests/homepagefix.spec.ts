import {test, expect} from '../src/fixtures/pagefixtures';




test.beforeEach(async({loginpage})=>{ 
    await loginpage.goToLoginPage();
    await loginpage.doLogin('rohitdw07@gmail.com', 'Rohit@0707')
});

test('Home page Title test', async({homepage})=>{
    const pageTitle = await homepage.getHomePageTitle();
    console.log(pageTitle);
    expect(pageTitle).toBe('My Account');
});

test('Logout Link Exist Test', async({homepage})=>{
    expect(await homepage.isLogoutLinkExist()).toBeTruthy();
});

test('Home page headers exist test ', async({homepage})=>{
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