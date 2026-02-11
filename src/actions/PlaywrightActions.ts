import { Page, expect } from '@playwright/test';

export class PlaywrightActions {
    private softErrors: string[] = [];

    constructor(private page: Page) {}

    async goto(url: string) { await this.page.goto(url); }

    async type(locator: string, text: string) {
        await this.page.waitForSelector(locator, { state: 'visible' });
        await this.page.fill(locator, text);
    }

    async click(locator: string) {
        await this.page.waitForSelector(locator, { state: 'visible' });
        await this.page.click(locator);
    }

    // Hard Assertions
    async assertVisible(locator: string) {
        await expect(this.page.locator(locator)).toBeVisible({ timeout: 5000 });
    }

    async assertUrl(partialUrl: string) {
        await expect(this.page).toHaveURL(new RegExp(partialUrl));
    }

    // Soft Assertions
    async softAssertText(locator: string, expectedText: string) {
        try {
            const actualText = await this.page.textContent(locator);
            if (actualText?.trim() !== expectedText) {
                throw new Error(`Expected "${expectedText}" but found "${actualText?.trim()}"`);
            }
        } catch (error: any) {
            this.softErrors.push(error.message);
        }
    }

    assertAll() {
        if (this.softErrors.length > 0) {
            const msg = this.softErrors.join('\n');
            this.softErrors = [];
            throw new Error(`Soft Assertion Failures:\n${msg}`);
        }
    }
    async wait(seconds: number) {
    // Converts seconds to milliseconds (e.g., 2 becomes 2000)
   try {
    await this.page.waitForTimeout(seconds * 1000);
   } catch (error) {
    
   }
    
}
}