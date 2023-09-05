import { ContactPage } from '../../../page-object-model/contact.page';
import { test } from "@playwright/test";
import { Hrefs } from "../../../data/test-data/href-values.enum";
import { Helpers } from "../../../helpers/helpers";
import { Footer } from "../../../page-object-model/footer.page";
import { CssValues } from "../../../data/test-data/css-values.enum";
import { Header } from "../../../page-object-model/header.page";
import { ContactTextData } from '../../../data/text-data/contact.enum';
import { MainPage } from '../../../page-object-model/main.page';
import { Credentials } from '../../../data/test-data/credentials-values.enum';

test.describe("US-1.9 Contacts", () => {
    let footer: Footer;
    let header: Header;
    let helpers: Helpers;
    let contactPage: ContactPage;
    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        helpers = new Helpers(page);
        footer = new Footer(page);
        header = new Header(page);
        contactPage = new ContactPage(page);
        mainPage = new MainPage(page);
        await page.goto("/");
        await mainPage.enterEmailAndPassword(Credentials.USER_EMAIL, Credentials.PASSWORD);
        await helpers.clickOnElement(mainPage.logInButton);

        await helpers.verifyUrl(Hrefs.MAIN_MENU);

        await page.goto(Hrefs.CONTACT);
    });

    test("C6188701	Check the functionality of the breadcrumbs (Logged in user)", async () => {
        await helpers.clickOnElement(contactPage.breadcumbsHome);

        await helpers.verifyUrl(Hrefs.MAIN_MENU);
    });
});	 