import { Page, expect } from "@playwright/test";
import { BasePage } from "./basePage/base.page";

export class MainPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public logInForm: string = "//form[@data-testid='login-form']";

    // This 2 locators switch classes depends of what is active now, but stay at same position in DOM
    public logInByEmailButton: string = "(//section[@data-testid='login-method-menu']/div)[1]";
    public logInByIdButton: string = "(//section[@data-testid='login-method-menu']/div)[2]";

    public emailField: string = "//input[@name='email']";
    public idField: string = "//input[@name='passportId']";
    public passwordField: string = "//input[@name='enterPassword']";

    public logInButton: string = "//button[contains(@class, 'fFnGOc')]";

    public scrollDownButton: string = "//img[@data-testid='scrolldown']";
    public additionalInfoDiv: string = "//div[@class='sc-fHsOPI dljfhO']";

    public appleStoreButton: string = "//a[contains(@href, 'apps.apple.com')]";
    public googlePlayButton: string = "//a[contains(@href, 'play.google.com')]";
    public ratingBadge: string = "//div[@class='sc-hsOonA ieBghe']";

    public adBadges: string = "//div[@class='sc-eVQfli kJVuzQ']";
    public statNumbers: string = "//div[@class='sc-iFwKgL jnXtXr']";
    public termsAndConditions: string = "//section[@class='sc-eXBvqI ftMCTc']/button";

    public forgotPasswordButton: string = "//button[contains(text(),'Forgot your password?')]";
    public signUpButton: string = "//button[contains(text(),'Sign up')]";
    public closeCookies: string = "//div[@data-testid='dialog']//button[contains(text(),'Close')]";

    public blockedAccountModal: string = "//div[@class='sc-fnykZs cydAWz']";
    public blockedAccountModalCloseButton: string = "//img[@data-testid='close-icon']";
    public blockedAccountModalContactButton: string = "//div[@class='sc-hHLeRK iXEgoV']/a[contains(@href, 'contact')]";
    public blockedAccountModalBranchButton: string = "//div[@class='sc-hHLeRK iXEgoV']/a[contains(@href, 'map')]";

    public hidePasswordButton: string = "//div[@class='sc-evZas loydHu']";
    public invalidEmailError: string = "//div[@class='sc-breuTD bYkRG']";

    public emailLabelText: string = "//form/p[@class='sc-jqUVSM fdwrey'][1]";
    public passwordLabelText: string = "//form/p[@class='sc-jqUVSM fdwrey'][2]";
    public formTitle: string = "//form/h1";

    public emailLabel: string = "//form/label[@class='sc-kDDrLX limIlC'][1]";
    public idLabel: string = "//form/label[@class='sc-kDDrLX limIlC'][1]";
    public passwordLabel: string = "//form/label[@class='sc-kDDrLX limIlC'][2]";

    public emailLabelWithError: string = "//form/label[@class='sc-kDDrLX brreB'][1]";
    public passwordLabelWithError: string = "//form/label[@class='sc-kDDrLX brreB'][2]";

    public invalidIdMessage: string = "//div[@class='sc-breuTD bYkRG']";

    async enterEmail(email: string): Promise<void> {
        await this.page.locator(this.emailField).type(email);
    }

    async enterPassword(password: string): Promise<void> {
        await this.page.locator(this.passwordField).type(password);
    }

    async enterID(id: string): Promise<void> {
        await this.page.locator(this.idField).type(id);
    }

    async enterEmailAndPassword(email: string, password: string): Promise<void> {
        await this.enterEmail(email);
        await this.enterPassword(password);
    }

    async enterIDAndPassword(id: string, password: string): Promise<void> {
        await this.enterID(id);
        await this.enterPassword(password);
    }
}
