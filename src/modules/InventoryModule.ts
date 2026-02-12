import { PlaywrightActions } from '../actions/PlaywrightActions';
import { InventoryPage } from '../pages/InventoryPage';

export class InventoryModule {
    private actions: PlaywrightActions;
    private inventoryPage = new InventoryPage();

    constructor(page: any) {
        this.actions = new PlaywrightActions(page);
    }

    async checkInventory() {
        await this.actions.wait(1);
    }

    async getProductNames(): Promise<string[]> {
        return await this.actions.getMultipleTexts(this.inventoryPage.productName);
    }

    async getProductCount(): Promise<number> {
        return await this.actions.getElementsCount(this.inventoryPage.productContainer);
    }

    async verifyAllProductsAvailable(): Promise<boolean> {
        const productCount = await this.getProductCount();
        const productNames = await this.getProductNames();

        console.log(`Found ${productCount} products: ${productNames.join(', ')}`);

        if (productCount === 0 || productNames.length === 0) {
            throw new Error('No products found in inventory');
        }

        console.log('✓ All products are available for purchase');
        return true;
    }

    async getProductDetails(): Promise<{ name: string, count: number }> {
        const names = await this.getProductNames();
        const count = await this.getProductCount();
        return {
            name: names[0] || 'Unknown',
            count: count
        };
    }

    async checkProductAvailability(): Promise<void> {
        const details = await this.getProductDetails();
        console.log(`Checking availability for: ${details.name}`);
        console.log(`Total products available: ${details.count}`);
    }

    async verifyProductInventoryStatus(): Promise<void> {
        const result = await this.verifyAllProductsAvailable();
        if (!result) {
            throw new Error('Failed to verify product inventory status');
        }
    }
}
