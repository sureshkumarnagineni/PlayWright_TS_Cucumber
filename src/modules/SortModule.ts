import { PlaywrightActions } from '../actions/PlaywrightActions';
import { FilterPage } from '../pages/FilterPage';

export class SortModule {
    private actions: PlaywrightActions;
    private filterPage = new FilterPage();

    constructor(page: any) {
        this.actions = new PlaywrightActions(page);
    }

    async sortProductsByOption(option: string): Promise<void> {
        await this.actions.selectOptionByText(this.filterPage.sortDropdown, option);
        await this.actions.wait(1);
        console.log(`✓ Products sorted by: ${option}`);
    }

    async verifyProductsSortedAlphabeticallyAtoZ(): Promise<void> {
        const names = await this.actions.getMultipleTexts(this.filterPage.productNames);
        const sortedNames = [...names].sort((a, b) => a.localeCompare(b));

        for (let i = 0; i < names.length; i++) {
            if (names[i] !== sortedNames[i]) {
                throw new Error(`Products not sorted A-Z. Expected "${sortedNames[i]}" but got "${names[i]}" at position ${i}`);
            }
        }
        console.log('✓ Products are correctly sorted alphabetically A to Z');
    }

    async verifyProductsSortedAlphabeticallyZtoA(): Promise<void> {
        const names = await this.actions.getMultipleTexts(this.filterPage.productNames);
        const sortedNames = [...names].sort((a, b) => b.localeCompare(a));

        for (let i = 0; i < names.length; i++) {
            if (names[i] !== sortedNames[i]) {
                throw new Error(`Products not sorted Z-A. Expected "${sortedNames[i]}" but got "${names[i]}" at position ${i}`);
            }
        }
        console.log('✓ Products are correctly sorted alphabetically Z to A');
    }

    async verifyProductsSortedByPriceAscending(): Promise<void> {
        const prices = await this.actions.getMultipleTexts(this.filterPage.productPrices);
        const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));

        for (let i = 0; i < numericPrices.length - 1; i++) {
            if (numericPrices[i] > numericPrices[i + 1]) {
                throw new Error(`Prices not sorted ascending. ${numericPrices[i]} > ${numericPrices[i + 1]} at position ${i}`);
            }
        }
        console.log('✓ Products are correctly sorted by price (low to high)');
    }

    async verifyProductsSortedByPriceDescending(): Promise<void> {
        const prices = await this.actions.getMultipleTexts(this.filterPage.productPrices);
        const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));

        for (let i = 0; i < numericPrices.length - 1; i++) {
            if (numericPrices[i] < numericPrices[i + 1]) {
                throw new Error(`Prices not sorted descending. ${numericPrices[i]} < ${numericPrices[i + 1]} at position ${i}`);
            }
        }
        console.log('✓ Products are correctly sorted by price (high to low)');
    }

    async verifyDefaultSorting(): Promise<void> {
        const selectedOption = await this.actions.getSelectedOptionText(this.filterPage.sortDropdown);
        console.log(`✓ Default sorting is: ${selectedOption}`);
    }
}
