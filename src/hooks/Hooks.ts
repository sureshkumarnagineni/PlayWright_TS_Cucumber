import { Before, After, setDefaultTimeout, Status, ITestCaseHookParameter } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';
import { Buffer } from 'buffer';
import { ScreenshotUtils } from '../utils/ScreenshotUtils';

// Define the World interface for TypeScript
interface CustomWorld {
    browser?: Browser;
    page?: Page;
    attach?: (data: string | Buffer, mediaType: string) => void;
}

setDefaultTimeout(60000);

Before(async function (this: CustomWorld) {
    this.browser = await chromium.launch({
        headless: false,
        args: ['--start-maximized', '--window-size=1920,1440']
    });
    this.page = await this.browser.newPage({ viewport: null });
});

After(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
    if (!this.page) return;

    if (scenario.result?.status === Status.FAILED) {
        const scenarioName = scenario.pickle?.name || 'Unknown';
        const timestamp = new Date().toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).replace(', ', ' ');

        try {
            const { data, filename } = await ScreenshotUtils.captureScreenshotAsBase64(this.page, scenarioName);

            if (data && this.attach) {
                // Attach screenshot as binary image
                const buffer = Buffer.from(data, 'base64');
                this.attach(buffer, 'image/png');

                // Attach failure details
                const failureDetails = `Scenario: ${scenarioName}\nFailed At: ${timestamp}\nError: ${scenario.result?.message || 'Test failed'}`;
                this.attach(failureDetails, 'text/plain');

                console.log(`📸 Screenshot captured for failed test: ${scenarioName}`);
            }
        } catch (err) {
            console.error(`⚠️ Failed to capture screenshot: ${err instanceof Error ? err.message : String(err)}`);
        }
    }

    try {
        if (this.page) await this.page.close();
        if (this.browser) await this.browser.close();
    } catch (e) {
        // Continue - silence errors during cleanup
    }
});