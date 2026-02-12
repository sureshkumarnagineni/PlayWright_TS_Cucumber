# Error Resolution Guide

## Problem: "command not found" Error

When running Allure commands, you might see:
```
allure: command not found
```
or
```
'allure' is not recognized as an internal or external command
```

## Root Causes & Solutions

### ❌ Error 1: Dependencies Not Installed

**Symptom:**
```
npm ERR! command not found: npx
npm ERR! Or install allure-commandline locally
```

**Solution: Install dependencies**
```bash
npm install
```

This installs:
- ✅ Allure command-line
- ✅ Cucumber
- ✅ Playwright
- ✅ TypeScript
- ✅ All other packages

**Verify:**
```bash
npm list | grep allure
# Should show: allure-commandline@2.25.0
```

---

### ❌ Error 2: Node.js Not in PATH

**Symptom:**
```
'npm' is not recognized as an internal or external command
'node' is not recognized as an internal or external command
```

**Cause:** Node.js not installed or not in system PATH

**Solution:**
1. Download Node.js: https://nodejs.org/ (v16+ recommended)
2. Install with default settings
3. Restart terminal
4. Verify:
   ```bash
   node --version
   npm --version
   ```

---

### ❌ Error 3: Allure Not in PATH (Global)

**Symptom:**
```
allure: command not found
```

**Cause:** Allure is installed locally in `node_modules` but you're trying to use it as global command

**Solution: Use npx (recommended)**
All npm scripts already use `npx allure`, so this is automatic:
```bash
npm run allure:generate   # Works fine
npm run allure:serve      # Works fine
```

**Alternative: Install globally**
```bash
# Windows
npm install -g allure-commandline

# Mac/Linux
brew install allure
# or
sudo npm install -g allure-commandline
```

---

### ❌ Error 4: npm run Scripts Not Working

**Symptom:**
```
npm ERR! command not found: cucumber-js
npm ERR! command not found: allure
```

**Solution: Reinstall everything**
```bash
# Clear cache
npm cache clean --force

# Remove old installation
rm -r node_modules
rm package-lock.json

# Reinstall fresh
npm install

# Verify
npm list
```

---

### ❌ Error 5: Reports Folder Not Found

**Symptom:**
```
Error: ENOENT: no such file or directory
'Reports/allure-report/cucumber.json'
```

**Solution: Create folders**
```bash
mkdir -p Reports/cucumber-html
mkdir -p Reports/allure-report
```

**Or run:** `npm run clean:reports` (creates structure automatically)

---

## Step-by-Step Fix Guide

### If You See "command not found"

```bash
# Step 1: Install dependencies
npm install

# Step 2: Verify installation
npm list

# Step 3: Try the command again
npm run allure:serve

# Step 4: If still fails, reinstall globally
npm install -g allure-commandline
```

---

## Quick Diagnostics

### Check 1: Node.js & npm
```bash
node --version
npm --version
```
**Expected:** Both show version numbers (not errors)

### Check 2: Dependencies
```bash
npm list | grep -E "allure|cucumber|playwright"
```
**Expected:** All three packages listed with versions

### Check 3: npm Scripts
```bash
npm run
```
**Expected:** List of available scripts including:
- test
- test:html
- allure:generate
- allure:serve
- test:report
- test:allure

### Check 4: Allure Command
```bash
npx allure --version
```
**Expected:** Version number (e.g., `2.25.0`)

### Check 5: Report Files
```bash
# Windows
dir Reports\allure-report
dir Reports\cucumber-html

# Mac/Linux
ls -la Reports/allure-report
ls -la Reports/cucumber-html
```

---

## Interactive Setup Script

Instead of manual commands, use the provided scripts:

### Windows (PowerShell)
```bash
.\setup-and-test.ps1
```
Interactive menu with:
- Dependency installation
- Test execution
- Report generation
- Report viewing

### Windows (cmd)
```bash
setup-and-test.bat
```
Same menu in batch format

### Mac/Linux
```bash
bash setup-and-test.sh
```

---

## If All Else Fails: Nuclear Option

```bash
# Remove everything
rm -r node_modules
rm package-lock.json
rm -r Reports

# Reinstall from scratch
npm install
npm install -g allure-commandline

# Create report folders
mkdir -p Reports/cucumber-html
mkdir -p Reports/allure-report

# Run tests
npm run test:html

# Generate and view
npm run allure:generate
npm run allure:serve
```

---

## Common Issues & Quick Fixes

| Issue | Command |
|-------|---------|
| Dependencies missing | `npm install` |
| Allure not found | `npm install -g allure-commandline` |
| Port 4040 in use | Use port: `npm run allure:serve -- --port 5000` |
| Reports not generating | Check: `Reports` folder exists |
| Old reports showing | `npm run clean:reports` |
| Tests not running | Check feature files in `features/` |

---

## Success Checklist ✅

After fixing the issue, verify:

- [ ] `npm install` completed without errors
- [ ] `npm list` shows allure-commandline
- [ ] `npx allure --version` shows version
- [ ] `npm run test:html` generates reports
- [ ] Files exist: `Reports/allure-report/cucumber.json`
- [ ] `npm run allure:generate` succeeds
- [ ] `npm run allure:serve` launches browser

---

## Still Having Issues?

### Debug Mode
```bash
# Show all npm debug info
npm run test:html --verbose

# Check npm cache
npm cache verify

# List global packages
npm list -g --depth=0
```

### Check Environment
```bash
# Windows
set NODE_PATH
echo %PATH% | find "nodejs"

# Mac/Linux
echo $PATH | grep node
which node
```

### If Port Conflict
```bash
# Find what's using port 4040
netstat -ano | findstr :4040

# Kill process (get PID from above)
taskkill /PID <PID> /F
```

---

## Getting Help

### Useful Commands
```bash
# Installation help
npm install --help

# Package info
npm view allure-commandline

# Check for outdated packages
npm outdated
```

### Resources
- npm: https://docs.npmjs.com/
- Allure: https://docs.qameta.io/allure/
- Cucumber: https://cucumber.io/docs/cucumber/
- Playwright: https://playwright.dev/

