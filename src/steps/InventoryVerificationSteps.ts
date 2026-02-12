import { When, Then } from '@cucumber/cucumber';
import { InventoryModule } from '../modules/InventoryModule';

let inventoryMod: InventoryModule;

When('User navigates to inventory', async function () {
    inventoryMod = new InventoryModule(this.page);
    await inventoryMod.checkInventory();
});

When('User checks product availability', async function () {
    await inventoryMod.checkProductAvailability();
});

Then('User verifies all products have inventory status', async function () {
    await inventoryMod.verifyProductInventoryStatus();
});
