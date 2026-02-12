import { When, Then } from '@cucumber/cucumber';
import { SessionModule } from '../modules/SessionModule';

let sessionMod: SessionModule;

When('User performs logout', async function () {
    sessionMod = new SessionModule(this.page);
    await sessionMod.logout();
});

Then('User verifies logout and redirected to login page', async function () {
    const isLoggedOut = await sessionMod.isLoggedOut();
    const isLoginPage = await sessionMod.verifyLoginPage();
    
    console.log(`Logged out: ${isLoggedOut}, On login page: ${isLoginPage}`);
    
    if (!isLoggedOut) {
        throw new Error('User is still logged in');
    }
    
    if (!isLoginPage) {
        throw new Error('Not redirected to login page after logout');
    }
    
    console.log('✓ Successfully logged out and redirected to login page');
});
