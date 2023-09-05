import { test } from "@playwright/test";
import { MainPage } from "../../../page-object-model/main.page";
import { SignupPage } from "../../../page-object-model/signup.page";
import { PrivacyPolicyPage } from "../../../page-object-model/privacy-policy.page";
import { Hrefs } from "../../../data/test-data/href-values.enum";
import { SignupTextData } from "../../../data/text-data/signup.enum";
import { PrivacyPolicyTextData } from "../../../data/text-data/privacy-policy.enum";
import { RemoteBankingRulesTextData } from "../../../data/text-data/remote-banking-rules.enum";
import { TextGenerator } from "../../../helpers/textGenerator";
import { Helpers } from "../../../helpers/helpers";

test.describe("US-1.4 Registration (for bank clients)", () => {
    let mainPage: MainPage;
    let signupPage: SignupPage;
    let privacyPolicyPage: PrivacyPolicyPage;
    let textGenerator = new TextGenerator();
    let helpers: Helpers;


    test.beforeEach(async ({ page }) => {
        helpers = new Helpers(page);
        mainPage = new MainPage(page);
        signupPage = new SignupPage(page);
        privacyPolicyPage = new PrivacyPolicyPage(page);
    });

    test("T36234884 Check the 'Sign up' button in the Log in form opens the Sign up form ", async ({ page }) => {
        await page.goto("/");
        await helpers.clickOnElement(mainPage.closeCookies);
        await helpers.clickOnElement(mainPage.signUpButton);

        await helpers.verifyUrl(Hrefs.SIGNUP);
    });
    
    test("T36234883 Check the button 'Continue' in the Sign up form opens the Enter code step (the field is filled validly)", async ({ page }) => {
        let email = textGenerator.getEmail();

        await page.goto(Hrefs.SIGNUP);

        await helpers.verifyElementIsVisibleAndDisabled(signupPage.continueButton);

        await helpers.typeTextToElement(signupPage.emailField,email);

        await helpers.verifyElementIsNotDisabled(signupPage.continueButton);

        await helpers.clickOnElement(signupPage.continueButton);

        await helpers.verifyContainText(signupPage.confirmationText,SignupTextData.CONFIRMATION_TEXT);
    });

    test("T36234917 Check the Privacy Policy link in the notification in Sign in form opens Privacy policy page", async ({ page }) => {
        await page.goto(Hrefs.SIGNUP);
        await helpers.clickOnElement(signupPage.privacyPolicyLink);

        await helpers.verifyUrl(Hrefs.PRIVACY_POLICY);
        await helpers.verifyContainText(privacyPolicyPage.title,PrivacyPolicyTextData.title);
    });

    test("T36234918 Check the 'Rules of remote banking services' link in the notification of the Sign in form opens the Remote banking rules page", async ({ page }) => {
        await page.goto(Hrefs.SIGNUP);
        await helpers.clickOnElement(signupPage.remoteBankingRulesLink);

        await helpers.verifyUrl(Hrefs.REMOTE_BANKING_RULES);
        await helpers.verifyContainText(privacyPolicyPage.title,RemoteBankingRulesTextData.title);
    });
    test("T36234885 Check the Continue button in Enter code step opens Create a password step in Sign up form (the field is filled validly)", async ({ page }) => {
        let email = textGenerator.getEmail();
        let password = textGenerator.getPassword(10);

        await page.goto(Hrefs.SIGNUP);
        await helpers.clickOnElement(mainPage.closeCookies);
        await helpers.typeTextToElement(signupPage.emailField,email);

        await helpers.verifyElementIsNotDisabled(signupPage.continueButton);

        await helpers.clickOnElement(signupPage.continueButton);
        await helpers.typeTextToElement(signupPage.codeField,textGenerator.getCode());

        await helpers.verifyElementIsNotDisabled(signupPage.continueButton);

        await helpers.clickOnElement(signupPage.continueButton);
        await helpers.typeTextToElement(signupPage.nameField,textGenerator.getName());
        await helpers.typeTextToElement(signupPage.lastNameField,textGenerator.getLastName());
        await helpers.typeTextToElement(signupPage.idField,textGenerator.getID());
        await helpers.clickOnElement(signupPage.residentCheckBox);

        await helpers.verifyElementIsNotDisabled(signupPage.continueButton);

        await helpers.clickOnElement(signupPage.continueButton);
        await helpers.typeTextToElement(signupPage.passwordField,password);
        await helpers.typeTextToElement(signupPage.confirmPasswordField,password);

        await helpers.verifyElementIsNotDisabled(signupPage.continueButton);

        await helpers.clickOnElement(signupPage.continueButton);
        await helpers.clickOnElement(signupPage.securityQuestionSelect);
        await helpers.clickOnElement(signupPage.firstQuestion);
        await helpers.typeTextToElement(signupPage.securityQuestionAnswerField,password);
        
        await helpers.verifyElementIsNotDisabled(signupPage.continueButton);
        
        await helpers.clickOnElement(signupPage.continueButton);

        await helpers.verifyContainText(signupPage.congratsMessage,SignupTextData.REGISTRATION_CONGRATULATIONS);
        await helpers.verifyElementIsNotDisabled(signupPage.finalContinueButton);
    });
})
