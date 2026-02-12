import { PlaywrightActions } from '../actions/PlaywrightActions';
import { FilterPage } from '../pages/FilterPage';

export class FilterModule {
    private actions: PlaywrightActions;
    private filterPage = new FilterPage();

    constructor(page: any) { 
        this.actions = new PlaywrightActions(page); 
    }

    async applyPriceFilter() {
        // Sort by price ascending
        await this.actions.selectOptionByText(this.filterPage.sortDropdown, 'Price (low to high)');
        await this.actions.wait(2);
    }

    async sortByPriceAscending() {
        await this.actions.selectOptionByText(this.filterPage.sortDropdown, 'Price (low to high)');
        await this.actions.wait(1);
    }

    async verifyProductsSortedByPrice(): Promise<boolean> {
        const prices = await this.actions.getMultipleTexts(this.filterPage.productPrices);
        const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
        
        console.log(`Product prices in order: ${numericPrices.join(', ')}`);
        
        // Verify prices are sorted in ascending order
        for (let i = 0; i < numericPrices.length - 1; i++) {
            if (numericPrices[i] > numericPrices[i + 1]) {
                console.log(`Price sorting failed: ${numericPrices[i]} > ${numericPrices[i + 1]}`);
                return false;
            }
        }
        console.log('✓ All products are correctly sorted by price (low to high)');
        return true;
    }

    async getProductCount(): Promise<number> {
        return await this.actions.getElementsCount('.inventory_item');
    }
}
