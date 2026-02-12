const fs = require('fs');
const path = require('path');

/**
 * Convert timestamp to IST and format as dd/MM/yyyy HH:mm:ss
 */
function formatDateToIST(timestamp) {
    const date = new Date(timestamp);
    
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
    
    // Parse and return (format: dd/MM/yyyy HH:mm:ss IST)
    return istTimeString.replace(', ', ' ') + ' IST';
}

/**
 * Format duration in human readable format
 */
function formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
        return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${seconds % 60}s`;
    } else {
        return `${seconds}s ${ms % 1000}ms`;
    }
}

/**
 * Post-process Allure report to customize date format to dd/MM/yyyy (IST)
 */

console.log('🎨 Customizing Allure report with IST timezone and dd/MM/yyyy format...');

// Get current system time
const now = new Date();
console.log(`📅 System Time: ${now.toLocaleString()}`);
console.log(`📅 IST Time: ${formatDateToIST(now.getTime())}`);

// Update summary.json
const widgetsPath = 'Reports/allure-report/output/widgets/summary.json';
if (fs.existsSync(widgetsPath)) {
    try {
        const summary = JSON.parse(fs.readFileSync(widgetsPath, 'utf8'));
        
        // Get current IST time
        const istDate = formatDateToIST(Date.now());
        
        // Update report name with custom date format (dd/MM/yyyy HH:mm:ss IST)
        summary.reportName = `Test_PW_TS - ${istDate}`;
        
        // Update time if exists
        if (summary.time) {
            summary.time.start = now.getTime();
            summary.time.stop = now.getTime();
            summary.time.duration = summary.time.duration || 0;
        }
        
        fs.writeFileSync(widgetsPath, JSON.stringify(summary, null, 2));
        console.log(`✅ Summary updated: ${istDate}`);
    } catch (error) {
        console.error('⚠️  Could not update summary:', error.message);
    }
}

// Update widgets with IST timestamps
const widgetFiles = [
    'Reports/allure-report/output/widgets/timeline.json',
    'Reports/allure-report/output/data/timeline.json'
];

widgetFiles.forEach(widgetPath => {
    if (fs.existsSync(widgetPath)) {
        try {
            const data = JSON.parse(fs.readFileSync(widgetPath, 'utf8'));
            
            // Process timeline data
            if (Array.isArray(data)) {
                data.forEach(item => {
                    if (item.time) {
                        // Convert timestamps to IST
                        if (item.time.start) {
                            const istStart = formatDateToIST(item.time.start);
                            item.uid = `${item.name} - ${istStart}`;
                        }
                    }
                });
                
                fs.writeFileSync(widgetPath, JSON.stringify(data, null, 2));
                console.log(`✅ Updated timeline: ${path.basename(widgetPath)}`);
            }
        } catch (error) {
            // Ignore if file doesn't exist or can't be parsed
        }
    }
});

// Update index.html with custom date display
const indexPath = 'Reports/allure-report/output/index.html';
if (fs.existsSync(indexPath)) {
    try {
        let html = fs.readFileSync(indexPath, 'utf8');
        
        // Update title
        html = html.replace(/<title>.*?<\/title>/, '<title>Test_PW_TS - Allure Report (IST)</title>');
        
        // Inject custom CSS/JS to format dates as dd/MM/yyyy
        const customScript = `
<script>
// Format dates to dd/MM/yyyy HH:mm:ss IST
(function() {
    const originalToLocaleString = Date.prototype.toLocaleString;
    Date.prototype.toLocaleString = function(locale, options) {
        // Use proper IST conversion
        const istStr = originalToLocaleString.call(this, 'en-GB', {
            timeZone: 'Asia/Kolkata',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        return istStr.replace(', ', ' ') + ' IST';
    };
    
    console.log('✅ Date formatting customized to dd/MM/yyyy HH:mm:ss IST');
})();
</script>
`;
        
        // Insert before closing body tag
        html = html.replace('</body>', customScript + '</body>');
        
        fs.writeFileSync(indexPath, html);
        console.log('✅ Index.html updated with IST date formatter');
    } catch (error) {
        console.error('⚠️  Could not update index.html:', error.message);
    }
}

// Update environment info with current times
const envPath = 'allure-results/environment.properties';
if (fs.existsSync(envPath)) {
    try {
        const istTime = formatDateToIST(Date.now());
        const systemTime = now.toLocaleString();
        
        let envContent = fs.readFileSync(envPath, 'utf8');
        
        // Add timestamp info
        if (!envContent.includes('Report.Generated')) {
            envContent += `\nReport.Generated.IST=${istTime} IST\n`;
            envContent += `Report.Generated.System=${systemTime}\n`;
            envContent += `Date.Format=dd/MM/yyyy HH:mm:ss IST\n`;
        }
        
        fs.writeFileSync(envPath, envContent);
        console.log('✅ Environment properties updated with timestamps');
    } catch (error) {
        console.error('⚠️  Could not update environment.properties:', error.message);
    }
}

console.log('✅ Report customization complete!');
console.log(`📍 System Time: ${now.toLocaleString()}`);
console.log(`📍 IST Time: ${formatDateToIST(Date.now())}`);

