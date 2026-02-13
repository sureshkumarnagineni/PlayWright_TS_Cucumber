import { PlaywrightActions } from '../actions/PlaywrightActions';
import { CartPage } from '../pages/CartPage';
import { ProductPage } from '../pages/ProductPage';
import { FileUtils } from '../utils/FileUtils';

export class CheckoutModule {
    private actions: PlaywrightActions;
    private cartPage = new CartPage();
    private productPage = new ProductPage();

    constructor(page: any) {
        this.actions = new PlaywrightActions(page);
    }

    async addProductAndNavigateToCheckout(): Promise<void> {
        await this.actions.click(this.productPage.addBackpack);
        await this.actions.click(this.cartPage.cartIcon);
        await this.actions.click(this.cartPage.checkoutButton);
        await this.actions.wait(1);
    }

    async clickCancelOnCheckoutPage(): Promise<void> {
        await this.actions.click(this.cartPage.cancelButton);
        await this.actions.wait(1);
    }

    async verifyCartPageDisplayed(): Promise<void> {
        await this.actions.assertVisible(this.cartPage.checkoutButton);
        console.log('✓ Cart page is displayed');
    }

    async enterCheckoutInfoWithoutFirstName(): Promise<void> {
        await this.actions.type(this.cartPage.lastNameInput, FileUtils.getProperty('lastName'));
        await this.actions.type(this.cartPage.postalCodeInput, FileUtils.getProperty('zipCode'));
        await this.actions.click(this.cartPage.continueButton);
    }

    async enterCheckoutInfoWithoutLastName(): Promise<void> {
        await this.actions.type(this.cartPage.firstNameInput, FileUtils.getProperty('firstName'));
        await this.actions.type(this.cartPage.postalCodeInput, FileUtils.getProperty('zipCode'));
        await this.actions.click(this.cartPage.continueButton);
    }

    async enterCheckoutInfoWithoutPostalCode(): Promise<void> {
        await this.actions.type(this.cartPage.firstNameInput, FileUtils.getProperty('firstName'));
        await this.actions.type(this.cartPage.lastNameInput, FileUtils.getProperty('lastName'));
        await this.actions.click(this.cartPage.continueButton);
    }

    async verifyCheckoutError(expectedError: string): Promise<void> {
        await this.actions.assertVisible(this.cartPage.checkoutError);
        const errorText = await this.actions.getElementText(this.cartPage.checkoutError);
        if (!errorText.includes(expectedError)) {
            throw new Error(`Expected error "${expectedError}" but got "${errorText}"`);
        }
        console.log(`✓ Checkout error verified: ${expectedError}`);
    }

    async addProductAndOpenCart(): Promise<void> {
        await this.actions.click(this.productPage.addBackpack);
        await this.actions.click(this.cartPage.cartIcon);
        await this.actions.wait(1);
    }

    async clickContinueShopping(): Promise<void> {
        await this.actions.click(this.cartPage.continueShoppingButton);
        await this.actions.wait(1);
    }

    async addProductAndProceedToOverview(): Promise<void> {
        await this.actions.click(this.productPage.addBackpack);
        await this.actions.click(this.cartPage.cartIcon);
        await this.actions.click(this.cartPage.checkoutButton);
        await this.actions.type(this.cartPage.firstNameInput, FileUtils.getProperty('firstName'));
        await this.actions.type(this.cartPage.lastNameInput, FileUtils.getProperty('lastName'));
        await this.actions.type(this.cartPage.postalCodeInput, FileUtils.getProperty('zipCode'));
        await this.actions.click(this.cartPage.continueButton);
        await this.actions.wait(1);
    }

    async verifyPaymentInformationDisplayed(): Promise<void> {
        await this.actions.assertVisible(this.cartPage.paymentInfo);
        console.log('✓ Payment information is displayed');
    }

    async verifyShippingInformationDisplayed(): Promise<void> {
        await this.actions.assertVisible(this.cartPage.shippingInfo);
        console.log('✓ Shipping information is displayed');
    }

    async verifyTotalPriceDisplayed(): Promise<void> {
        await this.actions.assertVisible(this.cartPage.totalPrice);
        const total = await this.actions.getElementText(this.cartPage.totalPrice);
        console.log(`✓ Total price displayed: ${total}`);
    }

    async clickCancelOnOverviewPage(): Promise<void> {
        await this.actions.click(this.cartPage.cancelButton);
        await this.actions.wait(1);
    }
}
