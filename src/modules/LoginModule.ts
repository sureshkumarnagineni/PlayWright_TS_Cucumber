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
}