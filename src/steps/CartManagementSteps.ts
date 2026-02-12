import { When, Then } from '@cucumber/cucumber';
import { CartModule } from '../modules/CartModule';

let cartMod: CartModule;

When('User adds multiple products to cart', async function () {
    cartMod = new CartModule(this.page);
    await cartMod.addMultipleProducts();
});

When('User verifies cart item count', async function () {
    await cartMod.openCart();
    const count = await cartMod.getCartItemsCount();
    console.log(`Cart contains ${count} items`);
    if (count < 3) {
        throw new Error(`Expected at least 3 items in cart, but found ${count}`);
    }
});

When('User removes a product from cart', async function () {
    await cartMod.removeFirstProduct();
    await cartMod.openCart();
});

Then('User verifies updated cart count', async function () {
    const updatedCount = await cartMod.getCartItemsCount();
    console.log(`Updated cart count: ${updatedCount}`);
    if (updatedCount >= 3) {
        throw new Error(`Expected cart to have fewer items after removal, but found ${updatedCount}`);
    }
});
