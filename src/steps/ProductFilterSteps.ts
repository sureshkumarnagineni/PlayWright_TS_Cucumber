import { When, Then } from '@cucumber/cucumber';
import { ProductModule } from '../modules/ProductModule';

let productMod: ProductModule;

When('User filters products by low to high price', async function () {
    productMod = new ProductModule(this.page);
    await productMod.filterByPriceAscending();
});

Then('User verifies first product is cheaper than last product', async function () {
    if (!productMod) productMod = new ProductModule(this.page);
    await productMod.verifyPriceOrder();
});
