export class CartPage {
    readonly cartIcon = '.shopping_cart_link';
    readonly cartItems = '.cart_item';
    readonly itemCount = '.shopping_cart_badge';
    readonly removeButton = '.item_pricebar button';
    readonly cartTable = '.cart_list';

    // Checkout locators
    readonly checkoutButton = '#checkout';
    readonly continueShoppingButton = '#continue-shopping';
    readonly firstNameInput = '#first-name';
    readonly lastNameInput = '#last-name';
    readonly postalCodeInput = '#postal-code';
    readonly continueButton = '#continue';
    readonly finishButton = '#finish';
    readonly cancelButton = '#cancel';

    // Confirmation locators
    readonly completeHeader = '.complete-header';
    readonly completeText = '.complete-text';

    // Cart item details
    readonly cartItemName = '.inventory_item_name';
    readonly cartItemPrice = '.inventory_item_price';
    readonly cartQuantity = '.cart_quantity';

    // Checkout error
    readonly checkoutError = '[data-test="error"]';

    // Overview page
    readonly paymentInfo = '.summary_value_label:nth-of-type(2)';
    readonly shippingInfo = '.summary_value_label:nth-of-type(4)';
    readonly totalPrice = '.summary_total_label';
    readonly subtotal = '.summary_subtotal_label';
    readonly tax = '.summary_tax_label';
}
