import { Header } from '../../../page-object-model/header.page';
import { RecoveryPasswordTextData } from '../../../data/text-data/recovery-password.enum';
import { test } from "@playwright/test";
import { Hrefs } from "../../../data/test-data/href-values.enum";
import { RecoveryPasswordUser } from "../../../data/test-data/credentials-values.enum";
import { Helpers } from "../../../helpers/helpers";
import { RecoveryPasswordPage } from "../../../page-object-model/recovery-password.page";
import { TextGenerator } from "../../../helpers/textGenerator";
import { CssValues } from '../../../data/test-data/css-values.enum';
import { Footer } from '../../../page-object-model/footer.page';

test.describe("US-1.3 Password recovery(Step 3)", () => {
    let recoveryPasswordPage: RecoveryPasswordPage;
    let helpers: Helpers;
    let textGenerator: TextGenerator;
    let header: Header;
    let footer: Footer;

    test.beforeEach(async ({ page }) => {
        recoveryPasswordPage = new RecoveryPasswordPage(page);
        helpers = new Helpers(page);
        textGenerator = new TextGenerator();
        header = new Header(page);
        footer = new Footer(page);
        await page.goto(Hrefs.RECOVERY_PASSWORD);
        await helpers.closeCookiesPopupAndVerify({ page });
        await helpers.typeTextToElement(recoveryPasswordPage.idField, RecoveryPasswordUser.USER_ID);
        await helpers.clickOnElement(recoveryPasswordPage.continueButton);
        await helpers.typeTextToElement(recoveryPasswordPage.codeField,textGenerator.getCode());
        await helpers.clickOnElement(recoveryPasswordPage.continueButton);
    });

    test("C6070847	Check the progress bar ", async () => {
        await helpers.checkElementCssStyle(recoveryPasswordPage.progressBarCircleStep1, 'background-color', CssValues.YELLOW_COLLOR);
        await helpers.checkElementCssStyle(recoveryPasswordPage.progressBarLineStep1, 'background-color', CssValues.YELLOW_COLLOR);
        await helpers.checkElementCssStyle(recoveryPasswordPage.progressBarCircleStep2, 'background-color', CssValues.YELLOW_COLLOR);
        await helpers.checkElementCssStyle(recoveryPasswordPage.progressBarLineStep2, 'background-color', CssValues.YELLOW_COLLOR);
        await helpers.checkElementCssStyle(recoveryPasswordPage.progressBarCircleStep3, 'background-color', CssValues.YELLOW_COLLOR);
        await helpers.checkElementCssStyle(recoveryPasswordPage.progressBarLineStep3, 'background-color', CssValues.YELLOW_COLLOR);
    });

    test("C6070848	Check the field 'create password'", async () => {
        await helpers.verifyElementIsVisible(recoveryPasswordPage.enterPasswordLabel);
        await helpers.checkElementAttribute(recoveryPasswordPage.passwordField, 'placeholder', RecoveryPasswordTextData.PASSWORD_PLACEHOLDER);

        await helpers.clickOnElement(recoveryPasswordPage.passwordField);

        await helpers.checkElementAttribute(recoveryPasswordPage.passwordField, 'placeholder', '');
        await helpers.verifyElementIsVisible(recoveryPasswordPage.passwordRulesMessage);
        await helpers.verifyElementIsVisible(recoveryPasswordPage.hidePasswordButton);
    });

    test("C6070849	Check the field 'confirm password'", async () => {
        await helpers.verifyElementIsVisible(recoveryPasswordPage.confirmPasswordLabel);
        await helpers.checkElementAttribute(recoveryPasswordPage.confirmPasswordField, 'placeholder', RecoveryPasswordTextData.CONFIRM_PASSWORD_PLACEHOLDER);

        await helpers.clickOnElement(recoveryPasswordPage.confirmPasswordField);

        await helpers.checkElementAttribute(recoveryPasswordPage.confirmPasswordField, 'placeholder', '');
    });

    test("C6070850	Check the button 'continue' (the fileds are empty )", async () => {
        await helpers.clickOnElement(recoveryPasswordPage.passwordField);

        await helpers.verifyElementIsVisibleAndDisabled(recoveryPasswordPage.continueButton);
    });

    test("C6070852	Check the button 'back'", async () => {
        await helpers.clickOnElement(recoveryPasswordPage.backButton);

        await helpers.checkElementCssStyle(recoveryPasswordPage.progressBarCircleStep1, 'background-color', CssValues.YELLOW_COLLOR);
        await helpers.checkElementCssStyle(recoveryPasswordPage.progressBarLineStep1, 'background-color', CssValues.YELLOW_COLLOR);
        await helpers.checkElementCssStyle(recoveryPasswordPage.progressBarCircleStep2, 'background-color', CssValues.YELLOW_COLLOR);
        await helpers.checkElementCssStyle(recoveryPasswordPage.progressBarLineStep2, 'background-color', CssValues.YELLOW_COLLOR);
        await helpers.checkElementCssStyle(recoveryPasswordPage.porogressBarCircleStep3Back, 'background-color', CssValues.GRAY_BACKGROUND);
        await helpers.checkElementCssStyle(recoveryPasswordPage.porogressBarLineStep3Back, 'background-color', CssValues.GRAY_BACKGROUND);
    });

    test("C6070853	Check the button 'exit' (cross sign)", async () => {
        await helpers.clickOnElement(recoveryPasswordPage.closeButton);

        await helpers.verifyUrl("/");
    });

    test("C6070854	Check the availability of the password (8 symbols)", async () => {
        const correctPassword = textGenerator.makeString(8);

        await helpers.typeTextToElement(recoveryPasswordPage.passwordField, correctPassword);

        await helpers.verifyElementIsNotVisible(recoveryPasswordPage.wrongPasswordMessage);
    });

    test("C6070855	Check the availability of the password (7 symbols)", async () => {
        const incorrectPassword = textGenerator.makeString(7);

        await helpers.typeTextToElement(recoveryPasswordPage.passwordField, incorrectPassword);

        await helpers.verifyElementIsVisible(recoveryPasswordPage.wrongPasswordMessage);
    });

    test("C6070856	Check the availability of the password (20 symbols)", async () => {
        const correctPassword = textGenerator.makeString(20);

        await helpers.typeTextToElement(recoveryPasswordPage.passwordField, correctPassword);

        await helpers.verifyElementIsNotVisible(recoveryPasswordPage.wrongPasswordMessage);
    });

    test("C6070857	Check the availability of the password (21 symbols)", async () => {
        const incorrectPassword = textGenerator.makeString(21);

        await helpers.typeTextToElement(recoveryPasswordPage.passwordField, incorrectPassword);

        await helpers.verifyElementIsVisible(recoveryPasswordPage.wrongPasswordMessage);
    });

    test("C6070858	Check the availability of the password (contains special characters, latin letters, numbers)", async () => {
        const correctPassword = textGenerator.makeString(10,'lowerUpperNumberSpecial');

        await helpers.typeTextToElement(recoveryPasswordPage.passwordField, correctPassword);

        await helpers.verifyElementIsNotVisible(recoveryPasswordPage.wrongPasswordMessage);
    });

    test("C6070859	Check the availability of the password (uppercase/ lowercase Latin letters)", async () => {
        const incorrectPassword = textGenerator.makeString(10,'upperAndLower');

        await helpers.typeTextToElement(recoveryPasswordPage.passwordField, incorrectPassword);

        await helpers.verifyElementIsVisible(recoveryPasswordPage.wrongPasswordMessage);
    });

    test("C6070860	Check the availability of the password (Cyrillic letters)", async () => {
        const incorrectPassword = textGenerator.makeString(10,'cyrillic');

        await helpers.typeTextToElement(recoveryPasswordPage.passwordField, incorrectPassword);

        await helpers.verifyElementIsVisible(recoveryPasswordPage.wrongPasswordMessage);
    });

    test("C6070861	Check the availability of the passwords (contains roman numerals)", async () => {
        const incorrectPassword = textGenerator.makeString(10,'romanNumerals');

        await helpers.typeTextToElement(recoveryPasswordPage.passwordField, incorrectPassword);

        await helpers.verifyElementIsVisible(recoveryPasswordPage.wrongPasswordMessage);
    });

    test("C6070862	Chek the availability to continue (the passwords in both fields are different)", async () => {
        const correctPassword = textGenerator.makeString(10);
        const otherPassword = textGenerator.makeString(10);

        await helpers.typeTextToElement(recoveryPasswordPage.passwordField, correctPassword);

        await helpers.typeTextToElement(recoveryPasswordPage.confirmPasswordField, otherPassword);

        await helpers.verifyElementIsVisible(recoveryPasswordPage.doesntMatchPasswordMessage);
    });

    test("C6070865	Check the availability of the password (without latin letters) ", async () => {
        const incorrectPassword = textGenerator.makeString(3,'ccyrillic')
            + textGenerator.makeString(3,'specialCharacters')
            + textGenerator.makeString(3,'number');

        await helpers.typeTextToElement(recoveryPasswordPage.passwordField, incorrectPassword);

        await helpers.verifyElementIsVisible(recoveryPasswordPage.doesntMatchPasswordMessage);
    });

    test("C6070866	Check the availability of the password (without numbers)", async () => {
        const incorrectPassword = textGenerator.makeString(10,'upperAndLower');

        await helpers.typeTextToElement(recoveryPasswordPage.passwordField, incorrectPassword);

        await helpers.verifyElementIsVisible(recoveryPasswordPage.doesntMatchPasswordMessage);
    });

    test("C6070867	Check the availability of the password (without special characters)", async () => {
        const correctPassword = textGenerator.makeString(10);

        await helpers.typeTextToElement(recoveryPasswordPage.passwordField, correctPassword);

        await helpers.verifyElementIsNotVisible(recoveryPasswordPage.doesntMatchPasswordMessage);
    });

    test("C6070868	Check the posibility to view the entered password (in the field 'enter password')", async () => {
        const correctPassword = textGenerator.makeString(10);

        await helpers.typeTextToElement(recoveryPasswordPage.passwordField, correctPassword);

        await helpers.checkElementAttribute(recoveryPasswordPage.passwordField, "type", "password");

        await helpers.clickOnElement(recoveryPasswordPage.hidePasswordButton);

        await helpers.checkElementAttribute(recoveryPasswordPage.passwordField, "type", "text");
    });
});