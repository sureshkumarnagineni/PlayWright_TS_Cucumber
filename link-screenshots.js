const fs = require('fs');
const path = require('path');

/**
 * Link screenshots to failed tests in cucumber.json
 */

console.log('🔗 Linking screenshots to failed tests...\n');

const screenshotsDir = 'Reports/screenshots';
const cucumberJsonPath = 'allure-results/cucumber.json';

if (!fs.existsSync(screenshotsDir)) {
    console.log('⚠️  Screenshots directory not found');
    process.exit(0);
}

if (!fs.existsSync(cucumberJsonPath)) {
    console.log('⚠️  cucumber.json not found');
    process.exit(0);
}

try {
    // Read all screenshots
    const screenshots = fs.readdirSync(screenshotsDir)
        .filter(f => f.endsWith('.png') && f !== '.gitkeep');

    if (screenshots.length === 0) {
        console.log('⚠️  No screenshots found');
        process.exit(0);
    }

    console.log(`📸 Found ${screenshots.length} screenshots`);

    // Read cucumber.json
    const cucumberData = JSON.parse(fs.readFileSync(cucumberJsonPath, 'utf8'));
    let attachmentsAdded = 0;

    // Process each feature
    cucumberData.forEach(feature => {
        if (!feature.elements) return;

        feature.elements.forEach(scenario => {
            if (!scenario.steps) return;

            // Check if scenario has failed steps
            const hasFailed = scenario.steps.some(step => 
                step.result && step.result.status === 'failed'
            );

            if (hasFailed) {
                // Create sanitized name to match screenshot
                const sanitizedScenarioName = scenario.name
                    .toLowerCase()
                    .replace(/[^a-z0-9]/g, '_')
                    .substring(0, 50);

                // Find matching screenshot
                const matchingScreenshot = screenshots.find(s => 
                    s.includes(sanitizedScenarioName)
                );

                if (matchingScreenshot) {
                    const screenshotPath = path.join(screenshotsDir, matchingScreenshot);
                    const screenshotBuffer = fs.readFileSync(screenshotPath);
                    const base64Data = screenshotBuffer.toString('base64');

                    // Find the failed step and add screenshot
                    scenario.steps.forEach(step => {
                        if (step.result && step.result.status === 'failed') {
                            // Initialize embeddings array if not exists
                            if (!step.embeddings) {
                                step.embeddings = [];
                            }

                            // Add screenshot embedding
                            step.embeddings.push({
                                mime_type: 'image/png',
                                data: base64Data
                            });

                            attachmentsAdded++;
                            console.log(`✅ Attached to: ${scenario.name}`);
                        }
                    });

                    // Also add to After hook for visibility
                    const afterHook = scenario.steps.find(s => s.keyword === 'After');
                    if (afterHook && !afterHook.embeddings) {
                        afterHook.embeddings = [];
                    }
                    if (afterHook) {
                        afterHook.embeddings.push({
                            mime_type: 'image/png',
                            data: base64Data
                        });
                    }
                }
            }
        });
    });

    // Save updated cucumber.json
    fs.writeFileSync(cucumberJsonPath, JSON.stringify(cucumberData, null, 2));
    console.log(`\n✅ Screenshots embedded: ${attachmentsAdded} attachments added\n`);

} catch (error) {
    console.error('❌ Error linking screenshots:', error.message);
}
