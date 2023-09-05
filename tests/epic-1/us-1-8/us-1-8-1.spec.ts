import { test, expect } from "@playwright/test";
import { MainPage } from "../../../page-object-model/main.page";
import { ExchangeRatesPage } from "../../../page-object-model/exchange-rates.page";
import { Hrefs } from "../../../data/test-data/href-values.enum";
import { Helpers } from "../../../helpers/helpers";
import { Credentials } from "../../../data/test-data/credentials-values.enum";

test.describe("US-1.8 Exchange Rates(Loged in)", () => {
  let exchangeRatesPage: ExchangeRatesPage;
  let helpers: Helpers;
  let mainPage: MainPage;
  
  test.beforeEach(async ({ page }) => {
    exchangeRatesPage = new ExchangeRatesPage(page);
    mainPage = new MainPage(page);
    helpers = new Helpers(page);
    
  });

  test("T36234951 Check the functionality of breadcrumbs (Logged in user)", async ({ page }) => {
    await page.goto("/");
    await mainPage.enterEmailAndPassword(`${Credentials.USER_EMAIL}`,`${Credentials.PASSWORD}`);
    await helpers.clickOnElement(mainPage.logInButton);
    await helpers.verifyUrl(Hrefs.MAIN_MENU);

    await page.goto(Hrefs.EXCHANGE_RATES);
    await helpers.clickOnElement(exchangeRatesPage.breadcumbsHome);        

    await helpers.verifyUrl(Hrefs.MAIN_MENU);
  });
});
