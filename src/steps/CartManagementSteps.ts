import { When, Then } from '@cucumber/cucumber';
import { CartModule } from '../modules/CartModule';

let cartMod: CartModule;

When('User adds multiple products to cart', async function () {
    cartMod = new CartModule(this.page);
    await cartMod.addMultipleProducts();
});

When('User verifies cart item count', async function () {
    if (!cartMod) cartMod = new CartModule(this.page);
    await cartMod.verifyCartItemCount();
});

When('User removes a product from cart', async function () {
    if (!cartMod) cartMod = new CartModule(this.page);
    await cartMod.removeFirstProduct();
});

Then('User verifies updated cart count', async function () {
    if (!cartMod) cartMod = new CartModule(this.page);
    await cartMod.verifyUpdatedCartCount();
});
