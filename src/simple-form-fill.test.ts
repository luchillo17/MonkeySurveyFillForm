import faker = require('faker');
import puppeteer = require('puppeteer');

import { config } from '../config';

import { singleChoiceVertical, openEndedEssay } from './helpers';

jest.setTimeout(20000);

describe('Loop fill monkey survey', () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: config.headless,
    });
    page = await browser.newPage();
  });

  beforeEach(async () => {
    await page.goto(config.surveyUrl);
    await page.waitForSelector('.question-row');
  });

  afterEach(async () => {
    await (page as any)._client.send('Network.clearBrowserCookies');
  });

  afterAll(async () => {
    await browser.close();
  });

  for (let i = 0; i < config.surveyFillRequests; i++) {
    it(
      `should have question rows ${i}`,
      async () => {
        let fields = await page.$$('.question-row .question-container');

        expect(Object.keys(fields).length).toBeGreaterThan(0);
        for (const questionContainer of Object.values(fields)) {
          await singleChoiceVertical(page, questionContainer);
          await openEndedEssay(page, questionContainer);
          await page.waitFor(800);
        }

        ((await page.$('.survey-page-button')) as puppeteer.ElementHandle<HTMLButtonElement>).click();
        await page.waitForNavigation();
      },
      50000,
    );
  }
});
