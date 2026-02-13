# Quick Test Execution Guide - Refactored Structure

## ✅ Refactoring Complete

**Total Scenarios:** 43 unique test cases  
**Structure:** 1 scenario per feature file  
**Organization:** 8 feature directories by category  
**Duplicates Removed:** 8 locators consolidated  
**Code Reusability:** 100% maintained  

---

## Directory Overview

```
features/
├── login/       (7 scenarios)  - Login functionality
├── checkout/    (8 scenarios)  - Checkout workflow
├── cart/        (7 scenarios)  - Cart operations
├── product/     (7 scenarios)  - Product features
├── sorting/     (6 scenarios)  - Sorting & filtering
├── navigation/  (6 scenarios)  - Menu & navigation
├── inventory/   (1 scenario)   - Inventory checks
└── session/     (1 scenario)   - Logout workflow
```

---

## Quick Test Commands

### Run All Tests
```bash
npm test
```

### Run All Tests with Allure Report
```bash
npm run test:report
```

### View Allure Report
```bash
npm run serve:report
```

---

## Run Tests by Category

### Login Tests (7 scenarios)
```bash
npx cucumber-js features/login/**/*.feature
```
Tests: Standard user, invalid username, invalid password, empty credentials, locked user, problem user, performance user

### Checkout Tests (8 scenarios)
```bash
npx cucumber-js features/checkout/**/*.feature
```
Tests: Complete checkout, cancel checkout, form validation (firstname, lastname, postal code), continue shopping, overview verification, cancel from overview

### Cart Tests (7 scenarios)
```bash
npx cucumber-js features/cart/**/*.feature
```
Tests: Empty cart, single product, remove all, persistence, item details, remove specific, multiple products

### Product Tests (7 scenarios)
```bash
npx cucumber-js features/product/**/*.feature
```
Tests: View details, add from details, remove from details, back navigation, add all products, complete purchase, filter by price

### Sorting Tests (6 scenarios)
```bash
npx cucumber-js features/sorting/**/*.feature
```
Tests: Sort name A-Z, sort name Z-A, sort price low-high, sort price high-low, default sort, price range filter

### Navigation Tests (6 scenarios)
```bash
npx cucumber-js features/navigation/**/*.feature
```
Tests: Menu open/close, All Items link, About link, Reset app state, social media links, cart icon

### Inventory Test (1 scenario)
```bash
npx cucumber-js features/inventory/**/*.feature
```
Test: Product inventory status verification

### Session Test (1 scenario)
```bash
npx cucumber-js features/session/**/*.feature
```
Test: Logout workflow

---

## Run Individual Test

### Syntax
```bash
npx cucumber-js features/<category>/<test-file>.feature
```

### Examples
```bash
# Login with standard user
npx cucumber-js features/login/login-standard-user.feature

# Complete checkout
npx cucumber-js features/checkout/checkout-complete.feature

# Add single product to cart
npx cucumber-js features/cart/cart-single-product.feature

# Sort products by price
npx cucumber-js features/sorting/sort-price-asc.feature
```

---

## Run Multiple Specific Tests

```bash
npx cucumber-js features/login/login-standard-user.feature features/checkout/checkout-complete.feature features/product/product-purchase-complete.feature
```

---

## Dry Run (Validate Scenarios Without Execution)

### All Tests
```bash
node node_modules/@cucumber/cucumber/bin/cucumber.js --dry-run
```

### Specific Category
```bash
node node_modules/@cucumber/cucumber/bin/cucumber.js --dry-run features/login/**/*.feature
```

---

## Test Execution Settings

**Parallel Workers:** 4 (configured in cucumber.js)  
**Timeout:** 120000ms (2 minutes per scenario)  
**Browser:** Chromium (headless: false)  
**Resolution:** 1920x1440  

To modify, edit `cucumber.js`:
```javascript
parallel: 4,          // Number of parallel workers
timeout: 120000,      // Timeout in milliseconds
```

---

## Common Test Patterns

### 1. Smoke Test Suite (Critical Paths)
```bash
npx cucumber-js \
  features/login/login-standard-user.feature \
  features/product/product-purchase-complete.feature \
  features/checkout/checkout-complete.feature
```

### 2. Regression Test Suite (All Tests)
```bash
npm run test:report
```

### 3. Login Validation Suite
```bash
npx cucumber-js features/login/**/*.feature
```

### 4. E2E Purchase Flow
```bash
npx cucumber-js \
  features/login/login-standard-user.feature \
  features/product/product-add-from-details.feature \
  features/cart/cart-item-details.feature \
  features/checkout/checkout-complete.feature
```

---

## Debugging Individual Tests

### Run with Custom Timeout
```bash
npx cucumber-js features/login/login-standard-user.feature --timeout 60000
```

### Run Single Test in Serial Mode
Temporarily set `parallel: 1` in cucumber.js, then:
```bash
npx cucumber-js features/login/login-standard-user.feature
```

### View Console Logs
All modules include `console.log()` statements for debugging. Check terminal output during test execution.

---

## Test Status Verification

### Check TypeScript Compilation
```bash
npx tsc --noEmit
```
Expected: No errors

### Check Feature Files
```bash
node node_modules/@cucumber/cucumber/bin/cucumber.js --dry-run
```
Expected: All steps recognized

### List All Feature Files
```bash
Get-ChildItem -Path features -Filter *.feature -Recurse | Select-Object FullName
```

---

## CI/CD Integration

### GitHub Actions Example
```yaml
- name: Run Tests
  run: npm run test:report

- name: Upload Allure Results
  uses: actions/upload-artifact@v3
  with:
    name: allure-results
    path: allure-results/
```

### Jenkins Example
```groovy
stage('Test') {
    steps {
        sh 'npm run test:report'
        allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
    }
}
```

---

## Framework Architecture Quick Reference

### Pages (Locators Only)
```typescript
// src/pages/ProductPage.ts
readonly addBackpack = '#add-to-cart-sauce-labs-backpack';
```

### Modules (Business Logic)
```typescript
// src/modules/CartModule.ts
async addSingleProduct() {
    await this.actions.click(this.productPage.addBackpack);
}
```

### Steps (Gherkin Implementation)
```typescript
// src/steps/CartOperationsSteps.ts
When('User adds single product to cart', async function () {
    await cartMod.addSingleProduct();
});
```

### Features (Test Scenarios)
```gherkin
# features/cart/cart-single-product.feature
Scenario: Add single product and verify cart
    Given User launches the application
    When User logins as "standard_user"
    And User adds single product to cart
    Then User verifies cart contains "1" item
```

---

## Troubleshooting

### Issue: Step Definition Not Found
**Solution:** Reload VS Code window
```
Ctrl+Shift+P → "Developer: Reload Window"
```

### Issue: TypeScript Errors
**Solution:** Verify compilation
```bash
npx tsc --noEmit
```

### Issue: Allure Report Not Generating
**Solution:** Check allure-results directory exists and run:
```bash
npm run generate:report
npm run serve:report
```

### Issue: Tests Timing Out
**Solution:** Increase timeout in cucumber.js or specific step
```javascript
timeout: 180000  // 3 minutes
```

---

## Best Practices

1. **One Scenario Per Run** during development
2. **Full Suite** before commits
3. **Category-wise** for feature testing
4. **Parallel Execution** for faster results
5. **Allure Reports** for comprehensive results

---

## File Cleanup (Optional)

Old multi-scenario files can now be deleted (new structure in place):
```bash
Remove-Item features/login-scenarios.feature
Remove-Item features/checkout-scenarios.feature
Remove-Item features/cart-operations.feature
Remove-Item features/product-details.feature
Remove-Item features/sorting-and-filtering.feature
Remove-Item features/navigation-and-menu.feature
Remove-Item features/purchase-workflow.feature
Remove-Item features/cart-management.feature
Remove-Item features/product-filter-workflow.feature
Remove-Item features/advanced-filtering.feature
Remove-Item features/inventory-verification.feature
Remove-Item features/logout-workflow.feature
```

---

## Summary

✅ **43 Scenarios** in 8 organized directories  
✅ **1 Scenario per File** for clarity  
✅ **No Duplicates** in code or locators  
✅ **100% Reusability** maintained  
✅ **Easy Test Selection** by category or individual  

**Ready to execute!** 🚀
