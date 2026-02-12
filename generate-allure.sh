#!/bin/bash
# Script to generate Allure report from Cucumber JSON

echo "🔄 Generating Allure report from Cucumber JSON..."

# Check if cucumber.json exists
if [ ! -f "Reports/allure-report/cucumber.json" ]; then
    echo "❌ Error: cucumber.json not found at Reports/allure-report/cucumber.json"
    echo "Make sure to run: npm run test:html"
    exit 1
fi

# Generate Allure HTML report
echo "📊 Creating Allure HTML report..."
npx allure generate Reports/allure-report/cucumber.json --clean -o Reports/allure-report/output

if [ $? -eq 0 ]; then
    echo "✅ Allure report generated successfully!"
    echo "📁 Location: Reports/allure-report/output/index.html"
    echo ""
    echo "To view report, run: npm run allure:serve"
else
    echo "❌ Failed to generate Allure report"
    exit 1
fi
