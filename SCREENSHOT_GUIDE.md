# Screenshot Functionality Guide

## Overview
The test framework now includes automatic screenshot capture on test failures and manual screenshot capture during test execution.

## Features

### 1. Automatic Screenshots on Failure
Screenshots are automatically captured when a test scenario fails.

**Location:** `screenshots/` directory
**Naming Convention:** `scenario_name_YYYY-MM-DD_HHMMSS.png`

**Example:**
```
screenshots/
├── filter_products_by_price_range_2026-02-12_143022.png
├── cart_management_workflow_2026-02-12_143515.png
└── logout_workflow_2026-02-12_144101.png
```

### 2. How It Works

#### In Hooks.ts
```typescript
After(async function (scenario) {
    if (scenario.result?.status === Status.FAILED) {
        // Automatically captures screenshot
        const screenshotPath = await ScreenshotUtils.captureScreenshot(
            this.page,
            scenarioName
        );
        // Attaches to report for analysis
    }
});
```

### 3. Manual Screenshots in Tests

You can capture screenshots on-demand during test execution:

#### Using PlaywrightActions
```typescript
When('User performs some action', async function () {
    await actions.click('.some-button');
    
    // Capture screenshot
    await actions.takeScreenshot('button-clicked');
    
    // Or get as base64 for embedding
    const screenshot = await actions.getScreenshotAsBase64();
});
```

#### Example in Steps
```typescript
When('User adds multiple products to cart', async function () {
    cartMod = new CartModule(this.page);
    await cartMod.addMultipleProducts();
    
    // Document the action
    await cartMod.actions.takeScreenshot('products-added-to-cart');
});
```

### 4. ScreenshotUtils Class

Located at: `src/utils/ScreenshotUtils.ts`

**Available Methods:**

#### `captureScreenshot(page, scenarioName): Promise<string>`
- Captures full page screenshot
- Automatically timestamps and sanitizes filename
- Returns file path

**Example:**
```typescript
const filepath = await ScreenshotUtils.captureScreenshot(this.page, 'login-success');
```

#### `captureAsBase64(page): Promise<string>`
- Captures screenshot as base64 string
- Useful for embedding in HTML reports
- Smaller payload for network transmission

**Example:**
```typescript
const base64 = await ScreenshotUtils.captureAsBase64(this.page);
const htmlContent = `<img src="data:image/png;base64,${base64}" />`;
```

#### `getRelativePath(filepath): string`
- Converts absolute path to relative path
- Useful for report generation

### 5. Directory Structure

```
PW_TS_Project/
├── screenshots/                    # Auto-generated failure screenshots
│   ├── scenario_name_2026-02-12_*.png
│   └── ...
├── src/
│   ├── utils/
│   │   ├── ScreenshotUtils.ts     # NEW: Screenshot utility class
│   │   └── FileUtils.ts
│   ├── actions/
│   │   └── PlaywrightActions.ts   # UPDATED: Added screenshot methods
│   ├── hooks/
│   │   └── Hooks.ts               # UPDATED: Captures on failure
│   └── ...
├── .gitignore                      # NEW: Excludes screenshots/
└── cucumber.json
```

### 6. Integration with Reports

**Allure Integration:**
Screenshots are automatically attached to Allure reports when tests fail.

**Cucumber HTML Report:**
- Screenshot paths are logged in console
- Can be manually added to custom HTML report

### 7. Best Practices

#### Do's ✅
- Capture screenshots before and after critical actions
- Use descriptive names: `login-success`, `cart-updated`, `checkout-error`
- Capture on failures for debugging
- Include page state in screenshot name for context

#### Don'ts ❌
- Don't capture on every step (creates storage overhead)
- Don't use special characters in screenshot names
- Don't rely solely on screenshots (use assertions)

### 8. Example Scenarios

#### Debugging a Failed Test
```typescript
Then('User verifies order confirmation {string}', async function (msg: string) {
    try {
        await actions.assertVisible('.complete-header');
        await actions.softAssertText('.complete-header', msg);
        actions.assertAll();
    } catch (error) {
        // Automatic screenshot capture on failure
        throw error;
    }
});
```

#### Documenting Test Flow
```typescript
When('User performs checkout', async function () {
    await actions.click('#checkout');
    await actions.takeScreenshot('checkout-page-loaded');
    
    await actions.type('#first-name', 'John');
    await actions.takeScreenshot('first-name-entered');
    
    await actions.click('#continue');
    await actions.takeScreenshot('checkout-continue-clicked');
});
```

### 9. Configuration

#### Screenshot Directory
Default: `project-root/screenshots/`

To change, modify in `ScreenshotUtils.ts`:
```typescript
private static screenshotsDir = path.join(process.cwd(), 'screenshots');
```

#### Full Page vs. Viewport
Current: Full page screenshot (includes scrollable content)

To capture viewport only, modify `captureScreenshot()`:
```typescript
await page.screenshot({ path: filepath }); // viewport only
```

### 10. Cleanup

Screenshots are not automatically deleted. To clean up:

```bash
# Remove all screenshots
rm -r screenshots/

# Or on Windows
rmdir /s screenshots
```

Consider adding to CI/CD pipeline for automated cleanup.

## Summary

| Feature | Location | Auto? | Manual? | Output |
|---------|----------|-------|---------|--------|
| Failure Screenshots | `ScreenshotUtils.ts` | ✅ Yes | ❌ N/A | File path |
| On-Demand Screenshots | `PlaywrightActions.ts` | ❌ N/A | ✅ Yes | File path |
| Base64 Encoding | `ScreenshotUtils.ts` | ❌ N/A | ✅ Yes | Base64 string |
| Allure Integration | `Hooks.ts` | ✅ Yes | ❌ N/A | Report attachment |

