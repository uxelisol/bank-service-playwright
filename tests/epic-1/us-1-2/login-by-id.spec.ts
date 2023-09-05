import { TextGenerator } from "../../../helpers/textGenerator";
import { test } from "@playwright/test";
import { MainPage } from "../../../page-object-model/main.page";
import { Hrefs } from "../../../data/test-data/href-values.enum";
import { Credentials, UnregisteredUser } from "../../../data/test-data/credentials-values.enum";
import { Helpers } from "../../../helpers/helpers";
import { CssValues } from "../../../data/test-data/css-values.enum";
import { MainTextData } from "../../../data/text-data/main.enum";

test.describe("US-1.2 Authorization(login by id)", () => {
    let mainPage: MainPage;
    let helpers: Helpers;
    let textGenerator: TextGenerator;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        helpers = new Helpers(page);
        textGenerator = new TextGenerator();
        await page.goto("/");
        await helpers.clickOnElement(mainPage.closeCookies);
        await helpers.clickOnElement(mainPage.logInByIdButton);
    });

    test("C6065608	Check the field 'Log in' by ID number", async () => {
        await helpers.verifyElementIsVisible(mainPage.formTitle);
        await helpers.verifyElementIsVisible(mainPage.logInByEmailButton);
        await helpers.verifyElementIsVisible(mainPage.logInByIdButton);
        await helpers.verifyElementIsVisible(mainPage.idField);
        await helpers.verifyElementIsVisible(mainPage.passwordField);
        await helpers.verifyElementIsVisibleAndDisabled(mainPage.logInButton);
        await helpers.verifyElementIsVisibleAndEnabled(mainPage.forgotPasswordButton);
        await helpers.verifyElementIsVisibleAndEnabled(mainPage.signUpButton);
        await helpers.checkElementCssStyle(mainPage.logInByIdButton, "border-bottom", CssValues.YELLOW_BORDER_BOTTOM);
    });

    test("C6065253	Check the field 'ID no'", async () => {
        await helpers.checkElementAttribute(mainPage.idField,"placeholder", MainTextData.ID_PLACEHOLDER);

        await helpers.clickOnElement(mainPage.idField);

        await helpers.checkElementAttribute(mainPage.idField, "placeholder", "");
    });

    test("C6065254	Check the field 'Password'", async () => {
        await helpers.checkElementAttribute(mainPage.passwordField,"placeholder", MainTextData.PASSWORD_PLACEHOLDER);
        
        await helpers.verifyElementIsVisible(mainPage.passwordLabelText);

        await helpers.clickOnElement(mainPage.passwordField);

        await helpers.checkElementAttribute(mainPage.passwordField, "placeholder", "");
        await helpers.verifyElementIsVisible(mainPage.hidePasswordButton);

        await helpers.typeTextToElement(mainPage.passwordField,textGenerator.makeString(3));

        await helpers.checkElementAttribute(mainPage.passwordField, "type", "password");
        
        await helpers.clickOnElement(mainPage.hidePasswordButton);
        
        await helpers.checkElementAttribute(mainPage.passwordField, "type", "text");
    });

    test("C6065255	Check the user can log in using ID number.", async () => {
        await helpers.typeTextToElement(mainPage.idField, Credentials.USER_ID);
        await helpers.typeTextToElement(mainPage.passwordField,Credentials.PASSWORD);
        await helpers.clickOnElement(mainPage.logInButton);

        await helpers.verifyUrl(Hrefs.MAIN_MENU);
    });

    test("C6065256	Check the button 'Log in' (the fields are empty)", async () => {
        await helpers.clickOnElement(mainPage.idField);
        await helpers.clickOnElement(mainPage.passwordField);

        await helpers.verifyElementIsVisibleAndDisabled(mainPage.logInButton);
    });

    test("C6065257	Check the button 'log in' (one field is required)", async () => {
        await helpers.typeTextToElement(mainPage.idField, Credentials.USER_ID);

        await helpers.verifyElementIsVisibleAndDisabled(mainPage.logInButton);
    });

    test("C6065259	Check the 'Sign up' button opens the Sign up page", async () => {
        await helpers.clickOnElement(mainPage.signUpButton);

        await helpers.verifyUrl(Hrefs.SIGNUP);
    });

    test("C6065260	Check the button 'Forgot your password'", async () => {
        await helpers.clickOnElement(mainPage.forgotPasswordButton);

        await helpers.verifyUrl(Hrefs.RECOVERY_PASSWORD);
    });

    test("C6065287	Check the availability to log in (ID no and password don't match)", async () => {
        await helpers.typeTextToElement(mainPage.idField, UnregisteredUser.ID);
        await helpers.typeTextToElement(mainPage.passwordField,UnregisteredUser.PASSWORD);
        await helpers.clickOnElement(mainPage.logInButton);

        await helpers.checkElementCssStyle(mainPage.idLabel, 'border', CssValues.RED_COLOR);
        await helpers.checkElementCssStyle(mainPage.passwordLabel, 'border', CssValues.RED_COLOR);
        await helpers.verifyContainText(mainPage.invalidIdMessage, MainTextData.INVALID_ID);
    });
});