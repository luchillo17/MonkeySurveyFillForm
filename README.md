# Automated Monkey Survey Fill Form

## Description

This project auto-fills monkey surveys using faker, jest, puppeteer and TypeScript.

## Installation

This project might not work in Windows, it's made in Linux based systems so Mac should work as well.

- Install pre-requisites: Node.js & NPM (usually installing Node.js also installs NPM).
- Install dependencies: Use `npm i` command in terminal inside the project root folder.
- Modify config: Change the survey url & number of survey fills in `config.ts` file.
- Run filler: Run the filler with command `npm test`.

## Config options

There's 3 things you can config in file `config.ts`:

1. `headless`: When true the browser will not show in window, when false you'll see the browser executing all clicks & keystrokes, this is useful for debugging so for normal use should remain in true.
2. `surveyFillRequests`: This tells the program how many surveys to auto-fill & send.
3. `surveyUrl`: Self explanatory name, it's the url of the survey you want to auto-fill.
