# Test Execution Guide

## Quick Start

### 1️⃣ Run Tests Only
```bash
npm test
# or
npx cucumber-js
```

### 2️⃣ Run Tests + Generate Reports
```bash
npm run test:report
```
This will:
- ✅ Execute all Cucumber scenarios
- ✅ Generate Cucumber HTML report
- ✅ Generate JSON data file
- ✅ Convert to Allure format
- ✅ Create Allure HTML dashboard

### 3️⃣ Run Tests + View Allure Report Live
```bash
npm run test:allure
```
This will:
- ✅ Execute tests
- ✅ Generate all reports
- ✅ Launch Allure server on port 4040
- ✅ Auto-open browser

### 4️⃣ View Existing Reports

**Cucumber HTML:**
```bash
# Open directly
Reports/cucumber-html/cucumber-report.html
```

**Allure Report:**
```bash
npm run allure:serve
# Opens at http://localhost:4040
```

---

## Complete Command Reference

| Command | Purpose | Output |
|---------|---------|--------|
| `npm test` | Run tests | Console output |
| `npm run test:html` | Tests + HTML report | `Reports/cucumber-html/cucumber-report.html` |
| `npm run test:report` | Tests + both reports | Both HTML and Allure |
| `npm run test:allure` | Tests + Allure + serve | Allure at http://localhost:4040 |
| `npm run allure:generate` | Generate Allure from JSON | `Reports/allure-report/output/` |
| `npm run allure:serve` | View Allure report | Browser: http://localhost:4040 |
| `npm run clean:reports` | Clear all reports | Delete Reports content |

---

## Detailed Workflow

### Scenario 1: Run & View HTML Report
```bash
npm run test:html
# Then open: Reports/cucumber-html/cucumber-report.html
```

### Scenario 2: Run & View Allure Report
```bash
npm run test:html
npm run allure:generate
npm run allure:serve
```

### Scenario 3: Complete Testing Pipeline
```bash
# One command does everything
npm run test:allure

# 1. Runs tests
# 2. Generates HTML report
# 3. Generates Allure report
# 4. Opens Allure server
# 5. Launches browser
```

### Scenario 4: Just Generate Allure from Existing JSON
```bash
# If you already have Reports/allure-report/cucumber.json
npm run allure:generate
npm run allure:serve
```

---

## Report Locations

### Cucumber HTML Report
```
Reports/
└── cucumber-html/
    └── cucumber-report.html
```
Access: Open file directly in browser

### Allure Report
```
Reports/
└── allure-report/
    ├── cucumber.json      (Raw test data)
    └── output/
        └── index.html     (Allure dashboard)
```
Access: `npm run allure:serve` (recommended) or open `output/index.html`

---

## Troubleshooting

### ❌ Allure command not found
```bash
# Install globally
npm install -g allure-commandline

# Or use npx (automatic)
npm run allure:generate
```

### ❌ cucumber.json not created
- Ensure tests ran successfully
- Check: `Reports/allure-report/` folder exists
- Run: `npm run clean:reports && npm run test:html`

### ❌ Port 4040 already in use
```bash
# Check what's using port 4040
netstat -ano | findstr :4040

# Kill process or use different port
npx allure serve Reports/allure-report/output --port 5000
```

### ❌ Reports folder missing
```bash
# Create manually
mkdir Reports\cucumber-html
mkdir Reports\allure-report
```

### ❌ No tests executed
- Check feature files in `features/` folder
- Verify step definitions in `src/steps/`
- Run: `npm test` to see console output

---

## Report Features

### Cucumber HTML Report Shows:
- ✅ Feature and scenario names
- ✅ Step-by-step execution
- ✅ Pass/Fail status
- ✅ Execution time
- ✅ Error messages
- ✅ Screenshots (base64)
- ✅ Console logs

### Allure Report Shows:
- ✅ Test overview and statistics
- ✅ Pass/Fail/Skip breakdown
- ✅ Test timeline view
- ✅ Failure analysis with details
- ✅ Duration trends
- ✅ Screenshots and attachments
- ✅ Environment info
- ✅ Custom tags and categories

---

## Tips & Best Practices

### ✅ Do's
- Run `npm run clean:reports` before testing
- Use `npm run test:allure` for complete workflow
- Check Allure for detailed failure analysis
- Keep reports for at least 1 week
- Share reports via CI/CD artifacts

### ❌ Don'ts
- Don't commit generated reports to git
- Don't run Allure serve multiple times (port conflict)
- Don't delete Reports folder (use clean command)
- Don't rely only on HTML report (use Allure for better insights)

---

## CI/CD Integration (GitHub Actions)

```yaml
- name: Run tests and generate reports
  run: npm run test:report

- name: Upload Allure reports
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: allure-report
    path: Reports/allure-report/output/

- name: Upload HTML reports
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: cucumber-html
    path: Reports/cucumber-html/
```

---

## Next Steps

1. Run: `npm run test:allure`
2. Review failing tests if any
3. Check screenshots in Allure
4. Analyze trends and patterns
5. Improve tests based on failures

