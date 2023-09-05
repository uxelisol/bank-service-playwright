import { test } from "@playwright/test";
import { ExchangeRatesPage } from "../../../page-object-model/exchange-rates.page";
import { Hrefs } from "../../../data/test-data/href-values.enum";
import { Helpers } from "../../../helpers/helpers";

test.describe("US-1.8 Exchange Rates", () => {
    let exchangeRatesPage: ExchangeRatesPage;
    let helpers: Helpers;

    test.beforeEach(async ({ page }) => {
        helpers = new Helpers(page);
        exchangeRatesPage = new ExchangeRatesPage(page);
        await page.goto(Hrefs.EXCHANGE_RATES);
    });

    test("T36234950 Check the functionality of breadcrumbs (Logged out user)", async ({ page }) => {     
        await helpers.clickOnElement(exchangeRatesPage.breadcumbsHome);        

        await helpers.verifyUrl("/");
    });

    test("T36234952 Check the possibility of choosing currency using 'Currency from' button", async ({ page }) => {
        const beforeChoose =  await page.locator(exchangeRatesPage.firstCurrencySellRate).textContent();
        const afterChoose = await page.locator(exchangeRatesPage.firstCurrencyBuyRate).textContent();

        await helpers.typeTextToElement(exchangeRatesPage.currencyConverterInputFrom,'1');

        await helpers.verifyValue(exchangeRatesPage.currencyConverterInputTo,beforeChoose);

        await helpers.clickOnElement(exchangeRatesPage.swapButton);

        await helpers.verifyValue(exchangeRatesPage.currencyConverterInputTo,afterChoose);
    });
   
    test("T36234953 Check the possibility of choosing currency using 'Currency to' button", async ({ page }) => {
        await helpers.clickOnElement(exchangeRatesPage.currencyConverterSelectFrom);

        await helpers.verifyElementIsVisible(exchangeRatesPage.poupUpFrom);
       
        await page.keyboard.press('Enter');

        await helpers.verifyElementIsNotVisible(exchangeRatesPage.poupUpFrom);

        await helpers.clickOnElement(exchangeRatesPage.currencyConverterSelectTo);

        await helpers.verifyElementIsVisible(exchangeRatesPage.poupUpTo);
    });

    test("T36234954 Check the functionality of 'Swap' button", async ({ page }) => {
        const valueBeforeSwap = await page.locator(exchangeRatesPage.currentPriceLabel).textContent();

        await helpers.clickOnElement(exchangeRatesPage.swapButton);

        const valueAfterSwap = await page.locator(exchangeRatesPage.currentPriceLabel).textContent();

        await helpers.verifyIsValueNotEqual(valueBeforeSwap,valueAfterSwap);
    });

    test("T36234955 Check the value calculation of 'Amount out' field", async ({ page }) => {
        const sellRate: any = await page.locator(exchangeRatesPage.firstCurrencySellRate).textContent();
        const convertedSumm = Math.round(Math.random()*10);        
        const expectedSum = (convertedSumm*sellRate).toFixed(2).toString();

        await helpers.typeTextToElement(exchangeRatesPage.currencyConverterInputFrom, convertedSumm.toString());
        
        await helpers.verifyValue(exchangeRatesPage.currencyConverterInputTo, expectedSum);
    });
});