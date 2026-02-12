# Test_PW_TS - Playwright + Cucumber + TypeScript + Allure Testing Framework

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

### Quick Start (Recommended)
```cmd
test-and-report.bat     # Windows: Run tests + generate + auto-open report
```

### NPM Commands
| Command | Purpose |
|---------|---------|
| `npm test` | Run all tests only |
| `npm run test:report` | Run tests + generate Allure report |
| `npm run test:allure` | Run tests + report + serve in browser |
| `npm run allure:generate` | Generate Allure report from existing results |
| `npm run allure:serve` | Serve Allure report at http://localhost:8765 |
| `npm run clean:reports` | Clean all report directories |

### Manual Steps
```cmd
node run-tests.js              # Step 1: Run tests
node generate-report.js        # Step 2: Generate Allure report
node serve-allure.js           # Step 3: Serve at http://localhost:8765
```

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
- IST timezone for all timestamps
- dd/MM/yyyy date format
- Project name: Test_PW_TS

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

## Report Configuration

- **Project Name**: Test_PW_TS
- **Timezone**: IST (Asia/Kolkata)
- **Date Format**: dd/MM/yyyy
- **Report Server**: http://localhost:8765
- **Environment**: QA
- **Browser**: Chrome (Headless: false)

Configuration files:
- `allure-results/environment.properties` - Environment info
- `allure-results/executor.json` - Build metadata
- `.allurerc.json` - Allure settings

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
