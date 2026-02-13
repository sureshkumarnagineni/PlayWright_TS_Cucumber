import { PlaywrightActions } from '../actions/PlaywrightActions';
import { CartPage } from '../pages/CartPage';
import { ProductPage } from '../pages/ProductPage';
import { FileUtils } from '../utils/FileUtils';

export class PurchaseModule {
  private actions: PlaywrightActions;
  private cartPage = new CartPage();
  private productPage = new ProductPage();

  constructor(page: any) {
    this.actions = new PlaywrightActions(page);
  }

  async launchApplication() {
    const url = FileUtils.getProperty('url');
    await this.actions.goto(url);
    this.actions.wait(5);
  }

  async addProductAndCompleteCheckout() {
    await this.actions.click(this.productPage.addBackpack);
    await this.actions.click(this.cartPage.cartIcon);
    await this.actions.click(this.cartPage.checkoutButton);
    await this.actions.type(this.cartPage.firstNameInput, FileUtils.getProperty('firstName'));
    await this.actions.type(this.cartPage.lastNameInput, FileUtils.getProperty('lastName'));
    await this.actions.type(this.cartPage.postalCodeInput, FileUtils.getProperty('zipCode'));
    await this.actions.click(this.cartPage.continueButton);
    await this.actions.click(this.cartPage.finishButton);
  }

  async verifyOrderConfirmation(expectedMessage: string) {
    await this.actions.assertVisible(this.cartPage.completeHeader);
    await this.actions.softAssertText(this.cartPage.completeHeader, expectedMessage);
    this.actions.assertAll();
  }
}
