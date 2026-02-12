import { PlaywrightActions } from '../actions/PlaywrightActions';
import { SessionPage } from '../pages/SessionPage';

export class SessionModule {
    private actions: PlaywrightActions;
    private sessionPage = new SessionPage();

    constructor(page: any) { 
        this.actions = new PlaywrightActions(page); 
    }

    async logout() {
        await this.actions.click(this.sessionPage.menuButton);
        await this.actions.wait(1);
        await this.actions.click(this.sessionPage.logoutLink);
        await this.actions.wait(2);
    }

    async isLoggedOut(): Promise<boolean> {
        try {
            await this.actions.assertVisible(this.sessionPage.loginContainer);
            return true;
        } catch {
            return false;
        }
    }

    async getCurrentUrl(): Promise<string> {
        return await this.actions.getCurrentUrl();
    }

    async verifyLoginPage(): Promise<boolean> {
        const url = await this.getCurrentUrl();
        return url.includes('saucedemo.com');
    }
}
