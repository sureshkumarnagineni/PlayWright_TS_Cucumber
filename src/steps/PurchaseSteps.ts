import { Given, When, Then } from '@cucumber/cucumber';
import { PlaywrightActions } from '../actions/PlaywrightActions';
import { LoginModule } from '../modules/LoginModule';
import { FileUtils } from '../utils/fileUtils';
let actions: PlaywrightActions;
let loginMod: LoginModule;

Given('User launches the application', async function () {
    actions = new PlaywrightActions(this.page);
    loginMod = new LoginModule(this.page);
    await actions.goto(FileUtils.getProperty('url'));
    actions.wait(5); // Wait for 2 seconds to ensure the page loads completely
});

When('User logins as {string}', async function (role: string) {
    await loginMod.loginAsRole(role);
});

When('User adds product to cart and completes checkout', async function () {
    await actions.click('#add-to-cart-sauce-labs-backpack');
    await actions.click('.shopping_cart_link');
    await actions.click('#checkout');
    await actions.type('#first-name', FileUtils.getProperty('firstName'));
    await actions.type('#last-name', FileUtils.getProperty('lastName'));
    await actions.type('#postal-code', FileUtils.getProperty('zipCode'));
    await actions.click('#continue');
    await actions.click('#finish');
});

Then('User verifies order confirmation {string}', async function (msg: string) {
    await actions.assertVisible('.complete-header');
    await actions.softAssertText('.complete-header', msg);
    actions.assertAll();
});