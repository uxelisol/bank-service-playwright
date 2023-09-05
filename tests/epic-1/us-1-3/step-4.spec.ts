import { Header } from '../../../page-object-model/header.page';
import { RecoveryPasswordTextData } from '../../../data/text-data/recovery-password.enum';
import { test } from "@playwright/test";
import { Hrefs } from "../../../data/test-data/href-values.enum";
import { RecoveryPasswordUser } from "../../../data/test-data/credentials-values.enum";
import { Helpers } from "../../../helpers/helpers";
import { RecoveryPasswordPage } from "../../../page-object-model/recovery-password.page";
import { TextGenerator } from "../../../helpers/textGenerator";
import { Footer } from '../../../page-object-model/footer.page';
import { MainPage } from '../../../page-object-model/main.page';

test.describe("US-1.3 Password recovery(Step 4)", () => {
    let recoveryPasswordPage: RecoveryPasswordPage;
    let helpers: Helpers;
    let textGenerator: TextGenerator;
    let header: Header;
    let footer: Footer;
    let newPassword;
    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        recoveryPasswordPage = new RecoveryPasswordPage(page);
        mainPage = new MainPage(page);
        helpers = new Helpers(page);
        textGenerator = new TextGenerator();
        header = new Header(page);
        footer = new Footer(page);
        newPassword = textGenerator.makeString(9);
        await page.goto(Hrefs.RECOVERY_PASSWORD);
        await helpers.closeCookiesPopupAndVerify({ page });
        await helpers.typeTextToElement(recoveryPasswordPage.idField, RecoveryPasswordUser.USER_ID);
        await helpers.clickOnElement(recoveryPasswordPage.continueButton);
        await helpers.typeTextToElement(recoveryPasswordPage.codeField, textGenerator.getCode());
        await helpers.clickOnElement(recoveryPasswordPage.continueButton);
        await helpers.typeTextToElement(recoveryPasswordPage.passwordField, newPassword);
        await helpers.typeTextToElement(recoveryPasswordPage.confirmPasswordField, newPassword);
        await helpers.clickOnElement(recoveryPasswordPage.continueButton);
        await helpers.verifyElementIsVisible(recoveryPasswordPage.step4SuccessTitle);
    });

    test("C6070989	Check the final page", async ({ page }) => {
        await helpers.verifyElementIsVisible(recoveryPasswordPage.step4SuccessTitle);
        await helpers.verifyContainText(recoveryPasswordPage.step4SuccessTitle, RecoveryPasswordTextData.STEP4_SUCCESS_TITLE);
        await helpers.verifyElementIsVisible(recoveryPasswordPage.step4PasswordChangeMessage);
        await helpers.verifyContainText(recoveryPasswordPage.step4PasswordChangeMessage, RecoveryPasswordTextData.STEP4_PASSWORD_CHANGED);
        await helpers.verifyElementIsVisible(recoveryPasswordPage.step4YouCanLoginMessage);
        await helpers.verifyContainText(recoveryPasswordPage.step4YouCanLoginMessage, RecoveryPasswordTextData.STEP4_YOU_CAN_LOGIN);
        await helpers.verifyElementIsVisible(recoveryPasswordPage.step4CongratsImage);
    });

    test("C6071004	Check the button 'continue'", async ({ page }) => {
        await helpers.verifyElementIsVisibleAndEnabled(recoveryPasswordPage.step4ContinueButton);
        
        await helpers.clickOnElement(recoveryPasswordPage.step4ContinueButton);
        
        await helpers.verifyUrl("/");
    });

    test("C6071005	Check the possibility to leave the page clicking on the black background", async ({ page }) => {
        await page.mouse.click(100, 100);
        await page.mouse.click(700, 100);

        await helpers.verifyUrl(Hrefs.RECOVERY_PASSWORD);
        await helpers.verifyElementIsVisible(recoveryPasswordPage.step4SuccessTitle);
    });

    test("C6278384	Check the possibility to log in by email using the new password after password recovery", async ({ page }) => {
        await helpers.clickOnElement(recoveryPasswordPage.step4ContinueButton);

        await page.goto("/");
        await mainPage.enterEmailAndPassword(RecoveryPasswordUser.USER_EMAIL, newPassword);
        await helpers.clickOnElement(mainPage.logInButton);

        await helpers.verifyUrl(Hrefs.MAIN_MENU);
    });

    test("C6278385	Check the possibility to log in by ID using the new password after password recovery", async ({ page }) => {
        await helpers.clickOnElement(recoveryPasswordPage.step4ContinueButton);

        await page.goto("/");

        await helpers.clickOnElement(mainPage.logInByIdButton);
        await mainPage.enterIDAndPassword(RecoveryPasswordUser.USER_ID, newPassword);
        await helpers.clickOnElement(mainPage.logInButton);

        await helpers.verifyUrl(Hrefs.MAIN_MENU);
    });    
});