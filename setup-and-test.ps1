# PowerShell script to setup and run tests
# Usage: .\setup-and-test.ps1

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Playwright + Cucumber + Allure" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Install dependencies if node_modules doesn't exist
if (-not (Test-Path "node_modules")) {
    Write-Host ""
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "✅ Dependencies already installed" -ForegroundColor Green
}

# Menu
Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "What would you like to do?" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host "1. Run tests only" -ForegroundColor White
Write-Host "2. Run tests + generate reports" -ForegroundColor White
Write-Host "3. Run tests + start report server" -ForegroundColor White
Write-Host "4. Clean all reports" -ForegroundColor White
Write-Host "5. Exit" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter your choice (1-5)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "🧪 Running tests..." -ForegroundColor Yellow
        npm test
    }
    "2" {
        Write-Host ""
        Write-Host "🧪 Running tests and generating reports..." -ForegroundColor Yellow
        npm run test:debug
        Write-Host ""
        Write-Host "📁 Report generated:" -ForegroundColor Green
        Write-Host "  - HTML: Reports\cucumber-html\cucumber-report.html" -ForegroundColor White
    }
    "3" {
        Write-Host ""
        Write-Host "🧪 Running tests and starting report server..." -ForegroundColor Yellow
        cmd /c test-and-report.bat
    }
    "4" {
        Write-Host ""
        Write-Host "�️  Cleaning all reports..." -ForegroundColor Yellow
        npm run clean:reports
        Write-Host "✅ Reports cleaned" -ForegroundColor Green
    }
    "5" {
        Write-Host "👋 Goodbye!" -ForegroundColor Cyan
        exit 0
    }
    default {
        Write-Host "❌ Invalid choice" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "✅ Done!" -ForegroundColor Green
Write-Host ""
