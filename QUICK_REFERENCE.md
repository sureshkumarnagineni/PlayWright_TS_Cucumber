# Quick Reference Card

## 🚀 Getting Started (3 Steps)

```bash
# 1. Install dependencies (first time only)
npm install

# 2. Run tests & generate reports
npm run test:allure

# Done! Browser opens automatically at http://localhost:4040
```

---

## 📋 All Available Commands

### Testing
| Command | Purpose |
|---------|---------|
| `npm test` | Run Cucumber tests only |
| `npm run test:html` | Tests + generate HTML & JSON reports |

### Reports
| Command | Purpose |
|---------|---------|
| `npm run allure:generate` | Convert JSON to Allure HTML |
| `npm run allure:serve` | View Allure report (port 4040) |
| `npm run test:report` | Tests + both report formats |
| `npm run test:allure` | Everything + view live ⭐ |

### Utilities
| Command | Purpose |
|---------|---------|
| `npm run clean:reports` | Delete all generated reports |

---

## 🔥 Most Common Workflows

### Workflow 1: Quick Test Run
```bash
npm run test:html
```
Then open: `Reports/cucumber-html/cucumber-report.html`

### Workflow 2: Complete Analysis
```bash
npm run test:allure
# Automatically opens http://localhost:4040
```

### Workflow 3: View Existing Reports
```bash
npm run allure:serve
# Opens http://localhost:4040
```

---

## 📂 Where Are Reports?

### HTML Report
```
Reports/cucumber-html/cucumber-report.html
Open directly in browser
```

### Allure Report
```
Reports/allure-report/output/index.html
Run: npm run allure:serve
```

### JSON Data
```
Reports/allure-report/cucumber.json
Raw test data (used by Allure)
```

---

## ⚠️ If Commands Fail

### "command not found" Error

**Fix 1: Install dependencies**
```bash
npm install
```

**Fix 2: Install Allure globally**
```bash
npm install -g allure-commandline
```

**Fix 3: Clear cache and reinstall**
```bash
npm cache clean --force
rm -r node_modules
npm install
```

### "Port 4040 already in use"
```bash
# Use different port
npx allure serve Reports/allure-report/output --port 5000
```

---

## ✅ Verification Commands

```bash
# Check if dependencies are installed
npm list

# Check Allure version
npx allure --version

# Check Cucumber version
npx cucumber-js --version
```

---

## 📊 Expected Output

After running `npm run test:allure`:

```
✅ Tests executed
✅ HTML report generated
✅ JSON report generated
✅ Allure report generated
✅ Allure server started on http://localhost:4040
✅ Browser opened automatically
```

Browser shows Allure dashboard with:
- Test statistics
- Failure analysis
- Timeline
- Screenshots
- Trends

---

## 🎯 Next Steps

1. Run: `npm install`
2. Run: `npm run test:allure`
3. View reports in browser
4. Check failing tests
5. Fix issues
6. Re-run tests

