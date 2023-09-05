import { TextGenerator } from "./../../../helpers/textGenerator";
import { test } from "@playwright/test";
import { MainPage } from "../../../page-object-model/main.page";
import { Hrefs } from "../../../data/test-data/href-values.enum";
import { Credentials, UnregisteredUser } from "../../../data/test-data/credentials-values.enum";
import { Helpers } from "../../../helpers/helpers";
import { CssValues } from "../../../data/test-data/css-values.enum";
import { MainTextData } from "../../../data/text-data/main.enum";

test.describe("US-1.2 Authorization(login by email)", () => {
    let mainPage: MainPage;
    let helpers: Helpers;
    let textGenerator: TextGenerator;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        helpers = new Helpers(page);
        textGenerator = new TextGenerator();
        await page.goto("/");
        await helpers.clickOnElement(mainPage.closeCookies);
    });

    test("C6064324	Check the window 'log in' by email", async () => {
        await helpers.verifyElementIsVisible(mainPage.formTitle);
        await helpers.verifyElementIsVisible(mainPage.logInByEmailButton);
        await helpers.verifyElementIsVisible(mainPage.logInByIdButton);
        await helpers.verifyElementIsVisible(mainPage.emailField);
        await helpers.verifyElementIsVisible(mainPage.passwordField);
        await helpers.verifyElementIsVisibleAndDisabled(mainPage.logInButton);
        await helpers.verifyElementIsVisibleAndEnabled(mainPage.forgotPasswordButton);
        await helpers.verifyElementIsVisibleAndEnabled(mainPage.signUpButton);
        await helpers.checkElementCssStyle(mainPage.logInByEmailButton, "border-bottom", CssValues.YELLOW_BORDER_BOTTOM);

        await helpers.clickOnElement(mainPage.logInByIdButton);

        await helpers.checkElementCssStyle(mainPage.logInByIdButton, "border-bottom", CssValues.YELLOW_BORDER_BOTTOM);
    });

    test("C6064325	Check the field 'Email'", async () => {
        await helpers.checkElementAttribute(mainPage.emailField,"placeholder", MainTextData.EMAIL_PLACEHOLDER);

        await helpers.verifyElementIsVisible(mainPage.emailLabelText);

        await helpers.clickOnElement(mainPage.emailField);

        await helpers.checkElementAttribute(mainPage.emailField, "placeholder", MainTextData.EMAIL_CLICK_PLACEHOLDER);

        await helpers.typeTextToElement(mainPage.emailField, textGenerator.makeString(2));

        await helpers.checkElementAttribute(mainPage.emailField, "placeholder", "");
    });

    test("C6064407	Check the field 'Password'", async () => {
        await helpers.checkElementAttribute(mainPage.passwordField,"placeholder", MainTextData.PASSWORD_PLACEHOLDER);
        
        await helpers.verifyElementIsVisible(mainPage.passwordLabelText);

        await helpers.clickOnElement(mainPage.passwordField);

        await helpers.checkElementAttribute(mainPage.emailField, "placeholder", "");
        await helpers.verifyElementIsVisible(mainPage.hidePasswordButton);

        await helpers.typeTextToElement(mainPage.passwordField,textGenerator.makeString(3));

        await helpers.checkElementAttribute(mainPage.passwordField, "type", "password");
        
        await helpers.clickOnElement(mainPage.hidePasswordButton);
        
        await helpers.checkElementAttribute(mainPage.passwordField, "type", "text");
    });

    test("C6064326	Check the 'By ID' text label", async () => {
        await helpers.clickOnElement(mainPage.logInByIdButton);

        await helpers.checkElementCssStyle(mainPage.logInByIdButton, "border-bottom", CssValues.YELLOW_BORDER_BOTTOM);

        await helpers.verifyElementIsVisible(mainPage.idField);

        await helpers.checkElementCssStyle(mainPage.logInByEmailButton, "border-bottom", CssValues.TRANSPARENT_BORDER);
    });

    test("C6064327	Check the button 'Sign up'", async () => {
        await helpers.clickOnElement(mainPage.signUpButton);

        await helpers.verifyUrl(Hrefs.SIGNUP);
    });

    test("C6064328	Check the user can log in using an e-mail", async () => {
        await mainPage.enterEmailAndPassword(Credentials.USER_EMAIL, Credentials.PASSWORD);
        await helpers.clickOnElement(mainPage.logInButton);

        await helpers.verifyUrl(Hrefs.MAIN_MENU);
    });

    test("C6064333	Check the button 'Log in' (the fields are empty)", async () => {
        await helpers.clickOnElement(mainPage.emailField);
        await helpers.clickOnElement(mainPage.passwordField);

        await helpers.verifyElementIsVisibleAndDisabled(mainPage.logInButton);
    });

    test("C6064356	Check the button 'Log in' (one required field is empty)", async () => {
        await helpers.typeTextToElement(mainPage.emailField, Credentials.USER_EMAIL);
        await helpers.clickOnElement(mainPage.passwordField);

        await helpers.verifyElementIsVisibleAndDisabled(mainPage.logInButton);
    });

    test("C6064330	Check the 'Forgot your password' button opens the 'Reset password' page", async () => {
        await helpers.clickOnElement(mainPage.forgotPasswordButton);

        await helpers.verifyUrl(Hrefs.RECOVERY_PASSWORD);
    });

    test("C6064394	Check the availability to log in (the email and password don't match)", async () => {
        await helpers.typeTextToElement(mainPage.emailField, Credentials.USER_EMAIL);
        await helpers.typeTextToElement(mainPage.passwordField, textGenerator.makeString(12));

        await helpers.clickOnElement(mainPage.logInButton);
        await helpers.verifyElementIsVisible(mainPage.invalidEmailError);

        await helpers.checkElementCssStyle(mainPage.invalidEmailError, "color", CssValues.RED_COLOR);
        await helpers.checkElementCssStyle(mainPage.emailLabel, "border", CssValues.RED_COLOR);
        await helpers.checkElementCssStyle(mainPage.passwordLabel, "border", CssValues.RED_COLOR);
    });

    test("C6064396	Check the availability to use the email and the password (not a client of the bank)", async () => {
        await helpers.typeTextToElement(mainPage.emailField, UnregisteredUser.EMAIL);
        await helpers.typeTextToElement(mainPage.passwordField, UnregisteredUser.PASSWORD);

        await helpers.clickOnElement(mainPage.logInButton);
        await helpers.verifyElementIsVisible(mainPage.invalidEmailError);

        await helpers.checkElementCssStyle(mainPage.invalidEmailError, "color", CssValues.RED_COLOR);
        await helpers.checkElementCssStyle(mainPage.emailLabel, "border", CssValues.RED_COLOR);
        await helpers.checkElementCssStyle(mainPage.passwordLabel, "border", CssValues.RED_COLOR);
    });

    test("C6064332	Check the email (entered validly)", async () => {
        await helpers.typeTextToElement(mainPage.emailField, UnregisteredUser.EMAIL);
        await helpers.typeTextToElement(mainPage.passwordField, UnregisteredUser.PASSWORD);

        await helpers.verifyElementIsNotVisible(mainPage.invalidEmailError);
        await helpers.checkElementCssStyle(mainPage.emailLabelWithError, "border",CssValues.GREY_BORDER);
        await helpers.checkElementCssStyle(mainPage.emailLabelWithError, "border",CssValues.GREY_BORDER);
    });
});