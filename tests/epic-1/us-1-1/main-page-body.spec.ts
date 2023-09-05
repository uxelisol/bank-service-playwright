import { test } from "@playwright/test";
import { MainPage } from "../../../page-object-model/main.page";
import { Helpers } from "../../../helpers/helpers";
import { Hrefs } from "../../../data/test-data/href-values.enum";

test.describe("US-1.1 Main page Header", () => {
    let mainPage: MainPage;
    let helpers: Helpers;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        helpers = new Helpers(page);
        await page.goto("/");
    });

    test("C6024132 Check the login window", async () => {
        await helpers.verifyElementIsVisible(mainPage.logInForm);
    });

    test("C6116489 Check the functionality of the login window", async () => {
        await helpers.verifyElementIsVisible(mainPage.logInByEmailButton);

        await helpers.verifyElementIsVisible(mainPage.emailField);
        await helpers.verifyElementIsVisible(mainPage.passwordField);

        await helpers.verifyElementIsVisible(mainPage.logInByIdButton);
        await helpers.clickOnElement(mainPage.logInByIdButton);

        await helpers.verifyElementIsVisible(mainPage.idField);
        await helpers.verifyElementIsVisible(mainPage.passwordField);
        await helpers.clickOnElement(mainPage.logInByEmailButton);

        await helpers.verifyElementIsVisibleAndDisabled(mainPage.logInButton);
        await mainPage.enterEmailAndPassword("userfordemo@gmail.com", "qqq111QQQ");
        await helpers.verifyElementIsVisibleAndEnabled(mainPage.logInButton);

        await helpers.verifyElementIsVisible(mainPage.forgotPasswordButton);

        await helpers.verifyElementIsVisibleAndEnabled(mainPage.signUpButton);
    });

    test("C5935722 Check the 'Scroll block'", async () => {
        await helpers.verifyElementNotExist(mainPage.additionalInfoDiv);
        await helpers.clickOnElement(mainPage.scrollDownButton, { force: true });

        await helpers.verifyElementExist(mainPage.additionalInfoDiv);
    });

    test("C6116475 Сheck the buttons of the app stores", async () => {
        await helpers.checkElementHref(mainPage.googlePlayButton, Hrefs.GOOGLE_PLAY);

        await helpers.checkElementHref(mainPage.appleStoreButton, Hrefs.APPLE_STORE);
    });

    test("C6116479 Check the mobile app rating badge", async () => {
        await helpers.verifyElementIsVisible(mainPage.ratingBadge);
    });
});
