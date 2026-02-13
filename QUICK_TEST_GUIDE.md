# Quick Test Execution Guide

## Run All Tests
```bash
npm run test:report
```

## Run Specific Feature Categories

### Login Tests (7 scenarios)
```bash
npx cucumber-js features/login-scenarios.feature
```

### Product Tests (5 scenarios)
```bash
npx cucumber-js features/product-details.feature
```

### Checkout Tests (8 scenarios)
```bash
npx cucumber-js features/checkout-scenarios.feature
```

### Sorting Tests (5 scenarios)
```bash
npx cucumber-js features/sorting-and-filtering.feature
```

### Cart Tests (6 scenarios)
```bash
npx cucumber-js features/cart-operations.feature
```

### Navigation Tests (6 scenarios)
```bash
npx cucumber-js features/navigation-and-menu.feature
```

### All Existing Tests
```bash
npx cucumber-js features/purchase-workflow.feature
npx cucumber-js features/cart-management.feature
npx cucumber-js features/product-filter-workflow.feature
npx cucumber-js features/advanced-filtering.feature
npx cucumber-js features/inventory-verification.feature
npx cucumber-js features/logout-workflow.feature
```

## View Reports
```bash
# Generate and serve Allure report
npm run allure:generate
npm run allure:serve

# Or combined
npm run test:allure
```

## Test Statistics

**Total Scenarios:** 43
**Total Feature Files:** 12
**Total Page Objects:** 8
**Total Modules:** 10
**Total Step Files:** 12

## Test Execution Time Estimates

- **Login scenarios:** ~2 minutes
- **Product scenarios:** ~3 minutes
- **Checkout scenarios:** ~4 minutes
- **Sorting scenarios:** ~2 minutes
- **Cart scenarios:** ~3 minutes
- **Navigation scenarios:** ~3 minutes
- **All legacy scenarios:** ~3 minutes

**Total estimated time:** ~20 minutes (sequential)
**With parallel execution (10 workers):** ~5-7 minutes
