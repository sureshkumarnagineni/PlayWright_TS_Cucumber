import { PlaywrightActions } from '../actions/PlaywrightActions';
import { CartPage } from '../pages/CartPage';

export class CartModule {
    private actions: PlaywrightActions;
    private cartPage = new CartPage();

    constructor(page: any) {
        this.actions = new PlaywrightActions(page);
    }

    async addMultipleProducts() {
        for (let item of this.cartPage.multipleProducts) {
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
}
