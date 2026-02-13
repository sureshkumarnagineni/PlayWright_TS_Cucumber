import { When, Then } from '@cucumber/cucumber';
import { CartModule } from '../modules/CartModule';

let cartMod: CartModule;

When('User opens cart without adding products', async function () {
    cartMod = new CartModule(this.page);
    await cartMod.openCartWithoutAdding();
});

Then('User verifies cart is empty', async function () {
    await cartMod.verifyCartIsEmpty();
});

When('User adds single product to cart', async function () {
    cartMod = new CartModule(this.page);
    await cartMod.addSingleProduct();
});

When('User opens cart', async function () {
    if (!cartMod) cartMod = new CartModule(this.page);
    await cartMod.openCart();
});

Then('User verifies cart contains {string} item', async function (count: string) {
    if (!cartMod) cartMod = new CartModule(this.page);
    await cartMod.verifyCartContainsItems(count);
});

When('User removes all products from cart', async function () {
    if (!cartMod) cartMod = new CartModule(this.page);
    await cartMod.removeAllProductsFromCart();
});

When('User adds product to cart', async function () {
    cartMod = new CartModule(this.page);
    await cartMod.addProduct();
});

When('User navigates to another page and back', async function () {
    if (!cartMod) cartMod = new CartModule(this.page);
    await cartMod.navigateToAnotherPageAndBack();
});

Then('User verifies cart badge still shows {string}', async function (count: string) {
    if (!cartMod) cartMod = new CartModule(this.page);
    await cartMod.verifyCartBadgeShows(count);
});

When('User adds specific product {string} to cart', async function (productName: string) {
    cartMod = new CartModule(this.page);
    await cartMod.addSpecificProduct(productName);
});

Then('User verifies cart item name is {string}', async function (productName: string) {
    if (!cartMod) cartMod = new CartModule(this.page);
    await cartMod.verifyCartItemName(productName);
});

Then('User verifies cart item quantity is {string}', async function (quantity: string) {
    if (!cartMod) cartMod = new CartModule(this.page);
    await cartMod.verifyCartItemQuantity(quantity);
});

Then('User verifies cart item price is displayed', async function () {
    if (!cartMod) cartMod = new CartModule(this.page);
    await cartMod.verifyCartItemPriceDisplayed();
});

When('User removes specific product by name', async function () {
    if (!cartMod) cartMod = new CartModule(this.page);
    await cartMod.removeSpecificProductByName();
});

Then('User verifies product is removed from cart', async function () {
    if (!cartMod) cartMod = new CartModule(this.page);
    await cartMod.verifyProductRemovedFromCart();
});
