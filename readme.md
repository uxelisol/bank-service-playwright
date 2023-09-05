# ******

## Project Description

****** is a desktop web application providing services for the bank clients. The system shall allow individuals to get the info about the bank services (loans, deposits, cards), make payments, e.g. pay for internet communications and digital TV services, utilities. Using RBSS, it will be possible to top up e-wallets, make payments using arbitrary bank account details, transfers between deposits and bank cards, as well as transfer funds to customers of the Bank and other banks, exchange currency, and issue new banking products.

---

### **AQA technology stack:**

- Main programming language: Typescript;
- Test frameworks: Playwright;
- Reporter: Allure;

Allure report link - *******

---

## Coding & naming conventions

- Xpath locators to find elements;
- Double quotes to surround string data (single quotes inside);
- Extensions in file names - .page.ts' for page objects, .enum.ts' for enum files, etc.;
- For methods: lowerCamelCase;
- For global const: CONSTANT_CASE;
- For enum names: CamelCase;
- For enum keys: CONSTANT_CASE;
- For class instances: lowerCamelCase;
- For folder and file names: kebab-case;
- For interfaces: CamelCase;

---

## Available Scripts

After cloning in the project directory, you can run:

### `npm i`

Uses to install all dependencies for a project. This is most commonly used when you
have just checked out code for a project, or when another developer on the project has
added a new dependency that you need to pick up.
[Read more](https://docs.npmjs.com/cli/v8/commands/npm-install)

### `npm run run-tests-headed`

Uses to run tests in UI mode.

### `npm run run-tests-headless`

Uses to run tests in headless mode (without UI).

### `npm run allure:report`

Uses to generate report after test run.

### `npx allure open allure-report`

Uses to open report (Allure will create a local server and open report in browser).

---

## Git flow

### Pushing directly to main is not allowed!

### Before commit\MR, you should definitely run your tests to make sure they work

- Before creating an MR, make sure that your tests are in working order, when creating, set the "E2E review required" label;
- After creating the MR, we conduct a cross-review with our colleagues from the automation team. If all comments are corrected - team members confirm the MR;
- Then MR will be checked by our tech lead;
- After the "E2E review OK" was setted, you can merge into the main branch (squash your commits first if you have many);

### Branch Naming:

_EXAMPLE:_ e2e/PN-3263-US-1.10W

- type of tests (e2e, api)
- task number from Jira
- user story

---

## Learn More

You can learn more in the [****** Wiki Home](https://*********)
