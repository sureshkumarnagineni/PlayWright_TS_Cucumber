# Test Execution Guide

## Quick Start

### 1?? Run Tests Only
```bash
npm test
# or
npx cucumber-js
```

### 2?? Run Tests + Generate Report
```bash
npm run test:debug
```
This will:
- ? Execute all Cucumber scenarios
- ? Generate Cucumber HTML report
- ? Display progress bar

### 3?? Run Tests + View Report Live
```bash
cmd /c test-and-report.bat
```
This will:
- ? Execute tests
- ? Generate Cucumber HTML report
- ? Start report server on port 3000
- ? Auto-open browser to view report

### 4?? View Existing Report
```bash
# Start server
node serve-report.js

# Then open in browser
http://localhost:3000
```

---

## Complete Command Reference

| Command | Purpose | Output |
|---------|---------|--------|
| `npm test` | Run tests | Console output |
| `npm run test:debug` | Tests + HTML report | `Reports/cucumber-html/cucumber-report.html` |
| `npm run clean:reports` | Clear all reports | Delete Reports content |

---

## Detailed Workflow

### Scenario 1: Quick Test Run with Report
```bash
npm run test:debug
# Then open: Reports/cucumber-html/cucumber-report.html
```

### Scenario 2: Complete Testing Pipeline (Windows)
```bash
# One command does everything
cmd /c test-and-report.bat

# 1. Cleans old reports
# 2. Runs all tests
# 3. Generates HTML report
# 4. Starts report server
# 5. Opens browser automatically
```

### Scenario 3: Run Tests Only (Headless)
```bash
npm test
```

---

## Report Location

### Cucumber HTML Report
```
Reports/
+-- cucumber-html/
    +-- cucumber-report.html
```

**Access:** 
- Direct: Open file in browser
- Served: `http://localhost:3000` (after running serve-report.js)

---

## Report Features

### Cucumber HTML Report Shows:
- ? Feature and scenario names
- ? Step-by-step execution details
- ? Pass/Fail/Skip status
- ? Execution time per step
- ? Error messages and stack traces
- ? Screenshots (embedded base64)
- ? Console logs
- ? Execution summary
- ? Feature-wise breakdown

---

## Troubleshooting

### ? Tests not running
```bash
# Check if Playwright is installed
npm install

# Run with verbose output
npm test -- --format progress-bar
```

### ? Report not generated
- Ensure tests ran successfully
- Check: `Reports/cucumber-html/` folder exists
- Run: `npm run clean:reports && npm run test:debug`

### ? Port 3000 already in use
```bash
# Kill existing process
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or start on different port (modify serve-report.js)
```

### ? Reports folder missing
```bash
# Create manually
mkdir Reports\cucumber-html
```

### ? No tests executed
- Check feature files in `features/` folder
- Verify step definitions in `src/steps/`
- Run: `npm test` to see console output

---

## Tips & Best Practices

### ? Do'"'"'s
- Run `npm run clean:reports` before testing to clear old data
- Use `test-and-report.bat` for complete automated workflow
- Keep reports for at least 1 week for analysis
- Review failed tests with screenshots for debugging

### ? Don'"'"'ts
- Don'"'"'t commit generated reports to git
- Don'"'"'t run multiple report servers on same port
- Don'"'"'t delete Reports folder manually (use clean command)

---

## CI/CD Integration (GitHub Actions)

```yaml
- name: Run tests and generate reports
  run: npm run test:debug

- name: Upload HTML reports
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: cucumber-html-report
    path: Reports/cucumber-html/
```

---

## Next Steps

1. Run: `cmd /c test-and-report.bat` (Windows) or `npm run test:debug`
2. View report at `http://localhost:3000` or `Reports/cucumber-html/cucumber-report.html`
3. Review failing tests if any
4. Check screenshots for debugging
5. Improve tests based on failures
