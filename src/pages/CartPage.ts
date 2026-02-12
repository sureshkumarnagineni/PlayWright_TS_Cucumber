export class CartPage {
    readonly cartIcon = '.shopping_cart_link';
    readonly cartItems = '.cart_item';
    readonly itemCount = '.shopping_cart_badge';
    readonly removeButton = '.item_pricebar button';
    readonly cartTable = '.cart_list';

    // Product locators - Add to cart buttons
    readonly addToCartBackpack = '#add-to-cart-sauce-labs-backpack';
    readonly addToCartBikeLight = '#add-to-cart-sauce-labs-bike-light';
    readonly addToCartBoltTShirt = '#add-to-cart-sauce-labs-bolt-t-shirt';

    // Multiple products array
    readonly multipleProducts = [
        '#add-to-cart-sauce-labs-backpack',
        '#add-to-cart-sauce-labs-bike-light',
        '#add-to-cart-sauce-labs-bolt-t-shirt'
    ];

    // Checkout locators
    readonly checkoutButton = '#checkout';
    readonly firstNameInput = '#first-name';
    readonly lastNameInput = '#last-name';
    readonly postalCodeInput = '#postal-code';
    readonly continueButton = '#continue';
    readonly finishButton = '#finish';

    // Confirmation locators
    readonly completeHeader = '.complete-header';
}
