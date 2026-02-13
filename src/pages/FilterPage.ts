export class FilterPage {
    // Filter-specific elements
    readonly priceFilter = '.price_range_filter';
    readonly filterButton = '.filter_apply';

    // Shared elements (use ProductPage for these in modules)
    readonly sortDropdown = '.product_sort_container';
    readonly productList = '.inventory_list';
    readonly productPrices = '.inventory_item_price';
    readonly inventoryItem = '.inventory_item';
    readonly productNames = '.inventory_item_name';
}
