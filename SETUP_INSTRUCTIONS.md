# Setup Instructions

## Prerequisites

Before running tests, ensure dependencies are installed.

### Step 1: Install Dependencies

```bash
npm install
```

This will install:
- ✅ Cucumber.js
- ✅ Playwright
- ✅ Allure command-line
- ✅ TypeScript
- ✅ All other dependencies

### Step 2: Verify Installation

```bash
# Check if allure is installed
npx allure --version

# Check if cucumber is installed
npx cucumber-js --version
```

### Troubleshooting Installation

#### Issue: "allure: command not found"

**Solution 1: Reinstall dependencies**
```bash
# Delete node_modules and reinstall
rm -r node_modules
npm install
```

**Solution 2: Install Allure globally** (Windows)
```bash
npm install -g allure-commandline
```

**Solution 3: Install Allure globally** (Mac/Linux)
```bash
brew install allure
# Or
sudo npm install -g allure-commandline
```

#### Issue: Port 4040 already in use

```bash
# Kill process on Windows
netstat -ano | findstr :4040
taskkill /PID <PID> /F

# Or use different port
npx allure serve Reports/allure-report/output --port 5000
```

#### Issue: "cucumber-js: command not found"

```bash
# Reinstall Cucumber
npm install @cucumber/cucumber --save-dev
```

---

## Quick Setup (One Command)

```bash
npm install && npm run test:html && npm run allure:generate
```

---

## Verify Setup Works

### Test 1: HTML Report Generation
```bash
npm run test:html
```
✅ Should create:
- `Reports/cucumber-html/cucumber-report.html`
- `Reports/allure-report/cucumber.json`

### Test 2: Allure Generation
```bash
npm run allure:generate
```
✅ Should create:
- `Reports/allure-report/output/index.html`

### Test 3: View Allure Report
```bash
npm run allure:serve
```
✅ Should:
- Start server on http://localhost:4040
- Automatically open in browser

---

## Directory Structure After Setup

```
PW_TS_Project/
├── node_modules/           ← Dependencies installed here
├── Reports/
│   ├── cucumber-html/
│   │   └── cucumber-report.html
│   └── allure-report/
│       ├── cucumber.json
│       └── output/
│           └── index.html
├── package.json            ← Updated with allure-commandline
├── cucumber.js
└── ... (other files)
```

---

## Next Steps

1. ✅ Run: `npm install`
2. ✅ Run: `npm run test:html`
3. ✅ Run: `npm run allure:generate`
4. ✅ Run: `npm run allure:serve`
5. ✅ View reports in browser

---

## Still Having Issues?

### Debug: Check npm packages
```bash
npm list | grep allure
npm list | grep cucumber
```

### Debug: Check installed versions
```bash
npx allure --version
npx cucumber-js --version
```

### Debug: Full setup from scratch
```bash
# Remove everything
rm -r node_modules
rm package-lock.json

# Reinstall
npm install

# Verify
npm list
```

### Debug: Check file paths
```bash
# Windows
dir Reports\cucumber-html
dir Reports\allure-report

# Mac/Linux
ls -la Reports/cucumber-html
ls -la Reports/allure-report
```

---

## Environment Info

**Required Node versions:**
- Node.js: v14+ (v16+ recommended)
- npm: v6+

**Check your versions:**
```bash
node --version
npm --version
```

If outdated, download from: https://nodejs.org/

