import { Given, When, Then } from '@cucumber/cucumber';
import { LoginModule } from '../modules/LoginModule';
import { PurchaseModule } from '../modules/PurchaseModule';

let loginMod: LoginModule;
let purchaseMod: PurchaseModule;

Given('User launches the application', async function () {
    loginMod = new LoginModule(this.page);
    purchaseMod = new PurchaseModule(this.page);
    await purchaseMod.launchApplication();
});

When('User logins as {string}', async function (role: string) {
    await loginMod.loginAsRole(role);
});

When('User adds product to cart and completes checkout', async function () {
    await purchaseMod.addProductAndCompleteCheckout();
});

Then('User verifies order confirmation {string}', async function (msg: string) {
    await purchaseMod.verifyOrderConfirmation(msg);
});