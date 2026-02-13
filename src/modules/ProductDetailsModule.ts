import { PlaywrightActions } from '../actions/PlaywrightActions';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { ProductPage } from '../pages/ProductPage';

export class ProductDetailsModule {
    private actions: PlaywrightActions;
    private productDetailsPage = new ProductDetailsPage();
    private productPage = new ProductPage();

    constructor(page: any) {
        this.actions = new PlaywrightActions(page);
    }

    async clickOnFirstProduct(): Promise<void> {
        const products = await this.actions.getElementsBySelector(this.productPage.productName);
        if (products.length > 0) {
            await products[0].click();
            await this.actions.wait(1);
        }
    }

    async verifyProductDetailsPage(): Promise<void> {
        await this.actions.assertVisible(this.productDetailsPage.productName);
        await this.actions.assertVisible(this.productDetailsPage.backToProductsButton);
        console.log('✓ Product details page is displayed');
    }

    async verifyProductNameVisible(): Promise<void> {
        await this.actions.assertVisible(this.productDetailsPage.productName);
        const name = await this.actions.getElementText(this.productDetailsPage.productName);
        console.log(`✓ Product name visible: ${name}`);
    }

    async verifyProductDescriptionVisible(): Promise<void> {
        await this.actions.assertVisible(this.productDetailsPage.productDescription);
        console.log('✓ Product description is visible');
    }

    async verifyProductPriceVisible(): Promise<void> {
        await this.actions.assertVisible(this.productDetailsPage.productPrice);
        const price = await this.actions.getElementText(this.productDetailsPage.productPrice);
        console.log(`✓ Product price visible: ${price}`);
    }

    async addProductFromDetailsPage(): Promise<void> {
        await this.actions.click(this.productDetailsPage.addToCartButton);
        await this.actions.wait(1);
        console.log('✓ Product added from details page');
    }

    async removeProductFromDetailsPage(): Promise<void> {
        await this.actions.click(this.productDetailsPage.removeButton);
        await this.actions.wait(1);
        console.log('✓ Product removed from details page');
    }

    async verifyCartBadge(expectedCount: string): Promise<void> {
        const badgeText = await this.actions.getElementText(this.productDetailsPage.cartBadge);
        if (badgeText !== expectedCount) {
            throw new Error(`Expected cart badge to show "${expectedCount}" but got "${badgeText}"`);
        }
        console.log(`✓ Cart badge shows: ${expectedCount}`);
    }

    async verifyCartBadgeNotVisible(): Promise<void> {
        const isVisible = await this.actions.isElementVisible(this.productDetailsPage.cartBadge);
        if (isVisible) {
            throw new Error('Cart badge should not be visible but it is');
        }
        console.log('✓ Cart badge is not visible');
    }

    async clickBackToProducts(): Promise<void> {
        await this.actions.click(this.productDetailsPage.backToProductsButton);
        await this.actions.wait(1);
    }

    async verifyProductsPageDisplayed(): Promise<void> {
        await this.actions.assertVisible(this.productPage.inventoryList);
        console.log('✓ Products page is displayed');
    }

    async addAllProductsToCart(): Promise<void> {
        for (const buttonSelector of this.productPage.allProductButtons) {
            await this.actions.click(buttonSelector);
            await this.actions.wait(0.5);
        }
        console.log('✓ All products added to cart');
    }
}
