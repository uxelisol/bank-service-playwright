import { Page } from "@playwright/test";
import { BasePage } from "./basePage/base.page";

export class PrivacyPolicyPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public title: string = "//h2[@data-testid='title']";

    public privacyPolicy: string = "//div[@data-testid='PRIVACY_POLICY']/..";
    public bankingRules: string = "//div[@data-testid='REMOTE_BANKING_RULES']/..";
    public termsOfPersonalData: string = "//div[@data-testid='PERSONAL_DATA_TERMS']/..";
}
