import { test, expect } from "@playwright/test";
import { MainPage } from "../../../page-object-model/main.page";
import { Hrefs } from "../../../data/test-data/href-values.enum";
import { Credentials } from "../../../data/test-data/credentials-values.enum";
import { Helpers } from "../../../helpers/helpers";

test.describe("US-1.2 Authorization", () => {
    let mainPage: MainPage;
    let helper: Helpers;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        helper = new Helpers(page);
        
        await page.goto("/");
        await helper.clickOnElement(mainPage.closeCookies);
    });

    test("T36234916 Check the 'Forgot your password' button opens the 'Reset password' page", async ({ page }) => {
        await helper.clickOnElement(mainPage.forgotPasswordButton);
        
        await helper.verifyUrl(Hrefs.RECOVERY_PASSWORD);
    });

    test("T36234915 Check the user can log in using an e-mail", async ({ page }) => {
        await mainPage.enterEmailAndPassword(`${Credentials.USER_EMAIL}`,`${Credentials.PASSWORD}`);
        await helper.clickOnElement(mainPage.logInButton);

        await helper.verifyUrl(Hrefs.MAIN_MENU);
    });

    test("T36234920 Check the 'Sign up' button opens the Sign up page", async ({ page }) => {
        await helper.clickOnElement(mainPage.signUpButton);

        await helper.verifyUrl(Hrefs.SIGNUP);
    });
    
    test("T36234919 Check the user can log in using ID number.", async ({ page }) => {
        await helper.clickOnElement(mainPage.logInByIdButton);
        await mainPage.enterIDAndPassword(`${Credentials.USER_ID}`,`${Credentials.PASSWORD}`);
        await helper.clickOnElement(mainPage.logInButton);

        await helper.verifyUrl(Hrefs.MAIN_MENU);
    });
})