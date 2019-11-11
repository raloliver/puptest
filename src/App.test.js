const puppeteer = require('puppeteer');
const faker = require('faker');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

const user = {
  email: faker.internet.email(),
  password: 'test',
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName()
}

const isDebugging = () => {
  let debugging_mode = {
    headless: false,
    slowMo: 50,
    devtools: true,
    // executablePath: string,
    // timeout: number,
    // ignoreHTTPSErrors: bool
  };
  return process.env.NODE_ENV === 'debug' ? debugging_mode : {};
};

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch(isDebugging());
  page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  page.emulate({
    viewport: {
      width: 480,
      height: 1920
    },
    userAgent: ''
  })
});

describe('on page load', () => {
  test('link loads correctly', async () => {
    //.$eval its like a document.querySelector
    const html = await page.$eval('.App-link', e => e.innerHTML);

    expect(html).toBe('Learn React');
  }, 16000);

  test('menu loading', async () => {
    const navbar = await page.$eval('.navbar', el => el ? true : false);
    //$$ like a document.querySelectorAll
    const menu = await page.$$('.nav-li');

    expect(navbar).toBe(true);
    expect(menu.length).toBe(4);
  });

  test('login works correctly', async () => {
    await page.click('[data-testid="firstName"]');
    await page.type('[data-testid="firstName"]', user.firstName);

    await page.click('[data-testid="lastName"]');
    await page.type('[data-testid="lastName"]', user.lastName);

    await page.click('[data-testid="email"]');
    await page.type('[data-testid="email"]', user.email);

    await page.click('[data-testid="password"]');
    await page.type('[data-testid="password"]', user.password);

    await page.click('[data-testid="submit"]');

    //use method .tap() to simulate touch screen event
    await page.waitForSelector('[data-testid="success"]');
  }, 16000)
});


afterAll(() => {
  if (isDebugging()) {
    browser.close();
  }
});
