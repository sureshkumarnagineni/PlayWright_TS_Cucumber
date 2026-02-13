import { When, Then } from '@cucumber/cucumber';
import { FilterModule } from '../modules/FilterModule';

let filterMod: FilterModule;

When('User applies price range filter', async function () {
    filterMod = new FilterModule(this.page);
    await filterMod.applyPriceFilter();
});

When('User sorts products by price ascending', async function () {
    if (!filterMod) filterMod = new FilterModule(this.page);
    await filterMod.sortByPriceAscending();
});

Then('User verifies filtered products are within price range', async function () {
    if (!filterMod) filterMod = new FilterModule(this.page);
    await filterMod.verifyFilteredProductsInPriceRange();
});
