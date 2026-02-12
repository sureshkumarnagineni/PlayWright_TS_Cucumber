# Playwright + Cucumber + TypeScript + Allure Testing Framework

## Quick Start

```bash
# Install dependencies
npm install

# Run all tests
npm test

# View HTML report
# Open: Reports/cucumber-html/cucumber-report.html

# Generate & view Allure report
npm run test:allure
```

## Project Structure

```
PW_TS_Project/
├── src/
│   ├── actions/         # Playwright action wrappers
│   ├── hooks/           # Test lifecycle (Before/After)
│   ├── modules/         # Business logic modules
│   ├── pages/           # Page Object Model classes
│   ├── steps/           # BDD step definitions
│   └── utils/           # Utilities (screenshots, file handling)
│
├── features/            # Gherkin test scenarios (.feature files)
├── Reports/             # Generated test reports
│   ├── cucumber-html/   # Cucumber HTML reports
│   ├── allure-report/   # Allure dashboard
│   └── screenshots/     # Screenshots on failures
│
├── allure-results/      # Raw test data (JSON)
├── cucumber.js          # Cucumber configuration
├── run-tests.js         # Test runner script
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── testData.properties  # Test credentials
└── .allurerc.json       # Allure config
```

## Available Commands

| Command | Purpose |
|---------|---------|
| `npm test` | Run all tests |
| `npm run test:html` | Run tests + generate HTML |
| `npm run allure:generate` | Generate Allure dashboard |
| `npm run allure:serve` | Serve Allure in browser |
| `npm run test:allure` | All-in-one: test + Allure |
| `npm run clean:reports` | Clean all reports |

## Key Features

✅ **6 End-to-End Test Scenarios**
- Purchase workflow
- Product filtering
- Cart management
- Inventory verification
- Session management
- Advanced filtering

✅ **Modular Architecture**
- Page Object Model for maintainability
- Module-based business logic
- Centralized step definitions
- Reusable action methods

✅ **Automatic Reporting**
- Cucumber HTML reports
- Allure advanced analytics
- Screenshots on failures
- JSON test data export

✅ **Browser Optimization**
- Maximized window (1920×1440)
- Full page screenshots
- Headless-false (visible execution)

## Test Data

Credentials in `testData.properties`:
```
username=standard_user
password=secret_sauce
firstName=Test
lastName=User
postalCode=12345
```

## Reports Location

- **Cucumber HTML**: `Reports/cucumber-html/cucumber-report.html`
- **Allure Dashboard**: `Reports/allure-report/output/index.html`
- **Screenshots**: `Reports/screenshots/`
- **Raw JSON**: `allure-results/cucumber.json`

## Dependencies

- `@playwright/test` - Browser automation
- `@cucumber/cucumber` - BDD testing
- `typescript` - Type safety
- `allure-commandline` - Advanced reporting
- `ts-node` - TypeScript execution

## File Management

**To Clean Root Directory:**
Delete unnecessary files:
- `ALLURE_*.md` - Old documentation
- `*_GUIDE.md` - Old guides
- `setup-*.bat`, `setup-*.ps1` - Setup scripts
- `generate-*.bat`, `generate-*.sh` - Old generation scripts
- `start-allure-report.bat` - Old launcher
- `cucumber-report.html` - Old report
- `cucumber.json` - Old JSON
- `screenshots/` - Old folder (use `Reports/screenshots/`)
- `allure-report/` - Old folder

Keep only files listed in Project Structure above.

## Troubleshooting

**Tests not running:**
```bash
npm install          # Install dependencies
npm test             # Run tests
```

**Port 4040 in use:**
```bash
taskkill /F /IM java.exe    # Kill Allure server
```

**Reports not updating:**
```bash
npm run clean:reports        # Clean old reports
npm test                     # Generate new
```

---

**Last Updated:** February 12, 2026
**Status:** ✅ Production Ready
