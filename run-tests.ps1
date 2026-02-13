#!/usr/bin/env pwsh
# PowerShell script to run tests - execution policy friendly

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Test_PW_TS - Automation Report" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "1/3 Running tests..." -ForegroundColor Green
& npx cucumber-js
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "Warning: Some tests failed, but continuing to generate report..." -ForegroundColor Yellow
    Write-Host ""
}

Write-Host ""
Write-Host "2/3 Generating Allure report (IST, dd/MM/yyyy format)..." -ForegroundColor Green
& node generate-report.js

Write-Host ""
Write-Host "3/3 Opening report in browser..." -ForegroundColor Green
Write-Host "Project: Test_PW_TS"
Write-Host "Report available at: http://localhost:8765"
Write-Host "Timezone: IST (Asia/Kolkata)"
Write-Host "Date Format: dd/MM/yyyy"
Write-Host ""

if (Test-Path "Reports\allure-report") {
    Start-Process "http://localhost:8765"
}
& node serve-allure.js
