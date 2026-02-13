import { When, Then } from '@cucumber/cucumber';
import { SortModule } from '../modules/SortModule';

let sortMod: SortModule;

When('User sorts products by {string}', async function (sortOption: string) {
    sortMod = new SortModule(this.page);
    await sortMod.sortProductsByOption(sortOption);
});

Then('User verifies products are sorted alphabetically A to Z', async function () {
    if (!sortMod) sortMod = new SortModule(this.page);
    await sortMod.verifyProductsSortedAlphabeticallyAtoZ();
});

Then('User verifies products are sorted alphabetically Z to A', async function () {
    if (!sortMod) sortMod = new SortModule(this.page);
    await sortMod.verifyProductsSortedAlphabeticallyZtoA();
});

Then('User verifies products are sorted by price ascending', async function () {
    if (!sortMod) sortMod = new SortModule(this.page);
    await sortMod.verifyProductsSortedByPriceAscending();
});

Then('User verifies products are sorted by price descending', async function () {
    if (!sortMod) sortMod = new SortModule(this.page);
    await sortMod.verifyProductsSortedByPriceDescending();
});

Then('User verifies default product sorting is active', async function () {
    sortMod = new SortModule(this.page);
    await sortMod.verifyDefaultSorting();
});
