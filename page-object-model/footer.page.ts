import { Page } from "@playwright/test";
import { BasePage } from "./basePage/base.page";
import { Hrefs } from "../data/test-data/href-values.enum";

export class Footer extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public bankBranches: string = `//span/a[@href='${Hrefs.BANK_BRANCHES}']`;
    public exchangeRates: string = `//span/a[@href='${Hrefs.EXCHANGE_RATES}']`;
    public contact: string = `//span/a[@href='${Hrefs.CONTACT}']`;
    public privacyPolicy: string = `//span/a[@href='${Hrefs.PRIVACY_POLICY}']`;
    public remoteBankingRules: string = `//span/a[@href='${Hrefs.REMOTE_BANKING_RULES}']`;
    public cookiesPolicy: string = `//span/a[@href='${Hrefs.COOKIES_POLICY}']`;
    public adress: string = `//span/a[@href='${Hrefs.CONTACT}']`;
    public telNumber: string = "//div[@class='sc-evrZIY kFMmTI']";
    public email: string = "//div[@class='sc-duzrYq cZXRvW']";

    public appsSection: string = "//div[@class='sc-HzFiz eDJYTe']";
    public appleStoreButton: string = `${this.appsSection}/a[contains(@href, 'apps.apple.com')]`;
    public googlePlayButton: string = `${this.appsSection}/a[contains(@href, 'play.google.com')]`;
}
