const fs = require('fs');
const path = require('path');

try {
    console.log('\n🔧 Preparing Allure environment files...\n');
    
    const projectRoot = path.resolve(__dirname);
    const now = new Date();
    
    // Format system time
    const systemDateString = now.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).replace(', ', ' ');
    
    // Create environment files for Allure
    const envProps = `Project.Name=Test_PW_TS
Environment=QA
Browser=Chrome
System.Time=${systemDateString}`;
    
    fs.writeFileSync(path.join(projectRoot, 'allure-results', 'environment.properties'), envProps);
    console.log('✅ Environment properties created');
    
    // Create environment.json
    const environmentJson = {
        'Project': 'Test_PW_TS',
        'Environment': 'QA',
        'Browser': 'Chrome',
        'System Time': systemDateString,
        'Generated': new Date().toISOString()
    };
    fs.writeFileSync(path.join(projectRoot, 'allure-results', 'environment.json'), JSON.stringify(environmentJson, null, 2));
    console.log('✅ Environment JSON created');
    
    // Create categories.json
    const categoriesJson = [
        {
            name: 'Passed',
            matchedStatuses: ['passed']
        },
        {
            name: 'Failed',
            matchedStatuses: ['failed']
        }
    ];
    fs.writeFileSync(path.join(projectRoot, 'allure-results', 'categories.json'), JSON.stringify(categoriesJson, null, 2));
    console.log('✅ Categories JSON created\n');
    
} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}
