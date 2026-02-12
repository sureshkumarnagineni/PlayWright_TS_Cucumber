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
    // Set timezone to IST (Asia/Kolkata)
    const env = Object.assign({}, process.env, {
        TZ: 'Asia/Kolkata'
    });
    
    // Execute Cucumber using shell (handles Windows/Unix)
    execSync('npx cucumber-js', {
        cwd: projectRoot,
        stdio: 'inherit',
        env: env
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
    
    // Copy screenshots to attachments directory first
    console.log('\n🔗 Processing screenshots...');
    const screenshotsDir = 'Reports/screenshots';
    const attachmentsDir = 'allure-results/attachments';
    
    if (fs.existsSync(screenshotsDir)) {
        // Create attachments directory if needed
        if (!fs.existsSync(attachmentsDir)) {
            fs.mkdirSync(attachmentsDir, { recursive: true });
            console.log('✅ Created attachments directory');
        }
        
        // Copy screenshots to attachments directory so Allure can find them
        const screenshots = fs.readdirSync(screenshotsDir).filter(f => f.endsWith('.png'));
        let copied = 0;
        screenshots.forEach(file => {
            try {
                const srcPath = path.join(screenshotsDir, file);
                const destPath = path.join(attachmentsDir, file);
                fs.copyFileSync(srcPath, destPath);
                copied++;
            } catch (err) {
                // Silently skip copy errors
            }
        });
        console.log(`✅ Copied ${copied} screenshots to attachments directory`);
    }
    
    // Link screenshots embeddings in JSON
    console.log('🔗 Embedding screenshots in test results...');
    try {
        require('./link-screenshots.js');
    } catch (e) {
        console.log('⚠️  Could not link screenshots:', e.message);
    }
    
    console.log('\n📊 Next steps:');
    console.log('  1. Run: npm run allure:generate');
    console.log('  2. Run: npm run allure:serve');
    console.log('  3. View: http://localhost:8765\n');
}, 1000);
