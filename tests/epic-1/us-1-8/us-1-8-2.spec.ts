import { CssValues } from './../../../data/test-data/css-values.enum';
import { test } from "@playwright/test";
import { ExchangeRatesPage } from "../../../page-object-model/exchange-rates.page";
import { Hrefs } from "../../../data/test-data/href-values.enum";
import { Helpers } from "../../../helpers/helpers";
import { TextGenerator } from '../../../helpers/textGenerator';
import { ExchangeRatesData } from '../../../data/text-data/exchange-rates.enum';

test.describe("US-1.8 Exchange Rates(UI)", () => {
    let exchangeRatesPage: ExchangeRatesPage;
    let helpers: Helpers;
    let textGenerator: TextGenerator;

    test.beforeEach(async ({ page }) => {
        helpers = new Helpers(page);
        exchangeRatesPage = new ExchangeRatesPage(page);
        textGenerator = new TextGenerator();
        await page.goto(Hrefs.EXCHANGE_RATES);
    });

    test("C6179844	UI:Exchange rates page elements(Titles)", async () => {     
       await helpers.checkElementCssStyle(exchangeRatesPage.titleExchangeRate, "font-size", "24px");
       await helpers.checkElementCssStyle(exchangeRatesPage.titleExchangeRate, "font-weight", "700");
       await helpers.checkElementCssStyle(exchangeRatesPage.titleCurrencyConverter, "font-size", "24px");
       await helpers.checkElementCssStyle(exchangeRatesPage.titleCurrencyConverter, "font-weight", "700");
    });

    test("C6179844	UI:Exchange rates page elements(Timer)", async () => {     
        await helpers.verifyContainText(exchangeRatesPage.dateAndTime, /\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/);
    });

    test("C6179844	UI:Exchange rates page elements(breadcrumbs)", async () => {     
        await helpers.verifyContainText(exchangeRatesPage.breadcumbs, "Exchange rates");
    });

    test("C6179844	UI:Exchange rates page elements(Currency rate)", async () => {     
        await helpers.checkElementCssStyle(exchangeRatesPage.exchangeRatesFirstRow, "border-bottom", CssValues.LIGHT_GREY_BORDER);
    });

    test("C6179844	UI:Exchange rates page elements(Currency converter)", async () => {     
        await helpers.verifyElementIsVisibleAndEnabled(exchangeRatesPage.swapButton);
        await helpers.verifyContainText(exchangeRatesPage.currencyConverterFromShort, "GBP");

    });

    test("T36234952 Check the possibility of choosing currency using 'Currency from' button", async ({ page }) => {
        await helpers.verifyContainText(exchangeRatesPage.currencyConverterFromShort, "GBP");

        await helpers.clickOnElement(exchangeRatesPage.currencyConverterSelectFrom);

        await helpers.verifyElementIsVisible(exchangeRatesPage.openedListOfCurrency);

        await helpers.checkElementCount(exchangeRatesPage.currenciesInList, 2);

        await page.locator(exchangeRatesPage.currenciesInList).locator('nth=1').click();

        await helpers.verifyContainText(exchangeRatesPage.currencyConverterFromShort, "USD");
    });

    test("C6179982	Check the possibility of choosing currency using 'Currency to' button", async ({ page }) => {
        await helpers.verifyContainText(exchangeRatesPage.currencyConverterToShort, "EUR");

        await helpers.clickOnElement(exchangeRatesPage.currencyConverterSelectFrom);

        await helpers.verifyElementIsVisible(exchangeRatesPage.openedListOfCurrency);

        await helpers.checkElementCount(exchangeRatesPage.currenciesInList, 2);

        await page.locator(exchangeRatesPage.currenciesInList).locator('nth=0').click();

        await helpers.verifyContainText(exchangeRatesPage.currencyConverterFromShort, "GBP");
    });

    test("C6179983 Check the validation of the 'Amount in' input field", async () => {
        const amount = textGenerator.makeString(1, "number");

        await helpers.typeTextToElement(exchangeRatesPage.currencyConverterInputFrom, amount);
        
        await helpers.verifyElementIsNotVisible(exchangeRatesPage.convertFromHelper);
    });

    test("C6179983 Check the validation of the 'Amount in' input field(Latin letters)", async () => {
        const amount = textGenerator.makeString(3, "lower");

        await helpers.typeTextToElement(exchangeRatesPage.currencyConverterInputFrom, amount);
        
        await helpers.verifyElementIsVisible(exchangeRatesPage.convertFromHelper);
        await helpers.checkElementCssStyle(exchangeRatesPage.convertFromHelper, "color", CssValues.RED_COLOR);
    });

    test("C6179983 Check the validation of the 'Amount in' input field(Cyrillic letters)", async () => {
        const amount = textGenerator.makeString(3, "cyrillic");

        await helpers.typeTextToElement(exchangeRatesPage.currencyConverterInputFrom, amount);
        
        await helpers.verifyElementIsVisible(exchangeRatesPage.convertFromHelper);
        await helpers.checkElementCssStyle(exchangeRatesPage.convertFromHelper, "color", CssValues.RED_COLOR);
    });

    test("C6179983 Check the validation of the 'Amount in' input field(special characters)", async () => {
        const amount = textGenerator.makeString(2, "specialCharacters");

        await helpers.typeTextToElement(exchangeRatesPage.currencyConverterInputFrom, amount);
        
        await helpers.verifyElementIsVisible(exchangeRatesPage.convertFromHelper);
        await helpers.checkElementCssStyle(exchangeRatesPage.convertFromHelper, "color", CssValues.RED_COLOR);
    });

    test("C6179984	Check the functionality of 'Swap' button", async () => {
        await helpers.verifyContainText(exchangeRatesPage.currencyConverterFromShort, "GBP");
        await helpers.verifyContainText(exchangeRatesPage.currencyConverterToShort, "EUR");

        await helpers.clickOnElement(exchangeRatesPage.swapButton);

        await helpers.verifyContainText(exchangeRatesPage.currencyConverterFromShort, "EUR");
        await helpers.verifyContainText(exchangeRatesPage.currencyConverterToShort, "GBP");
    });

    test("C6185302	Check the validation of the 'Amount in' input field (number of 15 symbols)", async () => {
        const amount = textGenerator.makeString(15, "number");
        
        await helpers.typeTextToElement(exchangeRatesPage.currencyConverterInputFrom, amount);

        await helpers.verifyElementIsNotVisible(exchangeRatesPage.convertFromHelper);
    });

    test("C6185302	Check the validation of the 'Amount in' input field (number of 16 symbols)", async () => {
        const amount = textGenerator.makeString(16, "number");

        await helpers.typeTextToElement(exchangeRatesPage.currencyConverterInputFrom, amount);

        await helpers.verifyContainText(exchangeRatesPage.convertFromHelper, ExchangeRatesData.TO_LARGE_AMOUNT_MESSAGE);
        await helpers.checkElementCssStyle(exchangeRatesPage.convertFromHelper, "color", CssValues.RED_COLOR);
    });

    test("C6186401	Check the possibility to put in data in Amount out field", async () => {
        const amount = textGenerator.makeString(3, "number");

        await helpers.typeTextToElement(exchangeRatesPage.currencyConverterInputTo, amount);

        await helpers.verifyValue(exchangeRatesPage.currencyConverterInputTo, "");
    });    
});	