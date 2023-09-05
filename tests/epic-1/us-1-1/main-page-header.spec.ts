import { test } from "@playwright/test";
import { CommonElements } from "../../../page-object-model/common-elements.page";
import { Helpers } from "../../../helpers/helpers";
import { Header } from "../../../page-object-model/header.page";
import { Hrefs } from "../../../data/test-data/href-values.enum";
import { HeaderTextData } from "../../../data/text-data/header.enum";
import { CssValues } from "../../../data/test-data/css-values.enum";

test.describe("US-1.1 Main page Header", () => {
    let commonElements: CommonElements;
    let header: Header;
    let helpers: Helpers;

    test.beforeEach(async ({ page }) => {
        commonElements = new CommonElements(page);
        header = new Header(page);
        helpers = new Helpers(page);

        await page.goto("/");
    });

    test("C5934824 Check the Logo", async () => {
        await helpers.verifyElementIsVisible(commonElements.staticLogo);
    });

    test("C5934825	Check the 'Bank branches & ATMs' text label & icon", async () => {
        await helpers.verifyElementIsVisible(header.bankBranches);
        await helpers.verifyElementHaveText(header.bankBranchesText, HeaderTextData.BANK_BRANCHES);

        await helpers.hoverElement(header.bankBranchesText);

        await helpers.checkElementCssStyle(header.bankBranchesText, "border-bottom", CssValues.YELLOW_DASHED_HEADER);

        // ! Blur doesn't work for some reason, so we can hover any another element on the page !
        await helpers.hoverElement(commonElements.staticLogo);

        await helpers.checkElementCssStyle(header.bankBranchesText, "border-bottom", CssValues.TRANSPARENT_BORDER);
    });

    test("C6101890	Check text label 'Bank branches & ATMs' leads to 'Bank branches & ATMs' page test", async () => {
        await helpers.clickOnElement(header.bankBranchesText);

        await helpers.verifyUrl(`${Hrefs.BANK_BRANCHES}`);
    });

    test("C5934826	Check the 'Exchange rates' text label & icon", async () => {
        await helpers.verifyElementIsVisible(header.exchangeRates);
        await helpers.verifyElementHaveText(header.exchangeRatesText, HeaderTextData.EXCHANGE_RATES);

        await helpers.hoverElement(header.exchangeRatesText);

        await helpers.checkElementCssStyle(header.exchangeRatesText, "border-bottom", CssValues.YELLOW_DASHED_HEADER);

        // ! Blur doesn't work for some reason, so we can hover any another element on the page !
        await helpers.hoverElement(commonElements.staticLogo);

        await helpers.checkElementCssStyle(header.exchangeRatesText, "border-bottom", CssValues.TRANSPARENT_BORDER);
    });

    test("C6101893	Check the text label 'Exchange rates' leads to Exchange rates page", async () => {
        await helpers.clickOnElement(header.exchangeRatesText);

        await helpers.verifyUrl(`${Hrefs.EXCHANGE_RATES}`);
    });

    test("C5934828	Check the 'Contact' text label & icon", async () => {
        await helpers.verifyElementIsVisible(header.contact);
        await helpers.verifyElementHaveText(header.contactText, HeaderTextData.CONTACT);

        await helpers.hoverElement(header.contactText);

        await helpers.checkElementCssStyle(header.contactText, "border-bottom", CssValues.YELLOW_DASHED_HEADER);

        // ! Blur doesn't work for some reason, so we can hover any another element on the page !
        await helpers.hoverElement(commonElements.staticLogo);

        await helpers.checkElementCssStyle(header.contactText, "border-bottom", CssValues.TRANSPARENT_BORDER);
    });

    test("C6101897	Check the 'Contact' link in the header leads to Contact us page", async () => {
        await helpers.clickOnElement(header.contactText);

        await helpers.verifyUrl(`${Hrefs.CONTACT}`);
    });
});
