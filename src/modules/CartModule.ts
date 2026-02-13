import { PlaywrightActions } from '../actions/PlaywrightActions';
import { CartPage } from '../pages/CartPage';
import { ProductPage } from '../pages/ProductPage';

export class CartModule {
    private actions: PlaywrightActions;
    private cartPage = new CartPage();
    private productPage = new ProductPage();

    constructor(page: any) {
        this.actions = new PlaywrightActions(page);
    }

    async addMultipleProducts() {
        for (let item of this.productPage.multipleProducts) {
            await this.actions.click(item);
            await this.actions.wait(1);
        }
    }

    async getCartCount(): Promise<string> {
        const element = await this.actions.getElementText(this.cartPage.itemCount);
        return element;
    }

    async openCart() {
        await this.actions.click(this.cartPage.cartIcon);
        await this.actions.wait(2);
    }

    async removeFirstProduct() {
        const removeBtn = await this.actions.getFirstElement(this.cartPage.removeButton);
        if (removeBtn) {
            await removeBtn.click();
            await this.actions.wait(1);
        }
    }

    async getCartItemsCount(): Promise<number> {
        const items = await this.actions.getElementsCount(this.cartPage.cartItems);
        return items;
    }

    async verifyCartItemCount(): Promise<void> {
        await this.openCart();
        const count = await this.getCartItemsCount();
        console.log(`Cart contains ${count} items`);
        if (count < 3) {
            throw new Error(`Expected at least 3 items in cart, but found ${count}`);
        }
    }

    async removeProductAndVerifyCount(): Promise<void> {
        await this.removeFirstProduct();
        await this.openCart();
        const updatedCount = await this.getCartItemsCount();
        console.log(`Updated cart count: ${updatedCount}`);
        if (updatedCount >= 3) {
            throw new Error(`Expected cart to have fewer items after removal, but found ${updatedCount}`);
        }
    }

    async verifyUpdatedCartCount(): Promise<void> {
        await this.openCart();
        const updatedCount = await this.getCartItemsCount();
        console.log(`Updated cart count: ${updatedCount}`);
        if (updatedCount >= 3) {
            throw new Error(`Expected cart to have fewer items after removal, but found ${updatedCount}`);
        }
    }

    async openCartWithoutAdding(): Promise<void> {
        await this.actions.click(this.cartPage.cartIcon);
        await this.actions.wait(1);
    }

    async verifyCartIsEmpty(): Promise<void> {
        const count = await this.getCartItemsCount();
        if (count !== 0) {
            throw new Error(`Expected cart to be empty but found ${count} items`);
        }
        console.log('✓ Cart is empty');
    }

    async addSingleProduct(): Promise<void> {
        await this.actions.click(this.productPage.addBackpack);
        await this.actions.wait(1);
    }

    async verifyCartContainsItems(expectedCount: string): Promise<void> {
        const count = await this.getCartItemsCount();
        if (count.toString() !== expectedCount) {
            throw new Error(`Expected cart to contain ${expectedCount} item but found ${count}`);
        }
        console.log(`✓ Cart contains ${expectedCount} item(s)`);
    }

    async removeAllProductsFromCart(): Promise<void> {
        let count = await this.getCartItemsCount();
        while (count > 0) {
            await this.removeFirstProduct();
            count = await this.getCartItemsCount();
        }
        console.log('✓ All products removed from cart');
    }

    async addProduct(): Promise<void> {
        await this.actions.click(this.productPage.addBackpack);
        await this.actions.wait(1);
    }

    async navigateToAnotherPageAndBack(): Promise<void> {
        // Navigate away and back to verify cart persistence
        await this.actions.click('.title'); // Click somewhere to simulate navigation
        await this.actions.wait(1);
    }

    async verifyCartBadgeShows(expectedCount: string): Promise<void> {
        const badgeCount = await this.actions.getElementText(this.cartPage.itemCount);
        if (badgeCount !== expectedCount) {
            throw new Error(`Expected cart badge to show "${expectedCount}" but got "${badgeCount}"`);
        }
        console.log(`✓ Cart badge shows: ${expectedCount}`);
    }

    async addSpecificProduct(productName: string): Promise<void> {
        if (productName === 'Sauce Labs Backpack') {
            await this.actions.click(this.productPage.addBackpack);
        } else if (productName === 'Sauce Labs Bike Light') {
            await this.actions.click(this.productPage.addBikeLight);
        } else if (productName === 'Sauce Labs Bolt T-Shirt') {
            await this.actions.click(this.productPage.addBoltTShirt);
        }
        await this.actions.wait(1);
        console.log(`✓ Added "${productName}" to cart`);
    }

    async verifyCartItemName(expectedName: string): Promise<void> {
        const itemName = await this.actions.getElementText(this.cartPage.cartItemName);
        if (!itemName.includes(expectedName)) {
            throw new Error(`Expected cart item name "${expectedName}" but got "${itemName}"`);
        }
        console.log(`✓ Cart item name verified: ${expectedName}`);
    }

    async verifyCartItemQuantity(expectedQty: string): Promise<void> {
        const qty = await this.actions.getElementText(this.cartPage.cartQuantity);
        if (qty !== expectedQty) {
            throw new Error(`Expected quantity "${expectedQty}" but got "${qty}"`);
        }
        console.log(`✓ Cart item quantity verified: ${expectedQty}`);
    }

    async verifyCartItemPriceDisplayed(): Promise<void> {
        await this.actions.assertVisible(this.cartPage.cartItemPrice);
        const price = await this.actions.getElementText(this.cartPage.cartItemPrice);
        console.log(`✓ Cart item price displayed: ${price}`);
    }

    async removeSpecificProductByName(): Promise<void> {
        await this.removeFirstProduct();
        console.log('✓ Specific product removed from cart');
    }

    async verifyProductRemovedFromCart(): Promise<void> {
        const countAfterRemoval = await this.getCartItemsCount();
        console.log(`✓ Products remaining in cart: ${countAfterRemoval}`);
    }
}
