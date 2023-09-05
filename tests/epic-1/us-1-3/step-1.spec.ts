import { UnregisteredUser } from './../../../data/test-data/credentials-values.enum';
import { RecoveryPasswordTextData } from './../../../data/text-data/recovery-password.enum';
import { test } from "@playwright/test";
import { Hrefs } from "../../../data/test-data/href-values.enum";
import { Credentials } from "../../../data/test-data/credentials-values.enum";
import { Helpers } from "../../../helpers/helpers";
import { RecoveryPasswordPage } from "../../../page-object-model/recovery-password.page";
import { TextGenerator } from "../../../helpers/textGenerator";
import { CssValues } from '../../../data/test-data/css-values.enum';

test.describe("US-1.3 Password recovery(Step 1)", () => {
    let recoveryPasswordPage: RecoveryPasswordPage;
    let helpers: Helpers;
    let textGenerator: TextGenerator;

    test.beforeEach(async ({ page }) => {
        recoveryPasswordPage = new RecoveryPasswordPage(page);
        helpers = new Helpers(page);
        textGenerator = new TextGenerator();
        await page.goto(Hrefs.RECOVERY_PASSWORD);
    });
    
    test("C6070691	Check the progress bar", async () => {
        await helpers.verifyContainText(recoveryPasswordPage.title, RecoveryPasswordTextData.TITLE);
        await helpers.verifyContainText(recoveryPasswordPage.enterIdText, RecoveryPasswordTextData.ENTER_ID);
        await helpers.verifyContainText(recoveryPasswordPage.step1Text, RecoveryPasswordTextData.STEP1_TEXT);
        await helpers.verifyContainText(recoveryPasswordPage.step2Text, RecoveryPasswordTextData.STEP2_TEXT);
        await helpers.verifyContainText(recoveryPasswordPage.step3Text, RecoveryPasswordTextData.STEP3_TEXT);
        await helpers.checkElementCssStyle(recoveryPasswordPage.progressBarCircleStep1, 'background-color', CssValues.YELLOW_COLLOR);
        await helpers.checkElementCssStyle(recoveryPasswordPage.progressBarLineStep1, 'background-color', CssValues.YELLOW_COLLOR);
    });

    test("C6070689	Check the Reset password page", async () => {
        await helpers.verifyElementIsVisible(recoveryPasswordPage.progressBarCircleStep1);
        await helpers.verifyElementIsVisible(recoveryPasswordPage.idField);
        await helpers.verifyElementIsVisible(recoveryPasswordPage.messageAboutCode);
        await helpers.verifyContainText(recoveryPasswordPage.messageAboutCode, RecoveryPasswordTextData.MESSAGE_ABOUT_CODE);
    });

    test("C6070690	Check the field 'Enter ID no'", async () => {
        await helpers.verifyElementIsVisibleAndEnabled(recoveryPasswordPage.idField);
        await helpers.checkElementAttribute(recoveryPasswordPage.idField, 'placeholder', RecoveryPasswordTextData.PLACEHOLDER);
    });

    test("C6072090	Check the button 'back'", async () => {
        await helpers.clickOnElement(recoveryPasswordPage.backButton);

        await helpers.verifyUrl("/");
    });

    test("C6072091	Check the button 'close'", async () => {
        await helpers.clickOnElement(recoveryPasswordPage.closeButton);

        await helpers.verifyUrl("/");
    });

    test("C6072092	Check the button 'continue'(the field is empty)", async () => {
        await helpers.verifyElementIsVisibleAndDisabled(recoveryPasswordPage.continueButton);
    });

    test("C6072094	Check the 'Continue' button opens Enter code step if the form was fulfilled validly", async () => {
        await helpers.typeTextToElement(recoveryPasswordPage.idField, Credentials.USER_ID);

        await helpers.verifyElementIsVisibleAndEnabled(recoveryPasswordPage.continueButton);
    });

    test("C6072095	Check the button 'continue' (the field is filled invalidly)", async () => {
        const wrongId = textGenerator.makeString(5);

        await helpers.typeTextToElement(recoveryPasswordPage.idField, wrongId);

        await helpers.verifyElementIsVisibleAndDisabled(recoveryPasswordPage.continueButton);

        await helpers.verifyElementIsVisible(recoveryPasswordPage.errorIdMessage);
        await helpers.verifyContainText(recoveryPasswordPage.errorIdMessage, RecoveryPasswordTextData.ERROR_ID_MESSAGE);
    });

    test("C6072096	Check the availability of the ID (8 symbols) ", async () => {
        const wrongId = textGenerator.makeString(8);

        await helpers.typeTextToElement(recoveryPasswordPage.idField, wrongId);

        await helpers.verifyElementIsVisibleAndEnabled(recoveryPasswordPage.continueButton);
        await helpers.verifyElementIsNotVisible(recoveryPasswordPage.errorIdMessage);
    });

    test("C6072099	Check the availability of the ID (20 symbols)", async () => {
        const wrongId = textGenerator.makeString(20);

        await helpers.typeTextToElement(recoveryPasswordPage.idField, wrongId);

        await helpers.verifyElementIsVisibleAndEnabled(recoveryPasswordPage.continueButton);
        await helpers.verifyElementIsNotVisible(recoveryPasswordPage.errorIdMessage);
    });

    test("C6072100	Check the availability of the ID (21 symbols)", async () => {
        const wrongId = textGenerator.makeString(21);

        await helpers.typeTextToElement(recoveryPasswordPage.idField, wrongId);

        await helpers.verifyElementIsVisibleAndDisabled(recoveryPasswordPage.continueButton);
        await helpers.verifyElementIsVisible(recoveryPasswordPage.errorIdMessage);
    });

    test("C6072102	Check the availability of the ID (without Latin lowercase letters) ", async () => {
        const wrongId = textGenerator.makeString(10,'upperAndNumber');

        await helpers.typeTextToElement(recoveryPasswordPage.idField, wrongId);

        await helpers.verifyElementIsVisibleAndEnabled(recoveryPasswordPage.continueButton);
        await helpers.verifyElementIsNotVisible(recoveryPasswordPage.errorIdMessage);
    });

    test("C6072103	Check the availability of the ID (without Latin uppercase letters)", async () => {
        const wrongId = textGenerator.makeString(10,'lowerAndNumber');

        await helpers.typeTextToElement(recoveryPasswordPage.idField, wrongId);

        await helpers.verifyElementIsVisibleAndEnabled(recoveryPasswordPage.continueButton);
        await helpers.verifyElementIsNotVisible(recoveryPasswordPage.errorIdMessage);
    });

    test("C6072104	Check the availability of the ID (without numbers)", async () => {
        const wrongId = textGenerator.makeString(10,'upperAndLower');

        await helpers.typeTextToElement(recoveryPasswordPage.idField, wrongId);

        await helpers.verifyElementIsVisibleAndEnabled(recoveryPasswordPage.continueButton);
        await helpers.verifyElementIsNotVisible(recoveryPasswordPage.errorIdMessage);
    });

    test("C6072106	Check the availability of the ID (only special characters)", async () => {
        const wrongId = textGenerator.makeString(10,'specialCharacters');

        await helpers.typeTextToElement(recoveryPasswordPage.idField, wrongId);

        await helpers.verifyElementIsVisibleAndDisabled(recoveryPasswordPage.continueButton);
        await helpers.verifyElementIsVisible(recoveryPasswordPage.errorIdMessage);
    });

    test("C6072107	Check the availability of the ID (Latin lowercase/uppercase letters, numbers and special characters)", async () => {
        const wrongId = textGenerator.makeString(17,'lowerUpperNumberSpecial');
        console.log(wrongId);
        await helpers.typeTextToElement(recoveryPasswordPage.idField, wrongId);

        await helpers.verifyElementIsVisibleAndDisabled(recoveryPasswordPage.continueButton);
        await helpers.verifyElementIsVisible(recoveryPasswordPage.errorIdMessage);
    });

    test("C6072110	Check the availability of not-registered ID no", async ({ page }) => {
        await helpers.closeCookiesPopupAndVerify({page});
        await helpers.typeTextToElement(recoveryPasswordPage.idField, UnregisteredUser.ID);
        await helpers.clickOnElement(recoveryPasswordPage.continueButton);

        await helpers.verifyElementIsVisible(recoveryPasswordPage.errorIdMessage);
        await helpers.verifyContainText(recoveryPasswordPage.errorIdMessage, RecoveryPasswordTextData.ERROR_NO_USER_FOUND);
    });
});