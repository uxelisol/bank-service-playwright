import { test } from "@playwright/test";
import { MainPage } from "../../../page-object-model/main.page";
import { CommonElements } from "../../../page-object-model/common-elements.page";
import { Helpers } from "../../../helpers/helpers";
import { Hrefs } from "../../../data/test-data/href-values.enum";
import { BlockedUser } from "../../../data/test-data/credentials-values.enum";

test.describe("US-1.11 Blocked account", () => {
    let commonElements: CommonElements;
    let mainPage: MainPage;
    let helpers: Helpers;

    test.beforeEach(async ({ page }) => {
        commonElements = new CommonElements(page);
        mainPage = new MainPage(page);
        helpers = new Helpers(page);

        await page.goto("/");
    });

    test("C6182440 Check the blocked account modal window appearance", async () => {
        await mainPage.enterEmailAndPassword(BlockedUser.EMAIL, BlockedUser.PASSWORD);
        await helpers.clickOnElement(mainPage.logInButton);

        await helpers.verifyElementIsVisible(mainPage.blockedAccountModal);
    });

    test("C6182477 Check the functionality of the 'Close' button - the cross in upper right corner", async () => {
        await mainPage.enterEmailAndPassword(BlockedUser.EMAIL, BlockedUser.PASSWORD);
        await helpers.clickOnElement(mainPage.logInButton);

        await helpers.verifyElementIsVisible(mainPage.blockedAccountModalCloseButton);
        await helpers.clickOnElement(mainPage.blockedAccountModalCloseButton);

        await helpers.verifyElementNotExist(mainPage.blockedAccountModal);
        await helpers.verifyUrl("/");
    });

    test("C6182452 Check the possibility to close the blocked account modal window through clicking on the page background", async () => {
        await mainPage.enterEmailAndPassword(BlockedUser.EMAIL, BlockedUser.PASSWORD);
        await helpers.clickOnElement(mainPage.logInButton);

        await helpers.clickOnElement(mainPage.blockedAccountModalContactButton);

        await helpers.verifyUrl(Hrefs.CONTACT);
    });

    test("C6182443 Check the functionality of the 'Polybank branches' hyperlink", async () => {
        await mainPage.enterEmailAndPassword(BlockedUser.EMAIL, BlockedUser.PASSWORD);
        await helpers.clickOnElement(mainPage.logInButton);

        await helpers.clickOnElement(mainPage.blockedAccountModalBranchButton);

        await helpers.verifyUrl(Hrefs.BANK_BRANCHES);
    });
});
