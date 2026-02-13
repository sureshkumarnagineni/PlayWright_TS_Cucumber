import * as fs from 'fs';
import * as path from 'path';

export class ScreenshotUtils {
    private static screenshotsDir = path.join(process.cwd(), 'Reports', 'screenshots');

    /**
     * Ensure screenshots directory exists
     */
    static ensureScreenshotsDir() {
        if (!fs.existsSync(this.screenshotsDir)) {
            fs.mkdirSync(this.screenshotsDir, { recursive: true });
        }
    }

    /**
     * Capture screenshot with timestamp and scenario name
     */
    static async captureScreenshot(page: any, scenarioName: string): Promise<string> {
        try {
            this.ensureScreenshotsDir();

            const timestamp = new Date().toISOString()
                .replace(/[:.]/g, '-')
                .split('T')[0] + '_' +
                new Date().getHours().toString().padStart(2, '0') +
                new Date().getMinutes().toString().padStart(2, '0') +
                new Date().getSeconds().toString().padStart(2, '0');

            const sanitizedName = scenarioName
                .toLowerCase()
                .replace(/[^a-z0-9]/g, '_')
                .substring(0, 50);

            const filename = `${sanitizedName}_${timestamp}.png`;
            const filepath = path.join(this.screenshotsDir, filename);

            await page.screenshot({ path: filepath, fullPage: true });
            console.log(`✓ Screenshot captured: ${filename}`);

            return filepath;
        } catch (error: any) {
            console.error(`✗ Failed to capture screenshot: ${error.message}`);
            return '';
        }
    }

    /**
     * Get relative path for screenshot (for reports)
     */
    static getRelativePath(filepath: string): string {
        return path.relative(process.cwd(), filepath);
    }

    /**
     * Save screenshot as base64 for report attachment
     */
    static async captureAsBase64(page: any): Promise<string> {
        try {
            const buffer = await page.screenshot({ fullPage: true });
            return buffer.toString('base64');
        } catch (error: any) {
            console.error(`✗ Failed to capture screenshot as base64: ${error.message}`);
            return '';
        }
    }

    /**
     * Capture screenshot and return as base64 with filename (for embedding)
     */
    static async captureScreenshotAsBase64(page: any, scenarioName: string): Promise<{ data: string, filename: string }> {
        try {
            const buffer = await page.screenshot({ fullPage: true });

            const timestamp = new Date().toISOString()
                .replace(/[:.]/g, '-')
                .split('T')[0] + '_' +
                new Date().getHours().toString().padStart(2, '0') +
                new Date().getMinutes().toString().padStart(2, '0') +
                new Date().getSeconds().toString().padStart(2, '0');

            const sanitizedName = scenarioName
                .toLowerCase()
                .replace(/[^a-z0-9]/g, '_')
                .substring(0, 50);

            const filename = `${sanitizedName}_${timestamp}.png`;
            const base64Data = buffer.toString('base64');

            // Also save file to Reports/screenshots for archival
            this.ensureScreenshotsDir();
            const filepath = path.join(this.screenshotsDir, filename);
            try {
                fs.writeFileSync(filepath, buffer);
                console.log(`✓ Screenshot saved: ${filepath}`);
            } catch (e) {
                // File saving optional, continue with embedding
            }

            return { data: base64Data, filename };
        } catch (error: any) {
            console.error(`✗ Failed to capture screenshot: ${error.message}`);
            return { data: '', filename: '' };
        }
    }
}
