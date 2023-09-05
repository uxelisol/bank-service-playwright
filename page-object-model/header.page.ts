import { Page, expect } from "@playwright/test";
import { BasePage } from "./basePage/base.page";
import { Hrefs } from "../data/test-data/href-values.enum";

export class Header extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public bankBranches: string = `//section/a[@href='${Hrefs.BANK_BRANCHES}']`;
    public bankBranchesText: string = `${this.bankBranches}/span`;
    public exchangeRates: string = `//section/a[@href='${Hrefs.EXCHANGE_RATES}']`;
    public exchangeRatesText: string = `${this.exchangeRates}/span`;
    public contact: string = `//section/a[@href='${Hrefs.CONTACT}']`;
    public contactText: string = `${this.contact}/span`;
}
