import { PlaywrightActions } from '../actions/PlaywrightActions';
import { LoginPage } from '../pages/LoginPage';
import { FileUtils } from '../utils/FileUtils';

export class LoginModule {
    private actions: PlaywrightActions;
    private loginPage = new LoginPage();

    constructor(page: any) { this.actions = new PlaywrightActions(page); }

    async loginAsRole(role: string) {
        const user = FileUtils.getProperty(`${role}_name`);
        const pass = FileUtils.getProperty(`${role}_pass`);
        await this.actions.type(this.loginPage.usernameInput, user);
        await this.actions.type(this.loginPage.passwordInput, pass);
        await this.actions.click(this.loginPage.loginButton);
    }

    async verifySuccessfulLogin(): Promise<void> {
        await this.actions.assertVisible(this.loginPage.inventoryContainer);
        await this.actions.assertVisible(this.loginPage.productTitle);
        console.log('✓ User logged in successfully');
    }

    async loginWithInvalidUsername(): Promise<void> {
        await this.actions.type(this.loginPage.usernameInput, 'invalid_user');
        await this.actions.type(this.loginPage.passwordInput, FileUtils.getProperty('standard_user_pass'));
        await this.actions.click(this.loginPage.loginButton);
    }

    async loginWithInvalidPassword(): Promise<void> {
        await this.actions.type(this.loginPage.usernameInput, FileUtils.getProperty('standard_user_name'));
        await this.actions.type(this.loginPage.passwordInput, 'invalid_password');
        await this.actions.click(this.loginPage.loginButton);
    }

    async clickLoginWithoutCredentials(): Promise<void> {
        await this.actions.click(this.loginPage.loginButton);
    }

    async verifyLoginErrorMessage(expectedMessage: string): Promise<void> {
        await this.actions.assertVisible(this.loginPage.errorMessage);
        const actualMessage = await this.actions.getElementText(this.loginPage.errorMessage);
        if (!actualMessage.includes(expectedMessage)) {
            throw new Error(`Expected error message to contain "${expectedMessage}" but got "${actualMessage}"`);
        }
        console.log(`✓ Login error message verified: ${expectedMessage}`);
    }
}