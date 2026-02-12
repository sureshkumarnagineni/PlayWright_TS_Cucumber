#!/usr/bin/env node

/**
 * Test Runner Script - Simple shell execution
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('\n================================');
console.log('Cucumber Test Runner');
console.log('================================\n');

const projectRoot = path.resolve(__dirname);
const reportsDir = path.join(projectRoot, 'allure-results');

// Ensure directories exist
if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
    console.log(`📁 Created directory: ${reportsDir}`);
}

console.log('🧪 Running tests...\n');

try {
    // Execute Cucumber using shell (handles Windows/Unix)
    execSync('npx cucumber-js', {
        cwd: projectRoot,
        stdio: 'inherit'
    });
    
    console.log('\n✅ Tests completed successfully');
} catch (error) {
    console.log(`\n⚠️  Tests completed with error code ${error.status}`);
}

// Wait a moment then check if JSON was created
setTimeout(() => {
    const jsonFile = path.join(reportsDir, 'cucumber.json');
    if (fs.existsSync(jsonFile)) {
        const stats = fs.statSync(jsonFile);
        console.log(`✅ JSON file created: ${stats.size} bytes`);
        console.log(`📍 Location: ${jsonFile}`);
    } else {
        console.log('⚠️  JSON file not created');
    }
    
    console.log('\n📊 Next steps:');
    console.log('  1. Run: npm run allure:generate');
    console.log('  2. Run: npm run allure:serve');
    console.log('  3. View: http://localhost:4040\n');
}, 1000);
