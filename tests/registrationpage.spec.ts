
import{test, expect} from '../src/fixtures/pagefixtures'
import { CsvHelper } from '../src/utils/CsvHelper';

test.beforeEach(async({loginpage})=>{
    await loginpage.goToLoginPage();
    await loginpage.goToRegistrationPageByClickingRegBtn();
});

test('Create new user by filling data in registration page test', async({registrationpage})=>{
    await registrationpage.doRegistrationOfNewUser('Rohit', 'Ware', 'rohitware0707124@gmail.com', '7575757575', 'Pass123');
});

let testData= CsvHelper.readCsv('src/data/userRegistrationData.csv');

for(let row of testData){
    test(`create new user test for- ${row.firstName}`, async({registrationpage})=>{
        await registrationpage.doRegistrationOfNewUser(row.firstName, row.lastName, row.email, row.telephone, row.password);
    })
}