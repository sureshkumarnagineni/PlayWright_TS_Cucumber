import { PlaywrightActions } from '../actions/PlaywrightActions';
import { NavigationPage } from '../pages/NavigationPage';

export class NavigationModule {
    private actions: PlaywrightActions;
    private navPage = new NavigationPage();

    constructor(page: any) {
        this.actions = new PlaywrightActions(page);
    }

    async clickHamburgerMenu(): Promise<void> {
        await this.actions.click(this.navPage.hamburgerMenu);
        await this.actions.wait(1);
    }

    async verifyMenuOpened(): Promise<void> {
        await this.actions.assertVisible(this.navPage.menuWrap);
        await this.actions.assertVisible(this.navPage.logoutLink);
        console.log('✓ Menu is opened');
    }

    async clickCloseMenu(): Promise<void> {
        await this.actions.click(this.navPage.closeMenuButton);
        await this.actions.wait(1);
    }

    async verifyMenuClosed(): Promise<void> {
        const isVisible = await this.actions.isElementVisible(this.navPage.logoutLink);
        if (isVisible) {
            throw new Error('Menu should be closed but logout link is still visible');
        }
        console.log('✓ Menu is closed');
    }

    async openMenuAndClickAllItems(): Promise<void> {
        await this.clickHamburgerMenu();
        await this.actions.click(this.navPage.allItemsLink);
        await this.actions.wait(1);
    }

    async openMenuAndClickAbout(): Promise<void> {
        await this.clickHamburgerMenu();
        await this.actions.click(this.navPage.aboutLink);
        await this.actions.wait(2);
    }

    async verifyAboutPageOpened(): Promise<void> {
        const url = await this.actions.getCurrentUrl();
        if (!url.includes('saucelabs.com')) {
            throw new Error(`Expected URL to contain "saucelabs.com" but got ${url}`);
        }
        console.log('✓ About page opened');
    }

    async openMenuAndResetAppState(): Promise<void> {
        await this.clickHamburgerMenu();
        await this.actions.click(this.navPage.resetAppLink);
        await this.actions.wait(1);
    }

    async verifyCartReset(): Promise<void> {
        // Cart badge should not be visible after reset
        const isVisible = await this.actions.isElementVisible('.shopping_cart_badge');
        if (isVisible) {
            throw new Error('Cart should be reset but badge is still visible');
        }
        console.log('✓ Cart has been reset');
    }

    async verifyProductsPageDisplayed(): Promise<void> {
        await this.actions.assertVisible(this.navPage.inventoryContainer);
        console.log('✓ Products page is displayed');
    }

    async verifyTwitterLinkPresent(): Promise<void> {
        await this.actions.assertVisible(this.navPage.twitterLink);
        console.log('✓ Twitter link is present');
    }

    async verifyFacebookLinkPresent(): Promise<void> {
        await this.actions.assertVisible(this.navPage.facebookLink);
        console.log('✓ Facebook link is present');
    }

    async verifyLinkedInLinkPresent(): Promise<void> {
        await this.actions.assertVisible(this.navPage.linkedinLink);
        console.log('✓ LinkedIn link is present');
    }

    async clickCartIcon(): Promise<void> {
        await this.actions.click('.shopping_cart_link');
        await this.actions.wait(1);
    }

    async verifyCartPageDisplayed(): Promise<void> {
        await this.actions.assertVisible(this.navPage.cartContainer);
        console.log('✓ Cart page is displayed');
    }
}
