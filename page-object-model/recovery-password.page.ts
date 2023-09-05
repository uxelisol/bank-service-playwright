import { Page } from "@playwright/test";
import { BasePage } from "./basePage/base.page";

export class RecoveryPasswordPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public idField: string = "//input[@name='passportID']";
    public continueButton: string = "//form//button";
    public codeField: string = "//input[@name='code']";
    public enterPasswordLabel = "//form/p[@class='sc-fThYeS sc-fxMNxQ jHpinm pLlvD'][1]";
    public passwordRulesMessage: string = "//form/div[@class='sc-geuGuN earemu']";
    public hidePasswordButton: string = "//form/label/div[@class='sc-hrRaah grnjCc']";
    public confirmPasswordLabel = "//form/p[@class='sc-fThYeS sc-fxMNxQ jHpinm pLlvD'][2]";
    public passwordField: string = "//input[@data-testid='password']";
    public confirmPasswordField: string = "//input[@data-testid='confirm-password']";
    public successMessage: string = "//h2";
    public stepTwoMessage: string = "//form/p[1]";
    public errorIdMessage: string = "//form/div[@class='sc-geuGuN jYsqPT']";
    public title: string = "//h4";
    public closeButton: string = "//img[@alt='Close icon']";
    public backButton: string = "//section/button";
    public enterIdText: string = "//form/p[@class='sc-fThYeS jHpinm']";
    public enterCodeLabel: string = "//form/p[@class='sc-fThYeS jHpinm']";
    public step2ResengingMessage: string = "//form/div/span";
    public step2CodeIsValid: string = "//form/div[@class='sc-BrFsL sc-bSGZAx dprtRY cnxfrs']";
    public invalidCodeMessage: string = "//form/p[@class='sc-hgZZql feSqtU']";

    public step1Text: string = "(//div[@class='sc-cHPgQl PkIyG']//p)[1]";
    public step2Text: string = "(//div[@class='sc-cHPgQl PkIyG']//p)[2]";
    public step3Text: string = "(//div[@class='sc-cHPgQl PkIyG']//p)[3]";

    public progressBarCircleStep1: string = "//div[@class='sc-dkSuNL cPthgW'][1]//div[@data-testid='progress-circle']";
    public progressBarCircleStep2: string = "//div[@class='sc-dkSuNL cPthgW'][2]//div[@data-testid='progress-circle']";
    public progressBarCircleStep3: string = "//div[@class='sc-dkSuNL cPthgW'][3]//div[@data-testid='progress-circle']";
    public progressBarLineStep1: string = "//div[@class='sc-dkSuNL cPthgW'][1]//div[@data-testid='progress-line']";
    public progressBarLineStep2: string = "//div[@class='sc-dkSuNL cPthgW'][2]//div[@data-testid='progress-line']";    
    public progressBarLineStep3: string = "//div[@class='sc-dkSuNL cPthgW'][3]//div[@data-testid='progress-line']";

    public porogressBarCircleStep2Back: string = "//div[@class='sc-dkSuNL bumDCl'][2]//div[@data-testid='progress-circle']";
    public porogressBarCircleStep3Back: string = "//div[@class='sc-dkSuNL bumDCl']//div[@data-testid='progress-circle']";
    public porogressBarLineStep2Back: string = "//div[@class='sc-dkSuNL bumDCl'][2]//div[@data-testid='progress-line']";
    public porogressBarLineStep3Back: string = "//div[@class='sc-dkSuNL bumDCl']//div[@data-testid='progress-line']";

    public messageAboutCode: string = '//form/div';
    public messageCapsLokIsOn: string = "//form//p[@class='sc-hgZZql feSqtU']";

    public wrongPasswordMessage: string = "//form/div[@class='sc-geuGuN jYsqPT']";
    public doesntMatchPasswordMessage: string = "//form/div[@class='sc-geuGuN jYsqPT']";

    public step4SuccessTitle: string = "//h2";
    public step4PasswordChangeMessage: string = "//div[@class='sc-kjEcyX gdTLPS']/p[1]";
    public step4YouCanLoginMessage: string = "//div[@class='sc-kjEcyX gdTLPS']/p[2]";
    public step4CongratsImage: string = "//img[@alt='Congratulation image']";
    public step4ContinueButton: string = "//div/button";
}
