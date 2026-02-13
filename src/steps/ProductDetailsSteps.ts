import { When, Then } from '@cucumber/cucumber';
import { ProductDetailsModule } from '../modules/ProductDetailsModule';

let productDetailsMod: ProductDetailsModule;

When('User clicks on first product', async function () {
    productDetailsMod = new ProductDetailsModule(this.page);
    await productDetailsMod.clickOnFirstProduct();
});

Then('User verifies product details page is displayed', async function () {
    if (!productDetailsMod) productDetailsMod = new ProductDetailsModule(this.page);
    await productDetailsMod.verifyProductDetailsPage();
});

Then('User verifies product name is visible', async function () {
    if (!productDetailsMod) productDetailsMod = new ProductDetailsModule(this.page);
    await productDetailsMod.verifyProductNameVisible();
});

Then('User verifies product description is visible', async function () {
    if (!productDetailsMod) productDetailsMod = new ProductDetailsModule(this.page);
    await productDetailsMod.verifyProductDescriptionVisible();
});

Then('User verifies product price is visible', async function () {
    if (!productDetailsMod) productDetailsMod = new ProductDetailsModule(this.page);
    await productDetailsMod.verifyProductPriceVisible();
});

When('User adds product from details page', async function () {
    if (!productDetailsMod) productDetailsMod = new ProductDetailsModule(this.page);
    await productDetailsMod.addProductFromDetailsPage();
});

Then('User verifies cart badge shows {string}', async function (count: string) {
    if (!productDetailsMod) productDetailsMod = new ProductDetailsModule(this.page);
    await productDetailsMod.verifyCartBadge(count);
});

When('User removes product from details page', async function () {
    if (!productDetailsMod) productDetailsMod = new ProductDetailsModule(this.page);
    await productDetailsMod.removeProductFromDetailsPage();
});

Then('User verifies cart badge is not visible', async function () {
    if (!productDetailsMod) productDetailsMod = new ProductDetailsModule(this.page);
    await productDetailsMod.verifyCartBadgeNotVisible();
});

When('User clicks back to products button', async function () {
    if (!productDetailsMod) productDetailsMod = new ProductDetailsModule(this.page);
    await productDetailsMod.clickBackToProducts();
});

Then('User verifies products page is displayed', async function () {
    if (!productDetailsMod) productDetailsMod = new ProductDetailsModule(this.page);
    await productDetailsMod.verifyProductsPageDisplayed();
});

When('User adds all products to cart', async function () {
    if (!productDetailsMod) productDetailsMod = new ProductDetailsModule(this.page);
    await productDetailsMod.addAllProductsToCart();
});
