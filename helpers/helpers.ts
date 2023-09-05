import { Page, expect } from "@playwright/test";
import { BasePage } from "../page-object-model/basePage/base.page";
import { CommonElements } from "../page-object-model/common-elements.page";
import { MainPage } from "../page-object-model/main.page";

export class Helpers extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async verifyElementIsVisible(element: string): Promise<void> {
        await expect(this.page.locator(element)).toBeVisible();
    }

    async verifyElementIsVisibleAndDisabled(element: string): Promise<void> {
        await Promise.all([
            expect(this.page.locator(element)).toBeVisible(),
            expect(this.page.locator(element)).toBeDisabled(),
        ]);
    }

    async verifyElementIsVisibleAndEnabled(element: string): Promise<void> {
        await Promise.all([
            expect(this.page.locator(element)).toBeVisible(),
            expect(this.page.locator(element)).toBeEnabled(),
        ]);
    }

    async verifyElementNotExist(element: string): Promise<void> {
        await expect(this.page.locator(element)).toHaveCount(0);
    }

    async verifyElementExist(element: string): Promise<void> {
        if ((await this.page.locator(element).count()) > 0) {
            console.log(`Element - ${element} is exist`);
        }
    }

    async verifyElementHaveText(element: string, text: string): Promise<void> {
        await expect(this.page.locator(element)).toHaveText(text);
    }

    async getElementByXpath(element: string): Promise<Node> {
        return document.evaluate(element, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    async getElementStyle(element: string, styleName: string): Promise<string> {
        const styleValue: string = await this.page.locator(element).evaluate((ele, style) => {
            return window.getComputedStyle(ele, null).getPropertyValue(style);
        }, styleName);

        return styleValue;
    }

    async checkElementCssStyle(element: string, cssName: string, expectedValue: string): Promise<void> {
        const recievedValue: string = await this.getElementStyle(element, cssName);

        expect(recievedValue).toContain(expectedValue);
    }

    async checkElementHref(element: string, expectedHref: string): Promise<void> {
        const currentHref: string = await this.page.locator(element).getAttribute("href");

        expect(currentHref).toContain(expectedHref);
    }

    async verifyCookiesStatus({ page }, status: boolean = true): Promise<void> {
        expect(await page.evaluate(() => document.cookie)).toEqual(`cookies-dialog-accepted=${status}`);
    }

    async acceptCookiesAndVerify({ page }): Promise<void> {
        const commonElements: CommonElements = new CommonElements(page);
        const helpers: Helpers = new Helpers(page);

        await helpers.verifyElementIsVisibleAndEnabled(commonElements.acceptCookiesButton);
        await page.locator(commonElements.acceptCookiesButton).click();

        await this.verifyCookiesStatus({ page });
        await helpers.verifyElementNotExist(commonElements.cookiesPopUpForm);
    }

    async closeCookiesPopupAndVerify({ page }): Promise<void> {
        const commonElements: CommonElements = new CommonElements(page);
        const helpers: Helpers = new Helpers(page);

        await helpers.verifyElementIsVisibleAndEnabled(commonElements.closeCookiesPopupButton);
        await page.locator(commonElements.closeCookiesPopupButton).click();

        await this.verifyCookiesStatus({ page }, false);
        await helpers.verifyElementNotExist(commonElements.cookiesPopUpForm);
    }

    async openAdditionalMenuAndVerify({ page }): Promise<void> {
        const mainPage: MainPage = new MainPage(page);

        await page.locator(mainPage.scrollDownButton).click();
        await this.verifyElementExist(mainPage.additionalInfoDiv);
    }

    async clickOnElement(element: string, options?: {}): Promise<void> {
        await this.page.locator(element).click(options);
    }

    async hoverElement(element: string, options?: {}): Promise<void> {
        await this.page.locator(element).hover(options);
    }

    async reloadPage(options?: {}): Promise<void> {
        await this.page.reload(options);
    }

    async verifyUrl(url: string): Promise<void> {
        await expect(this.page).toHaveURL(url);
    }

    async typeTextToElement(element: string, text: string): Promise<void> {
        await Promise.all([
            expect(this.page.locator(element)).toBeEnabled(),
            this.page.locator(element).type(text),
        ]);
        
    }

    async verifyElementIsNotDisabled(element: string): Promise<void> {
        await expect(this.page.locator(element)).not.toBeDisabled();
    }

    async verifyContainText(locator: string, text: any): Promise<void> {
        await expect(this.page.locator(locator)).toContainText(text);
    }

    async verifyValue(locator: string, value: any): Promise<void> {
        await expect(this.page.locator(locator)).toHaveValue(value);
    }

    async verifyElementIsNotVisible(element: string): Promise<void> {
        await expect(this.page.locator(element)).not.toBeVisible();
    }

    async verifyIsValueNotEqual(firstValue: string, secondValue: string): Promise<void> {
        await expect(firstValue).not.toEqual(secondValue);
    }

    async clearElement(locator: string): Promise<void> {
        await this.page.locator(locator).clear();
    }

    async checkElementAttribute(element: string, attribute: string, expected: string): Promise<void> {
        const current: string = await this.page.locator(element).getAttribute(attribute);

        expect(current).toContain(expected);
    }

    async verifyElementValue(element: string, expected: string): Promise<void> {
        const current: string = await this.page.locator(element).inputValue();

        expect(current).toContain(expected);
    }

    async checkElementCount(element: string, expected: number): Promise<void> {
        expect(await this.page.locator(element).count()).toEqual(expected);
    }  
}
