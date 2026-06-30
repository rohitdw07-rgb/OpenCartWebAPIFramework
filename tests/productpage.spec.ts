import{test, expect} from "../src/fixtures/pagefixtures"

test.beforeEach(async({loginpage})=>{
    await loginpage.goToLoginPage();
    await loginpage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
});

test('verify product images count', async({homepage, searchResultPage, productInfoPage})=>{
    await homepage.doSearch('macbook');
    await searchResultPage.selectProduct('MacBook Pro');
    let imageCount = await productInfoPage.getProductImagesCount();
    expect(imageCount).toBe(4);
});

test('Verify product Information data test', async({homepage, searchResultPage, productInfoPage})=>{
    await homepage.doSearch('macbook');
    await searchResultPage.selectProduct('MacBook Pro');
    let productinfo = await productInfoPage.getProductInfo();
    console.log('Product information :', productinfo);
    expect.soft(productinfo.get('ProductHeader')).toBe('MacBook Pro');
    expect.soft(productinfo.get('Brand')).toBe('Apple');
    expect.soft(productinfo.get('Product Code')).toBe('Product 18');
    //expect.soft(productinfo.get('productPrice')).toBe('$2,000.00');
    expect.soft(productinfo.get('exTaxPrice')).toBe('$2,000.00');
});