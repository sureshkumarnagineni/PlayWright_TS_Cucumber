import { PlaywrightActions } from '../actions/PlaywrightActions';
import { ProductPage } from '../pages/ProductPage';

export class ProductModule {
    private actions: PlaywrightActions;
    private productPage = new ProductPage();

    constructor(page: any) {
        this.actions = new PlaywrightActions(page);
    }

    async filterByPriceAscending() {
        await this.actions.click(this.productPage.filterDropdown);
        await this.actions.selectOptionByText(this.productPage.filterDropdown, this.productPage.sortPriceAsc);
        await this.actions.wait(2);
    }

    async getPrices(): Promise<string[]> {
        return await this.actions.getMultipleTexts(this.productPage.productPrice);
    }

    async getFirstAndLastPrice(): Promise<{ first: number, last: number }> {
        const prices = await this.getPrices();
        return {
            first: parseFloat(prices[0].replace('$', '')),
            last: parseFloat(prices[prices.length - 1].replace('$', ''))
        };
    }

    async verifyPriceOrder(): Promise<void> {
        const prices = await this.getFirstAndLastPrice();
        console.log(`First Product: $${prices.first}, Last Product: $${prices.last}`);

        if (prices.first > prices.last) {
            throw new Error(`Expected first price ($${prices.first}) to be less than last price ($${prices.last})`);
        }
        console.log('✓ Price filter verification passed!');
    }
}
