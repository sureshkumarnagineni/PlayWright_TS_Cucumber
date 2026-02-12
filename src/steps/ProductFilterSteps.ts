import { When, Then } from '@cucumber/cucumber';
import { ProductModule } from '../modules/ProductModule';

let productMod: ProductModule;

When('User filters products by low to high price', async function () {
    productMod = new ProductModule(this.page);
    await productMod.filterByPriceAscending();
});

Then('User verifies first product is cheaper than last product', async function () {
    const prices = await productMod.getFirstAndLastPrice();
    console.log(`First Product: $${prices.first}, Last Product: $${prices.last}`);
    
    try {
        if (prices.first > prices.last) {
            throw new Error(`Expected first price ($${prices.first}) to be less than last price ($${prices.last})`);
        }
        console.log('✓ Price filter verification passed!');
    } catch (error: any) {
        throw new Error(error.message);
    }
});
