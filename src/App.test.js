const puppeteer = require('puppeteer');
const faker = require('faker');

const user = {
  email: faker.internet.email(),
  password: 'test',
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName()
}

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
  })

  test('menu loading', async () => {
    const navbar = await page.$eval('.navbar', el => el ? true : false);
    //$$ like a document.querySelectorAll
    const menu = await page.$$('.nav-li');

    expect(navbar).toBe(true);
    expect(menu.length).toBe(4);
  });
});


afterAll(() => {
  if (isDebugging()) {
    browser.close();
  }
});
