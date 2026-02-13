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
- ✅ TypeScript
- ✅ All other dependencies

### Step 2: Verify Installation

```bash
# Check if cucumber is installed
npx cucumber-js --version

# Check Node version
node --version
```

### Troubleshooting Installation

#### Issue: Dependencies not installing

**Solution: Reinstall dependencies**
```bash
# Delete node_modules and reinstall
rm -r node_modules
npm install
```

#### Issue: Port 3000 already in use

```bash
# Kill process on Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port (modify serve-report.js)
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
npm install && npm test
```

---

## Verify Setup Works

### Test 1: HTML Report Generation
```bash
npm run test:debug
```
✅ Should create:
- `Reports/cucumber-html/cucumber-report.html`

### Test 2: Run Tests with Report Server
```bash
cmd /c test-and-report.bat
```
✅ Should:
- Run all tests
- Generate HTML report
- Start server on http://localhost:3000
- Automatically open in browser

---

## Directory Structure After Setup

```
PW_TS_Project/
├── node_modules/           ← Dependencies installed here
├── Reports/
│   └── cucumber-html/
│       └── cucumber-report.html
├── features/               ← Feature files
├── src/                    ← Step definitions and hooks
├── package.json
├── cucumber.js
└── ... (other files)
```

---

## Next Steps

1. ✅ Run: `npm install`
2. ✅ Run: `npm test`
3. ✅ Run: `npm run test:debug` or `cmd /c test-and-report.bat`
4. ✅ View reports in browser at `http://localhost:3000`

---

## Still Having Issues?

### Debug: Check npm packages
```bash
npm list | grep cucumber
npm list | grep playwright
```

### Debug: Check installed versions
```bash
npx cucumber-js --version
node --version
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

