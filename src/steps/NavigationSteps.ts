import { When, Then } from '@cucumber/cucumber';
import { NavigationModule } from '../modules/NavigationModule';

let navMod: NavigationModule;

When('User clicks hamburger menu', async function () {
    navMod = new NavigationModule(this.page);
    await navMod.clickHamburgerMenu();
});

Then('User verifies menu is opened', async function () {
    if (!navMod) navMod = new NavigationModule(this.page);
    await navMod.verifyMenuOpened();
});

When('User clicks close menu button', async function () {
    if (!navMod) navMod = new NavigationModule(this.page);
    await navMod.clickCloseMenu();
});

Then('User verifies menu is closed', async function () {
    if (!navMod) navMod = new NavigationModule(this.page);
    await navMod.verifyMenuClosed();
});

When('User opens hamburger menu', async function () {
    navMod = new NavigationModule(this.page);
    await navMod.clickHamburgerMenu();
});

When('User clicks All Items link', async function () {
    if (!navMod) navMod = new NavigationModule(this.page);
    await navMod.openMenuAndClickAllItems();
});

When('User clicks About link', async function () {
    if (!navMod) navMod = new NavigationModule(this.page);
    await navMod.openMenuAndClickAbout();
});

Then('User verifies about page is opened', async function () {
    if (!navMod) navMod = new NavigationModule(this.page);
    await navMod.verifyAboutPageOpened();
});

When('User clicks Reset App State', async function () {
    if (!navMod) navMod = new NavigationModule(this.page);
    await navMod.openMenuAndResetAppState();
});

Then('User verifies cart is reset', async function () {
    if (!navMod) navMod = new NavigationModule(this.page);
    await navMod.verifyCartReset();
});

Then('User verifies Twitter link is present', async function () {
    navMod = new NavigationModule(this.page);
    await navMod.verifyTwitterLinkPresent();
});

Then('User verifies Facebook link is present', async function () {
    if (!navMod) navMod = new NavigationModule(this.page);
    await navMod.verifyFacebookLinkPresent();
});

Then('User verifies LinkedIn link is present', async function () {
    if (!navMod) navMod = new NavigationModule(this.page);
    await navMod.verifyLinkedInLinkPresent();
});

When('User clicks cart icon', async function () {
    navMod = new NavigationModule(this.page);
    await navMod.clickCartIcon();
});

Then('User verifies cart page is displayed', async function () {
    if (!navMod) navMod = new NavigationModule(this.page);
    await navMod.verifyCartPageDisplayed();
});
