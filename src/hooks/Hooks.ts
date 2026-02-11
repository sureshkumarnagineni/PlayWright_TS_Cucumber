import { Before, After , setDefaultTimeout} from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';

let browser: Browser;
setDefaultTimeout(60000);
Before(async function () {
    browser = await chromium.launch({ headless: false });
    this.page = await browser.newPage();
});

After(async function () {
    await this.page.close();
    await browser.close();
});