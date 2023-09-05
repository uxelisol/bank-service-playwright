import { expect, test } from "@playwright/test";
import { MainPage } from "../../../page-object-model/main.page";
import { CommonElements } from "../../../page-object-model/common-elements.page";
import { Helpers } from "../../../helpers/helpers";
import { Hrefs } from "../../../data/test-data/href-values.enum";

test.describe("US-1.1.1 Cookie popup", () => {
    let commonElements: CommonElements;
    let mainPage: MainPage;
    let helpers: Helpers;

    test.beforeEach(async ({ page }) => {
        commonElements = new CommonElements(page);
        mainPage = new MainPage(page);
        helpers = new Helpers(page);

        await page.goto("/");
    });

    test("C6151735 Check the Cookie popup appearance", async () => {
        await helpers.verifyElementIsVisible(commonElements.cookiesPopUpForm);
    });

    test("C6151753 Check the Cookie popup appearance after consent was given", async ({ page }) => {
        await page.click(commonElements.acceptCookiesButton);
        await helpers.verifyElementNotExist(commonElements.cookiesPopUpForm);
    });

    test("C6151741 Check the functionality of 'Close' button", async ({ page }) => {
        await helpers.closeCookiesPopupAndVerify({ page });

        await page.reload();
        await helpers.verifyCookiesStatus({ page }, false);
        await helpers.verifyElementNotExist(commonElements.cookiesPopUpForm);
    });

    test("C6151740 Check the 'Accept cookies' button saves the users consent on cookies", async ({ page }) => {
        await helpers.acceptCookiesAndVerify({ page });

        await page.reload();
        await helpers.verifyCookiesStatus({ page });
        await helpers.verifyElementNotExist(commonElements.cookiesPopUpForm);
    });

    test("C6151759 Check the hyperlink 'Terms of Personal Data Processing and Cookies' leads to Terms of Personal Data Processing and Cookies page", async ({
        page,
    }) => {
        helpers.verifyElementIsVisible(commonElements.cookiesPolicy);
        page.locator(commonElements.cookiesPolicy).click();

        await expect(page).toHaveURL(`${Hrefs.COOKIES_POLICY}`);
    });
});
