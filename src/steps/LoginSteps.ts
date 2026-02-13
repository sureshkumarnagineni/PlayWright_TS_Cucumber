import { Given, When, Then } from '@cucumber/cucumber';
import { LoginModule } from '../modules/LoginModule'; import { PurchaseModule } from '../modules/PurchaseModule';

let loginMod: LoginModule;
let purchaseMod: PurchaseModule;

When('User enters invalid username and valid password', async function () {
    loginMod = new LoginModule(this.page);
    await loginMod.loginWithInvalidUsername();
});

When('User enters valid username and invalid password', async function () {
    loginMod = new LoginModule(this.page);
    await loginMod.loginWithInvalidPassword();
});

When('User clicks login button without entering credentials', async function () {
    loginMod = new LoginModule(this.page);
    await loginMod.clickLoginWithoutCredentials();
});

Then('User verifies successful login', async function () {
    loginMod = new LoginModule(this.page);
    await loginMod.verifySuccessfulLogin();
});

Then('User verifies login error message {string}', async function (errorMessage: string) {
    if (!loginMod) loginMod = new LoginModule(this.page);
    await loginMod.verifyLoginErrorMessage(errorMessage);
});
