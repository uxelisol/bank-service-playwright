import { test } from "@playwright/test";
import { CommonElements } from "../../../page-object-model/common-elements.page";
import { Helpers } from "../../../helpers/helpers";
import { Hrefs } from "../../../data/test-data/href-values.enum";
import { CssValues } from "../../../data/test-data/css-values.enum";
import { MainPage } from "../../../page-object-model/main.page";
import { TEST_ENV } from "../../../env/test.env";
import { Footer } from "../../../page-object-model/footer.page";

test.describe("US-1.1 Main page Info page & Footer", () => {
    let commonElements: CommonElements;
    let footer: Footer;
    let mainPage: MainPage;
    let helpers: Helpers;

    test.beforeEach(async ({ page }) => {
        commonElements = new CommonElements(page);
        mainPage = new MainPage(page);
        footer = new Footer(page);
        helpers = new Helpers(page);

        await page.goto("/");
        await helpers.acceptCookiesAndVerify({ page });

        await helpers.openAdditionalMenuAndVerify({ page });
    });

    test("C6116516 Check ad badges & stat numbers of Info page", async () => {
        await helpers.verifyElementIsVisible(mainPage.adBadges);
        await helpers.verifyElementIsVisible(mainPage.statNumbers);
    });

    test("C6116517 Check the 'Terms and conditions' text label", async () => {
        await helpers.verifyElementIsVisible(mainPage.termsAndConditions);
    });

    test("C6116518 Check the 'Terms and conditions' link opens the 'Privacy policy' page", async () => {
        await helpers.clickOnElement(mainPage.termsAndConditions);

        await helpers.verifyUrl(`${TEST_ENV.url}${Hrefs.TERMS_AND_CONDITIONS}`);
    });

    test("C6101931 Check the text label 'Bank branches & ATMs'", async () => {
        await helpers.verifyElementIsVisible(footer.bankBranches);

        await helpers.hoverElement(footer.bankBranches);

        await helpers.checkElementCssStyle(footer.bankBranches, "border-bottom", CssValues.YELLOW_DASHED_FOOTER);

        // ! Blur doesn't work for some reason, so we can hover any another element on the page !
        await helpers.hoverElement(footer.contact);
        // Underlining disappears under text "Bank branches & ATMs".
        await helpers.checkElementCssStyle(footer.bankBranches, "border-bottom", CssValues.TRANSPARENT_BORDER);
    });

    test("C6101932 Check the 'Bank branches & ATMs' link in the footer opens the Bank branches & ATMs page", async ({
        page,
    }) => {
        await helpers.clickOnElement(footer.bankBranches);

        await helpers.verifyUrl(`${TEST_ENV.url}${Hrefs.BANK_BRANCHES}`);
    });

    test("C6101933 Check the text label 'Exchange rates'", async () => {
        await helpers.verifyElementIsVisible(footer.exchangeRates);

        await helpers.hoverElement(footer.exchangeRates);

        await helpers.checkElementCssStyle(footer.exchangeRates, "border-bottom", CssValues.YELLOW_DASHED_FOOTER);

        // ! Blur doesn't work for some reason, so we can hover any another element on the page !
        await helpers.hoverElement(footer.contact);

        await helpers.checkElementCssStyle(footer.exchangeRates, "border-bottom", CssValues.TRANSPARENT_BORDER);
    });

    test("C6101934 Check the 'Exchange rates' link in the footer opens the Exchange rates page", async () => {
        await helpers.clickOnElement(footer.exchangeRates);

        await helpers.verifyUrl(`${TEST_ENV.url}${Hrefs.EXCHANGE_RATES}`);
    });

    test("C6101933 Check the text label 'Contact'", async () => {
        await helpers.verifyElementIsVisible(footer.contact);

        await helpers.hoverElement(footer.contact);

        await helpers.checkElementCssStyle(footer.contact, "border-bottom", CssValues.YELLOW_DASHED_FOOTER);

        // ! Blur doesn't work for some reason, so we can hover any another element on the page !
        await helpers.hoverElement(footer.bankBranches);

        await helpers.checkElementCssStyle(footer.contact, "border-bottom", CssValues.TRANSPARENT_BORDER);
    });

    test("C6101936 Check the 'Contact' link in the footer opens the Contact us page", async () => {
        await helpers.clickOnElement(footer.contact);

        await helpers.verifyUrl(`${TEST_ENV.url}${Hrefs.CONTACT}`);
    });

    test("C6101937 Check the text label 'Privacy Policy'", async () => {
        await helpers.verifyElementIsVisible(footer.privacyPolicy);

        await helpers.hoverElement(footer.privacyPolicy);

        await helpers.checkElementCssStyle(footer.privacyPolicy, "border-bottom", CssValues.YELLOW_DASHED_FOOTER);

        // ! Blur doesn't work for some reason, so we can hover any another element on the page !
        await helpers.hoverElement(footer.bankBranches);

        await helpers.checkElementCssStyle(footer.privacyPolicy, "border-bottom", CssValues.TRANSPARENT_BORDER);
    });

    test("C6101938 Check the 'Privacy Policy' link leads to the Privacy policy page", async () => {
        await helpers.clickOnElement(footer.privacyPolicy);

        await helpers.verifyUrl(`${TEST_ENV.url}${Hrefs.PRIVACY_POLICY}`);
    });

    test("C6101939 Check the text label 'Remote banking rules'", async () => {
        await helpers.verifyElementIsVisible(footer.remoteBankingRules);

        await helpers.hoverElement(footer.remoteBankingRules);

        await helpers.checkElementCssStyle(footer.remoteBankingRules, "border-bottom", CssValues.YELLOW_DASHED_FOOTER);

        // ! Blur doesn't work for some reason, so we can hover any another element on the page !
        await helpers.hoverElement(footer.bankBranches);
        // Underlining disappears under text 'Remote banking rules'.
        await helpers.checkElementCssStyle(footer.remoteBankingRules, "border-bottom", CssValues.TRANSPARENT_BORDER);
    });

    test("C6101940 Check the 'Remote banking rules' link in the footer leads to 'Remote banking rules' page", async () => {
        await helpers.clickOnElement(footer.remoteBankingRules);

        await helpers.verifyUrl(`${TEST_ENV.url}${Hrefs.REMOTE_BANKING_RULES}`);
    });

    test("C6101941 Check the text label 'Cookies policy'", async () => {
        await helpers.verifyElementIsVisible(footer.cookiesPolicy);

        await helpers.hoverElement(footer.cookiesPolicy);

        await helpers.checkElementCssStyle(footer.cookiesPolicy, "border-bottom", CssValues.YELLOW_DASHED_FOOTER);

        // ! Blur doesn't work for some reason, so we can hover any another element on the page !
        await helpers.hoverElement(footer.bankBranches);

        await helpers.checkElementCssStyle(footer.cookiesPolicy, "border-bottom", CssValues.TRANSPARENT_BORDER);
    });

    test("C6101942 Check the 'Cookies policy' link in the footer leads to the Cookies policy page", async () => {
        await helpers.clickOnElement(footer.cookiesPolicy);

        await helpers.verifyUrl(`${TEST_ENV.url}${Hrefs.COOKIES_POLICY}`);
    });

    test("C6101943 Check the address text label & icon", async () => {
        await helpers.verifyElementIsVisible(footer.adress);

        await helpers.hoverElement(footer.adress);

        await helpers.checkElementCssStyle(footer.adress, "border-bottom", CssValues.YELLOW_DASHED_FOOTER);

        // ! Blur doesn't work for some reason, so we can hover any another element on the page !
        await helpers.hoverElement(footer.bankBranches);

        await helpers.checkElementCssStyle(footer.adress, "border-bottom", CssValues.TRANSPARENT_BORDER);
    });

    test("C6101944 Check the Head quarter address link in the footer leads to the Contact us page", async () => {
        await helpers.clickOnElement(footer.adress);

        await helpers.verifyUrl(`${TEST_ENV.url}${Hrefs.CONTACT}`);
    });

    test("C6101945 Check the telephone number text label & icon", async () => {
        await helpers.verifyElementIsVisible(footer.telNumber);

        await helpers.hoverElement(footer.telNumber);

        await helpers.checkElementCssStyle(footer.telNumber, "border-bottom", CssValues.YELLOW_DASHED_FOOTER);

        // ! Blur doesn't work for some reason, so we can hover any another element on the page !
        await helpers.hoverElement(footer.bankBranches);

        await helpers.checkElementCssStyle(footer.telNumber, "border-bottom", CssValues.TRANSPARENT_BORDER);
    });

    test("C6101949 Check the the telephone number link in the footer leads to the telephone number URL", async () => {
        await helpers.clickOnElement(footer.telNumber);

        await helpers.checkElementHref(`${footer.telNumber}/..`, Hrefs.TEL_NUMBER);
    });

    test("C6101950 Check the email text label & icon", async () => {
        await helpers.verifyElementIsVisible(footer.email);

        await helpers.hoverElement(footer.email);

        await helpers.checkElementCssStyle(footer.email, "text-decoration", CssValues.BLUE_UNDERLINE);

        // ! Blur doesn't work for some reason, so we can hover any another element on the page !
        await helpers.hoverElement(footer.bankBranches);

        await helpers.checkElementCssStyle(footer.email, "border-bottom", CssValues.BLUE_DEFAULT);
    });

    test("C6101951 Check the Email link leads to email URL.", async () => {
        await helpers.clickOnElement(footer.email);

        await helpers.checkElementHref(`${footer.email}/..`, Hrefs.EMAIL);
    });

    test("C6101952 Сheck the buttons of the app stores", async () => {
        await helpers.checkElementHref(footer.googlePlayButton, Hrefs.GOOGLE_PLAY);

        await helpers.checkElementHref(footer.appleStoreButton, Hrefs.APPLE_STORE);
    });
});
