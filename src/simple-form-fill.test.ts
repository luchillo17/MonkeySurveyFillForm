import faker = require('faker');
import puppeteer = require('puppeteer');

describe('Loop fill monkey survey', () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
  });

  beforeEach(async () => {
    await page.goto('https://www.surveymonkey.com/r/VZ5PCJP');
    await page.waitForSelector('.question-row');
  });

  afterEach(async () => {
    const cookies = await page.cookies();
    await page.deleteCookie(...cookies.map(cookie => ({ name: cookie.name })));
  });

  it('should have question rows', async () => {
    let fields = await page.evaluate(() =>
      document.querySelectorAll('.question-row'),
    );
    console.log('====================================');
    console.log('Fields: ', fields);
    console.log('====================================');
    expect(fields.length).toBeGreaterThan(0);
  });
});
