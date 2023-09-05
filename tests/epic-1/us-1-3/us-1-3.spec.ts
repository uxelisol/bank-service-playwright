import { test } from "@playwright/test";
import { Hrefs } from "../../../data/test-data/href-values.enum";
import { RecoveryPasswordUser } from "../../../data/test-data/credentials-values.enum";
import { Helpers } from "../../../helpers/helpers";
import { RecoveryPasswordPage } from "../../../page-object-model/recovery-password.page";
import { MainPage } from "../../../page-object-model/main.page";
import { TextGenerator } from "../../../helpers/textGenerator";
import { MainMenuPage } from "../../../page-object-model/main-menu.page";

test.describe("US-1.3 Password recovery", () => {
    let recoveryPasswordPage: RecoveryPasswordPage;
    let helpers: Helpers;
    let mainPage: MainPage;
    let mainMenuePage: MainMenuPage;
    let textGenerator: TextGenerator;

    test.beforeEach(async ({ page }) => {
        recoveryPasswordPage = new RecoveryPasswordPage(page);
        helpers = new Helpers(page);
        mainPage = new MainPage(page);
        textGenerator = new TextGenerator();
        mainMenuePage = new MainMenuPage(page);
    });

    test("T36234925 Check is change password is possible and check login with new password", async ({ page }) => {
        const newPassword = textGenerator.getPassword(9);

        await page.goto(Hrefs.RECOVERY_PASSWORD);

        await helpers.closeCookiesPopupAndVerify({ page });

        await helpers.verifyElementIsVisibleAndDisabled(recoveryPasswordPage.continueButton);

        await helpers.typeTextToElement(recoveryPasswordPage.idField,RecoveryPasswordUser.USER_ID);
        
        await helpers.verifyElementIsVisibleAndEnabled(recoveryPasswordPage.continueButton);

        await helpers.clickOnElement(recoveryPasswordPage.continueButton);

        await helpers.verifyElementIsVisibleAndDisabled(recoveryPasswordPage.continueButton);

        await helpers.typeTextToElement(recoveryPasswordPage.codeField,textGenerator.getCode());

        await helpers.verifyElementIsVisibleAndEnabled(recoveryPasswordPage.continueButton);

        await helpers.clickOnElement(recoveryPasswordPage.continueButton);

        await helpers.verifyElementIsVisibleAndDisabled(recoveryPasswordPage.continueButton);

        await helpers.typeTextToElement(recoveryPasswordPage.passwordField, newPassword);
        await helpers.typeTextToElement(recoveryPasswordPage.confirmPasswordField, textGenerator.makeString(4));

        await helpers.verifyElementIsVisibleAndDisabled(recoveryPasswordPage.continueButton);

        await helpers.clearElement(recoveryPasswordPage.confirmPasswordField);

        await helpers.typeTextToElement(recoveryPasswordPage.confirmPasswordField, newPassword);

        await helpers.verifyElementIsVisibleAndEnabled(recoveryPasswordPage.continueButton);

        await helpers.clickOnElement(recoveryPasswordPage.continueButton);

        await helpers.verifyElementIsVisible(recoveryPasswordPage.successMessage);

        await page.goto("/");
        await mainPage.enterEmailAndPassword(RecoveryPasswordUser.USER_EMAIL, newPassword);
        await helpers.clickOnElement(mainPage.logInButton);

        await helpers.verifyUrl(Hrefs.MAIN_MENU);

        await helpers.clickOnElement(mainMenuePage.logOutButton);

        await helpers.clickOnElement(mainPage.logInByIdButton);
        await mainPage.enterIDAndPassword(RecoveryPasswordUser.USER_ID, newPassword);
        await helpers.clickOnElement(mainPage.logInButton);

        await helpers.verifyUrl(Hrefs.MAIN_MENU);
    });
});