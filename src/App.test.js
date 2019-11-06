const puppeteer = require('puppeteer');

const isDebugging = () => {
  let debugging_mode = {
    headless: false,
    slowMo: 250,
    devtools: false,
    // executablePath: string,
    // timeout: number,
    // ignoreHTTPSErrors: bool
  };
  return process.env.NODE_ENV === 'debug' ? debugging_mode : {};
};

describe('on page load', () => {
  test('link loads correctly', async () => {
    let browser = await puppeteer.launch(isDebugging());
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 480,
        height: 1920
      },
      userAgent: ''
    })

    await page.goto('http://localhost:3000/');
    //.$eval its like a document.querySelector
    const html = await page.$eval('.App-link', e => e.innerHTML);

    expect(html).toBe('Learn React');

    browser.close();
  })
});
