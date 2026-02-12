const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
    console.log('Generating Allure report...');
    
    // Ensure output directory exists
    const outputDir = 'Reports/allure-report/output';
    if (fs.existsSync(outputDir)) {
        fs.rmSync(outputDir, { recursive: true, force: true });
    }
    fs.mkdirSync(outputDir, { recursive: true });
    
    // Generate allure report using the .cmd wrapper on Windows
    const allurePath = path.join(__dirname, 'node_modules', '.bin', 'allure.cmd');
    execSync(`"${allurePath}" generate allure-results --clean -o Reports/allure-report/output`, { 
        stdio: 'inherit',
        shell: 'cmd.exe'
    });
    
    console.log('✅ Allure report generated successfully');
} catch (error) {
    console.error('❌ Error generating report:', error.message);
    process.exit(1);
}
