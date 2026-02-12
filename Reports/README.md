# Test Reports Directory

This directory contains generated test reports in two formats:

## Folder Structure

```
Reports/
├── cucumber-html/           # Cucumber HTML Reports
│   └── cucumber-report.html
└── allure-report/           # Allure Test Reports
    ├── cucumber.json        # Raw test results
    └── output/              # Generated Allure HTML report
```

## Running Tests with Reports

### 1. Run Tests with HTML Report
```bash
npm run test:html
```
- Executes all Cucumber scenarios
- Generates HTML report at: `Reports/cucumber-html/cucumber-report.html`
- Generates JSON data at: `Reports/allure-report/cucumber.json`

### 2. Generate Allure Report
```bash
npm run allure:generate
```
- Converts `cucumber.json` to Allure HTML report
- Output location: `Reports/allure-report/output/`

### 3. View Allure Report in Browser
```bash
npm run allure:serve
```
- Launches Allure report server on port 4040
- Auto-opens in default browser
- Press Ctrl+C to stop server

### 4. Complete Test & Report Flow
```bash
npm run test:report
```
- Runs all tests
- Generates both HTML and Allure reports
- Saves all data to Reports/ folder

### 5. Clean Reports
```bash
npm run clean:reports
```
- Removes all generated reports
- Keeps folder structure intact (for git)

## Report Formats

### Cucumber HTML Report
- **Location:** `Reports/cucumber-html/cucumber-report.html`
- **Format:** HTML5
- **Features:**
  - Step-by-step scenario execution details
  - Pass/Fail status with timing
  - Console output and logs
  - Screenshots on failures (embedded base64)

### Allure Report
- **Location:** `Reports/allure-report/output/index.html`
- **Format:** Advanced HTML dashboard
- **Features:**
  - Detailed test statistics
  - Timeline view
  - Failure analysis
  - Test history
  - Environment information
  - Trend charts
  - Screenshots as attachments

## Accessing Reports

### View Cucumber HTML
1. Run: `npm run test:html`
2. Open: `Reports/cucumber-html/cucumber-report.html` in browser

### View Allure Report
1. Run: `npm run allure:serve`
2. Report opens automatically at: `http://localhost:4040`

## Report Content

Both reports include:
- ✅ All executed scenarios
- ✅ Test step details
- ✅ Pass/Fail status
- ✅ Execution time
- ✅ Error messages and stack traces
- ✅ Screenshots on failures
- ✅ Console logs

## GitHub Integration

Reports are NOT committed to git (see `.gitignore`):
- Generated files in `Reports/` are excluded
- Folder structure is preserved using `.gitkeep`
- Keep reports local or upload as CI/CD artifacts

## CI/CD Integration

### GitHub Actions Example
```yaml
- name: Run tests with reports
  run: npm run test:report

- name: Upload Allure reports
  uses: actions/upload-artifact@v3
  with:
    name: allure-report
    path: Reports/allure-report/output/
```

## Troubleshooting

### Reports folder not generating?
```bash
# Create manually
mkdir -p Reports/cucumber-html
mkdir -p Reports/allure-report
```

### Allure not found?
```bash
# Install Allure
npm install -g allure-commandline
```

### Port 4040 already in use?
```bash
# Use different port
allure serve Reports/allure-report --port 5000
```

## Best Practices

✅ **Do:**
- Run `npm run test:report` after test execution
- Review failures in Allure report for quick debugging
- Archive reports as test artifacts
- Share reports with team for analysis

❌ **Don't:**
- Commit generated reports to git
- Keep old reports (run clean before new tests)
- Ignore failures shown in reports

## Report Retention

- Keep reports locally for 1 week for analysis
- Archive important reports separately
- Run `npm run clean:reports` before re-running tests
- Old reports are automatically overwritten

