import { When, Then } from '@cucumber/cucumber';
import { SessionModule } from '../modules/SessionModule';

let sessionMod: SessionModule;

When('User performs logout', async function () {
    sessionMod = new SessionModule(this.page);
    await sessionMod.logout();
});

Then('User verifies logout and redirected to login page', async function () {
    await sessionMod.verifyLogoutAndRedirect();
});
