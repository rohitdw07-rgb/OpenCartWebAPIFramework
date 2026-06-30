
import {test as basTest} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CsvHelper } from '../utils/CsvHelper';
import { RegistrationPage } from '../pages/RegistrationPage';
import { SearchResultPage } from '../pages/SearchResultPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';

//define types for page fixtures
type pageFixtures ={
    loginpage : LoginPage,
    homepage : HomePage,
    registrationpage : RegistrationPage,
    searchResultPage : SearchResultPage,
    productInfoPage : ProductInfoPage,
    testData : Record< string, string>[]
}

//extend the playwright base test:

export let test = basTest.extend <pageFixtures>({

    loginpage : async({page}, use)=>{
        let loginpage = new LoginPage(page);
        await use(loginpage);
    },

    homepage : async({page}, use)=>{
        let homepage = new HomePage(page);
        await use(homepage);
    },

    registrationpage: async({page}, use)=>{
        let registrationpage = new RegistrationPage(page);
        await use(registrationpage);
    },
    
    searchResultPage : async({page}, use)=>{
        let searchResultPage = new SearchResultPage(page);
        await use(searchResultPage);
    },

    productInfoPage  : async({page}, use)=>{
        let productInfoPage = new ProductInfoPage(page);
        await use(productInfoPage);
    },

    testData: async({}, use)=>{
        let testdata=CsvHelper.readCsv('src/data/loginData.csv');
        await use(testdata);
    }
});

export { expect } from '@playwright/test';

