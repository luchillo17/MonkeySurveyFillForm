import puppeteer = require('puppeteer');
import faker = require('faker');

export async function singleChoiceVertical(page: puppeteer.Page, questionContainer: puppeteer.ElementHandle) {
  const questionType: string = await page.evaluate(
    (container: HTMLDivElement) => container.getAttribute('data-question-type'),
    questionContainer,
  );

  const isQuestionType = /single_choice_vertical/.exec(questionType) !== null;

  if (!isQuestionType) {
    return;
  }

  expect(isQuestionType).toBeTruthy();

  const labels = await questionContainer.$$('.answer-option-cell');

  expect(labels.length).toBeGreaterThan(0);

  const randomLabelIndex = Math.floor(Math.random() * labels.length);

  labels[randomLabelIndex].click();
  await page.waitFor(
    (container: HTMLDivElement) => {
      const checked = container.querySelector('.checked');
      return checked !== null;
    },
    {},
    questionContainer,
  );

  const checkedAmount: Number = await page.evaluate(
    (container: HTMLDivElement) => container.querySelectorAll('.checked').length,
    questionContainer,
  );
  expect(checkedAmount).toBeGreaterThan(0);
}

export async function openEndedEssay(page: puppeteer.Page, questionContainer: puppeteer.ElementHandle) {
  const questionType: string = await page.evaluate(
    (container: HTMLDivElement) => container.getAttribute('data-question-type'),
    questionContainer,
  );

  const isOpenEndedEssay = /open_ended_essay/.exec(questionType) !== null;

  if (!isOpenEndedEssay) {
    return;
  }

  expect(isOpenEndedEssay).toBeTruthy();

  const textArea = (await questionContainer.$('textarea')) as puppeteer.ElementHandle<HTMLAreaElement>;

  expect(textArea).not.toBeNull();

  await textArea.type(faker.lorem.sentence(6));

  await page.waitFor(
    (container: HTMLDivElement) => {
      const hiddenButton = container.parentElement!.querySelector('button:not(.hide)');
      return hiddenButton !== null;
    },
    {},
    questionContainer,
  );

  const okButton = (await page.evaluateHandle(
    (container: HTMLDivElement) => container.parentElement!.querySelector('button'),
    questionContainer,
  )) as puppeteer.ElementHandle<HTMLButtonElement>;

  expect(okButton).not.toBeNull();

  okButton.click();
}
