import { Page } from "@playwright/test";
import { BasePage } from "./basePage/base.page";

export class SignupPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public emailField: string = "//input[@name='email']";
    public continueButton: string = "(//button[contains(@class,'sc-bczRLJ')])[2]";
    public confirmationText: string = "//form/p[1]";
    public privacyPolicyLink: string = "//form//p/a[1]";
    public remoteBankingRulesLink: string = "//form//p/a[2]";
    public codeField:string = "//form//input[@name='code']";
    public nameField: string = "//form//input[@id='input-name']";
    public lastNameField: string = "//form//input[@id='input-surname']";
    public idField: string = "//form//input[@id='input-passport']";
    public residentCheckBox: string = "//form//label[1]//input";
    public passwordField: string = "//input[@id='input-password']";
    public confirmPasswordField: string = "//input[@id='input-confirm-password']";
    public securityQuestionSelect: string = "//form/div[1]";
    public securityQuestionAnswerField: string = "//form//textarea[@name='answer']";
    public firstQuestion: string = "//ul/li[2]";
    public congratsMessage: string = "//div//h2";
    public finalContinueButton: string = "(//button[contains(@class,'sc-bczRLJ')])";

}
