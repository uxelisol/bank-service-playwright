import { Page } from "@playwright/test";
import { BasePage } from "./basePage/base.page";

export class CommonElements extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public cookiesPopUpForm: string = "//div[@class='sc-bhVIhj blfavc']";
    public acceptCookiesButton: string = "//button[contains(@class, 'izJWWT')]";
    public closeCookiesPopupButton: string = "//button[contains(@class, 'dquWHj')]";

    public cookiesPolicy: string = "//a[@href='documents/personal-data-terms']";

    public staticLogo: string = "//img[@alt='logo']";
}
