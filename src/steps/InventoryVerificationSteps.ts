import { When, Then } from '@cucumber/cucumber';
import { InventoryModule } from '../modules/InventoryModule';

let inventoryMod: InventoryModule;

When('User navigates to inventory', async function () {
    inventoryMod = new InventoryModule(this.page);
    await inventoryMod.checkInventory();
});

When('User checks product availability', async function () {
    const details = await inventoryMod.getProductDetails();
    console.log(`Checking availability for: ${details.name}`);
    console.log(`Total products available: ${details.count}`);
});

Then('User verifies all products have inventory status', async function () {
    const result = await inventoryMod.verifyAllProductsAvailable();
    if (!result) {
        throw new Error('Failed to verify product inventory status');
    }
});
