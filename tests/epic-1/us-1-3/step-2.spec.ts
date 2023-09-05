import { Header } from './../../../page-object-model/header.page';
import { RecoveryPasswordTextData } from '../../../data/text-data/recovery-password.enum';
import { test } from "@playwright/test";
import { Hrefs } from "../../../data/test-data/href-values.enum";
import { Credentials } from "../../../data/test-data/credentials-values.enum";
import { Helpers } from "../../../helpers/helpers";
import { RecoveryPasswordPage } from "../../../page-object-model/recovery-password.page";
import { TextGenerator } from "../../../helpers/textGenerator";
import { CssValues } from '../../../data/test-data/css-values.enum';
import { Footer } from '../../../page-object-model/footer.page';

test.describe("US-1.3 Password recovery(Step 2)", () => {
    let recoveryPasswordPage: RecoveryPasswordPage;
    let helpers: Helpers;
    let textGenerator: TextGenerator;
    let header: Header;
    let footer: Footer

    test.beforeEach(async ({ page }) => {
        recoveryPasswordPage = new RecoveryPasswordPage(page);
        helpers = new Helpers(page);
        textGenerator = new TextGenerator();
        header = new Header(page);
        footer = new Footer(page);
        await page.goto(Hrefs.RECOVERY_PASSWORD);
        await helpers.closeCookiesPopupAndVerify({page});
        await helpers.typeTextToElement(recoveryPasswordPage.idField, Credentials.USER_ID);
        await helpers.clickOnElement(recoveryPasswordPage.continueButton);
        await helpers.verifyElementIsVisible(recoveryPasswordPage.step2ResengingMessage);
    });

    test("C6070691	Check the progress bar", async () => {
        await helpers.verifyContainText(recoveryPasswordPage.title, RecoveryPasswordTextData.TITLE);

        await helpers.checkElementCssStyle(recoveryPasswordPage.progressBarCircleStep1, 'background-color', CssValues.YELLOW_COLLOR);
        await helpers.checkElementCssStyle(recoveryPasswordPage.progressBarLineStep1, 'background-color', CssValues.YELLOW_COLLOR);
        await helpers.checkElementCssStyle(recoveryPasswordPage.progressBarCircleStep2, 'background-color', CssValues.YELLOW_COLLOR);
        await helpers.checkElementCssStyle(recoveryPasswordPage.progressBarLineStep2, 'background-color', CssValues.YELLOW_COLLOR);
    });

    test("C6070715	Check the availability of the field 'enter code'", async () => {
        await helpers.checkElementAttribute(recoveryPasswordPage.codeField, 'placeholder', RecoveryPasswordTextData.STEP2_PLACEHOLDER);

        await helpers.clickOnElement(recoveryPasswordPage.codeField);

        await helpers.verifyElementValue(recoveryPasswordPage.codeField, "******");
    });

    test("C6070716	Check the message about the sent code on email", async () => {
        await helpers.verifyElementIsVisible(recoveryPasswordPage.stepTwoMessage);
        await helpers.verifyContainText(recoveryPasswordPage.stepTwoMessage, RecoveryPasswordTextData.STEP_TWO_MESSAGE);
    });

    test("C6070715	Check the notification about resending", async () => {
        await helpers.verifyElementIsVisible(recoveryPasswordPage.step2ResengingMessage);
        await helpers.verifyContainText(recoveryPasswordPage.step2ResengingMessage, RecoveryPasswordTextData.STEP2_RESENGING);
    });

    test("C6070718	Check the notification about the time of validity of the code", async () => {
        await helpers.checkElementCssStyle(recoveryPasswordPage.step2CodeIsValid,'background-color',CssValues.GRAY_BACKGROUND);
        await helpers.verifyContainText(recoveryPasswordPage.step2CodeIsValid,RecoveryPasswordTextData.STEP2_CODE_IS_VALID);
    });

    test("C6070719	Check the button Continue on the Enter code step opens 'Create new password' step if the form is filled in validly", async () => {
        await helpers.typeTextToElement(recoveryPasswordPage.codeField, textGenerator.getCode());
        await helpers.clickOnElement(recoveryPasswordPage.continueButton);

        await helpers.checkElementCssStyle(recoveryPasswordPage.progressBarCircleStep3, 'background-color', CssValues.YELLOW_COLLOR);
        await helpers.checkElementCssStyle(recoveryPasswordPage.progressBarLineStep3, 'background-color', CssValues.YELLOW_COLLOR);
    });

    test("C6070720	Check the button 'continue' (the field is empty) ", async () => {
        await helpers.clickOnElement(recoveryPasswordPage.codeField);

        await helpers.verifyElementIsVisibleAndDisabled(recoveryPasswordPage.continueButton);
    });

    test("C6070721	Check the button 'back'", async ({ page }) => {
        await helpers.clickOnElement(recoveryPasswordPage.backButton);

        await helpers.checkElementCssStyle(recoveryPasswordPage.porogressBarCircleStep2Back, 'background-color', CssValues.GRAY_COLLOR);
        await helpers.checkElementCssStyle(recoveryPasswordPage.porogressBarLineStep2Back, 'background-color', CssValues.GRAY_COLLOR);
    });

    test("C6070722	Check the button 'continue' (the field is filled invalidly)", async () => {
        await helpers.clickOnElement(recoveryPasswordPage.codeField);

        await helpers.verifyElementIsVisibleAndDisabled(recoveryPasswordPage.continueButton);
    });

    test("C6070723	Check the availability of the button 'exit' - the cross in upper right corne", async () => {
        await helpers.clickOnElement(recoveryPasswordPage.closeButton);

        await helpers.verifyUrl("/");
    });

    test("C6070724	Check the availability of the sent code ( 6 digits)", async () => {
        await helpers.typeTextToElement(recoveryPasswordPage.codeField, textGenerator.getCode());

        await helpers.verifyElementIsVisibleAndEnabled(recoveryPasswordPage.continueButton);
    });

    test("C6070725	Check the notification about two another attemts after first wrong entering the code", async () => {
        await helpers.typeTextToElement(recoveryPasswordPage.codeField, textGenerator.makeString(6,'number'));
        await helpers.clickOnElement(recoveryPasswordPage.continueButton);

        await helpers.verifyElementIsNotVisible(recoveryPasswordPage.invalidCodeMessage);
        await helpers.verifyContainText(recoveryPasswordPage.invalidCodeMessage, RecoveryPasswordTextData.INVALID_CODE);
    });

    test("C6070734	Check the availability of the field after clicking on the buttons 'Bank branches'", async () => {
        await helpers.clickOnElement(header.bankBranches);

        await helpers.verifyUrl(Hrefs.BANK_BRANCHES);
    });

    test("C6070734	Check the availability of the field after clicking on the buttons 'Exchange rates'", async () => {
        await helpers.clickOnElement(header.exchangeRates);

        await helpers.verifyUrl(Hrefs.EXCHANGE_RATES);
    });

    test("C6070734	Check the availability of the field after clicking on the buttons 'Contact'", async () => {
        await helpers.clickOnElement(header.contact);

        await helpers.verifyUrl(Hrefs.CONTACT);
    });    
});