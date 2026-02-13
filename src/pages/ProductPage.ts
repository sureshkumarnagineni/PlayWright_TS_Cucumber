export class ProductPage {
    // Filters and sorting
    readonly filterDropdown = '.product_sort_container';
    readonly sortNameAsc = 'Name (A to Z)';
    readonly sortNameDesc = 'Name (Z to A)';
    readonly sortPriceAsc = 'Price (low to high)';
    readonly sortPriceDesc = 'Price (high to low)';

    // Product elements
    readonly productPrice = '.inventory_item_price';
    readonly productName = '.inventory_item_name';
    readonly productImage = '.inventory_item_img';
    readonly addToCartButton = '.btn_inventory';
    readonly inventoryItem = '.inventory_item';
    readonly inventoryList = '.inventory_list';

    // Individual product add buttons
    readonly addBackpack = '#add-to-cart-sauce-labs-backpack';
    readonly addBikeLight = '#add-to-cart-sauce-labs-bike-light';
    readonly addBoltTShirt = '#add-to-cart-sauce-labs-bolt-t-shirt';
    readonly addFleeceJacket = '#add-to-cart-sauce-labs-fleece-jacket';
    readonly addOnesie = '#add-to-cart-sauce-labs-onesie';
    readonly addRedTShirt = '#add-to-cart-test.allthethings()-t-shirt-(red)';

    // All product buttons (for bulk operations)
    readonly allProductButtons = [
        '#add-to-cart-sauce-labs-backpack',
        '#add-to-cart-sauce-labs-bike-light',
        '#add-to-cart-sauce-labs-bolt-t-shirt',
        '#add-to-cart-sauce-labs-fleece-jacket',
        '#add-to-cart-sauce-labs-onesie',
        '#add-to-cart-test.allthethings()-t-shirt-(red)'
    ];

    // Multiple products for testing (first 3)
    readonly multipleProducts = [
        '#add-to-cart-sauce-labs-backpack',
        '#add-to-cart-sauce-labs-bike-light',
        '#add-to-cart-sauce-labs-bolt-t-shirt'
    ];
}
