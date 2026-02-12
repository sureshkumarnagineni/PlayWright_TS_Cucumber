import { PlaywrightActions } from '../actions/PlaywrightActions';
import { CartPage } from '../pages/CartPage';

export class CartModule {
    private actions: PlaywrightActions;
    private cartPage = new CartPage();
    private cartItems = ['#add-to-cart-sauce-labs-backpack', '#add-to-cart-sauce-labs-bike-light', '#add-to-cart-sauce-labs-bolt-t-shirt'];

    constructor(page: any) { 
        this.actions = new PlaywrightActions(page); 
    }

    async addMultipleProducts() {
        for (let item of this.cartItems) {
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
}
