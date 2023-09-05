import { Page } from "@playwright/test";
import { BasePage } from "./basePage/base.page";

export class MainMenuPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public logOutButton: string = "//button[@data-testid='logout-btn']";

}

