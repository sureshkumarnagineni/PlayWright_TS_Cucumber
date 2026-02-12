export class FilterPage {
    readonly priceFilter = '.price_range_filter';
    readonly filterButton = '.filter_apply';
    readonly sortDropdown = '.product_sort_container';
    readonly productList = '.inventory_list';
    readonly productPrices = '.inventory_item_price';
    readonly inventoryItem = '.inventory_item';

    // Filter options
    readonly priceAscendingOption = 'Price (low to high)';
    readonly priceDescendingOption = 'Price (high to low)';
    readonly nameAscendingOption = 'Name (A to Z)';
    readonly nameDescendingOption = 'Name (Z to A)';
}
