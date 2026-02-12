import { Before, After, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';
import { ScreenshotUtils } from '../utils/ScreenshotUtils';

let browser: Browser;
setDefaultTimeout(30000);

Before(async function () {
    browser = await chromium.launch({ 
        headless: false,
        args: ['--start-maximized', '--window-size=1920,1440']
    });
    this.page = await browser.newPage({ viewport: null });
});

After(async function (scenario) {
    if (!this.page) return;
    
    if (scenario.result?.status === Status.FAILED) {
        const scenarioName = scenario.pickle?.name || 'Unknown';
        const { data, filename } = await ScreenshotUtils.captureScreenshotAsBase64(this.page, scenarioName);
        
        if (data) {
            const buffer = Buffer.from(data, 'base64');
            this.attach(buffer, 'image/png');
        }
    }
    
    try {
        if (this.page) await this.page.close();
        if (browser) await browser.close();
    } catch (e) {
        // Continue
    }
});
