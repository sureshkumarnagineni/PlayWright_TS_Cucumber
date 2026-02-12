const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Format date to IST with dd/MM/yyyy format
 */
function formatDateToIST(date) {
    // Convert to IST using proper timezone conversion
    const istTimeString = date.toLocaleString('en-GB', { 
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    // Parse the formatted string (format: dd/MM/yyyy, HH:mm:ss)
    const [datePart, timePart] = istTimeString.split(', ');
    
    return {
        full: `${datePart} ${timePart} IST`,
        date: datePart,
        time: timePart,
        displayFormat: `${datePart} ${timePart} IST`,  // dd/MM/yyyy HH:mm:ss IST
        timestamp: date.getTime()
    };
}

try {
    console.log('\n================================');
    console.log('Allure Report Generator');
    console.log('================================\n');
    
    const now = new Date();
    const systemTime = now.toLocaleString();
    const istFormatted = formatDateToIST(now);
    
    console.log('📅 System Time:', systemTime);
    console.log('📅 IST Time:', istFormatted.full);
    console.log('');
    
    // Create environment.properties for project info
    const envProps = `Project.Name=Test_PW_TS
Environment=QA
Browser=Chrome
Timezone=IST (Asia/Kolkata)
Date.Format=dd/MM/yyyy HH:mm:ss IST
System.Time=${systemTime}
IST.Time=${istFormatted.displayFormat}
Report.Generated=${istFormatted.displayFormat}`;
    
    fs.writeFileSync('allure-results/environment.properties', envProps);
    console.log('✅ Environment properties created with IST timestamps');
    
    // Create executor.json for build info with IST timezone
    const executorInfo = {
        name: 'Test_PW_TS',
        type: 'cucumber',
        buildName: `Build-${istFormatted.date.replace(/\//g, '')}`,
        buildOrder: istFormatted.timestamp,
        buildUrl: 'http://localhost:8765',
        reportName: `Test_PW_TS - ${istFormatted.displayFormat}`,
        reportUrl: 'http://localhost:8765',
        buildStart: istFormatted.timestamp,
        buildStop: istFormatted.timestamp
    };
    fs.writeFileSync('allure-results/executor.json', JSON.stringify(executorInfo, null, 2));
    console.log('✅ Executor info created with IST timestamps');
    console.log('');
    
    // Ensure output directory exists
    const outputDir = 'Reports/allure-report/output';
    if (fs.existsSync(outputDir)) {
        fs.rmSync(outputDir, { recursive: true, force: true });
    }
    fs.mkdirSync(outputDir, { recursive: true });
    
    // Generate allure report using the .cmd wrapper on Windows with IST timezone
    const allurePath = path.join(__dirname, 'node_modules', '.bin', 'allure.cmd');
    const env = Object.assign({}, process.env, {
        TZ: 'Asia/Kolkata',
        LANG: 'en_IN.UTF-8'
    });
    execSync(`"${allurePath}" generate allure-results --clean -o Reports/allure-report/output`, { 
        stdio: 'inherit',
        shell: 'cmd.exe',
        env: env
    });
    
    console.log('✅ Allure report generated successfully');
    
    // Customize report for dd/MM/yyyy format and IST
    console.log('🎨 Customizing report format...');
    require('./customize-report.js');
    
} catch (error) {
    console.error('❌ Error generating report:', error.message);
    process.exit(1);
}
