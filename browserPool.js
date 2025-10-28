// Content of browserPool.js goes here

const { Pool } = require('puppeteer');

class BrowserPool {
    constructor() {
        this.pool = new Pool();
    }

    async getBrowser() {
        return await this.pool.acquire();
    }

    async releaseBrowser(browser) {
        await this.pool.release(browser);
    }
}

module.exports = new BrowserPool();