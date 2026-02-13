import { When, Then } from '@cucumber/cucumber';
import { CheckoutModule } from '../modules/CheckoutModule';

let checkoutMod: CheckoutModule;

When('User adds product to cart and navigates to checkout', async function () {
    checkoutMod = new CheckoutModule(this.page);
    await checkoutMod.addProductAndNavigateToCheckout();
});

When('User clicks cancel on checkout page', async function () {
    if (!checkoutMod) checkoutMod = new CheckoutModule(this.page);
    await checkoutMod.clickCancelOnCheckoutPage();
});

When('User enters checkout info with empty first name', async function () {
    if (!checkoutMod) checkoutMod = new CheckoutModule(this.page);
    await checkoutMod.enterCheckoutInfoWithoutFirstName();
});

When('User enters checkout info with empty last name', async function () {
    if (!checkoutMod) checkoutMod = new CheckoutModule(this.page);
    await checkoutMod.enterCheckoutInfoWithoutLastName();
});

When('User enters checkout info with empty postal code', async function () {
    if (!checkoutMod) checkoutMod = new CheckoutModule(this.page);
    await checkoutMod.enterCheckoutInfoWithoutPostalCode();
});

Then('User verifies checkout error {string}', async function (errorMessage: string) {
    if (!checkoutMod) checkoutMod = new CheckoutModule(this.page);
    await checkoutMod.verifyCheckoutError(errorMessage);
});

When('User adds product to cart and opens cart', async function () {
    checkoutMod = new CheckoutModule(this.page);
    await checkoutMod.addProductAndOpenCart();
});

When('User clicks continue shopping', async function () {
    if (!checkoutMod) checkoutMod = new CheckoutModule(this.page);
    await checkoutMod.clickContinueShopping();
});

When('User adds product to cart and proceeds to overview', async function () {
    checkoutMod = new CheckoutModule(this.page);
    await checkoutMod.addProductAndProceedToOverview();
});

Then('User verifies payment information is displayed', async function () {
    if (!checkoutMod) checkoutMod = new CheckoutModule(this.page);
    await checkoutMod.verifyPaymentInformationDisplayed();
});

Then('User verifies shipping information is displayed', async function () {
    if (!checkoutMod) checkoutMod = new CheckoutModule(this.page);
    await checkoutMod.verifyShippingInformationDisplayed();
});

Then('User verifies total price is displayed', async function () {
    if (!checkoutMod) checkoutMod = new CheckoutModule(this.page);
    await checkoutMod.verifyTotalPriceDisplayed();
});

When('User clicks cancel on overview page', async function () {
    if (!checkoutMod) checkoutMod = new CheckoutModule(this.page);
    await checkoutMod.clickCancelOnOverviewPage();
});
