import { ContactPage } from './../../../page-object-model/contact.page';
import { test } from "@playwright/test";
import { Hrefs } from "../../../data/test-data/href-values.enum";
import { Helpers } from "../../../helpers/helpers";
import { Footer } from "../../../page-object-model/footer.page";
import { CssValues } from "../../../data/test-data/css-values.enum";
import { Header } from "../../../page-object-model/header.page";
import { ContactTextData } from '../../../data/text-data/contact.enum';

test.describe("US-1.9 Contacts", () => {
    let footer: Footer;
    let header: Header;
    let helpers: Helpers;
    let contactPage: ContactPage;

    test.beforeEach(async ({ page }) => {
        helpers = new Helpers(page);
        footer = new Footer(page);
        header = new Header(page);
        contactPage = new ContactPage(page);
        await page.goto(Hrefs.CONTACT);
    });

    test("C6186436 UI: Footer", async () => {
        await helpers.hoverElement(footer.exchangeRates);

        await helpers.checkElementCssStyle(footer.exchangeRates, "border-bottom", CssValues.YELLOW_DASHED_FOOTER);

        await helpers.hoverElement(footer.bankBranches);

        await helpers.checkElementCssStyle(footer.bankBranches, "border-bottom", CssValues.YELLOW_DASHED_FOOTER);

        await helpers.checkElementCssStyle(footer.contact, "border-bottom", CssValues.YELLOW_DASHED_HEADER);

        await helpers.hoverElement(footer.privacyPolicy);

        await helpers.checkElementCssStyle(footer.privacyPolicy, "border-bottom", CssValues.YELLOW_DASHED_FOOTER);

        await helpers.hoverElement(footer.remoteBankingRules);

        await helpers.checkElementCssStyle(footer.remoteBankingRules, "border-bottom", CssValues.YELLOW_DASHED_FOOTER);

        await helpers.hoverElement(footer.cookiesPolicy);

        await helpers.checkElementCssStyle(footer.cookiesPolicy, "border-bottom", CssValues.YELLOW_DASHED_FOOTER);
    });

    test("C6186439 UI: Header", async () => {
        await helpers.hoverElement(header.bankBranchesText);

        await helpers.checkElementCssStyle(header.bankBranchesText, "border-bottom", CssValues.YELLOW_DASHED_FOOTER);

        await helpers.hoverElement(header.exchangeRatesText);

        await helpers.checkElementCssStyle(header.exchangeRatesText, "border-bottom", CssValues.YELLOW_DASHED_FOOTER);

        await helpers.checkElementCssStyle(header.contactText, "border-bottom", CssValues.YELLOW_DASHED_HEADER);
    });

    test("C6186490 UI: Contacts page elements(For individuals)", async () => {
        await helpers.verifyContainText(contactPage.title, ContactTextData.TITLE);
        await helpers.checkElementCssStyle(contactPage.title, "font-weight", "700");
        await helpers.checkElementCssStyle(contactPage.title, "font-size", "32px");

        await helpers.verifyContainText(contactPage.individualsSectionTitle, ContactTextData.FOR_INDIVIDUALS_TITLE);
        await helpers.checkElementCssStyle(contactPage.individualsSectionTitle, "font-weight", "700");
        await helpers.checkElementCssStyle(contactPage.individualsSectionTitle, "font-size", "24px");


        await helpers.verifyElementIsVisible(contactPage.individualsIcon);
        await helpers.checkElementCssStyle(contactPage.individualsIcon, "width", "24");
        await helpers.checkElementCssStyle(contactPage.individualsIcon, "height", "24px");

        await helpers.verifyContainText(contactPage.everyDayLine, ContactTextData.EVERY_DAY);
        await helpers.checkElementCssStyle(contactPage.everyDayLine, "font-size", "12px");

        await helpers.verifyContainText(contactPage.contactsLine, ContactTextData.CONTACTS);
        await helpers.checkElementCssStyle(contactPage.contactsLine, "font-size", "16px");

        await helpers.verifyElementIsVisible(contactPage.contactsIcon);
        await helpers.checkElementCssStyle(contactPage.contactsIcon, "width", "24px");
    });

    test("C6186490 UI: Contacts page elements(Cards support)", async () => {
        await helpers.verifyContainText(contactPage.cardsSupportSectionTitle, ContactTextData.CARDS_SUPPORT);
        await helpers.checkElementCssStyle(contactPage.individualsSectionTitle, "font-weight", "700");
        await helpers.checkElementCssStyle(contactPage.individualsSectionTitle, "font-size", "24px");


        await helpers.verifyElementIsVisible(contactPage.cardsSupportIcon);
        await helpers.checkElementCssStyle(contactPage.cardsSupportIcon, "width", "24");
        await helpers.checkElementCssStyle(contactPage.cardsSupportIcon, "height", "24px");

        await helpers.verifyContainText(contactPage.weekDaysLine, ContactTextData.WEEK_DAYS);
        await helpers.checkElementCssStyle(contactPage.weekDaysLine, "font-size", "12px");

        await helpers.verifyContainText(contactPage.contactsCardsLine, ContactTextData.CONTACTS_CARDS);
        await helpers.checkElementCssStyle(contactPage.contactsCardsLine, "font-size", "16px");

        await helpers.verifyElementIsVisible(contactPage.contactsCardsIcon);
        await helpers.checkElementCssStyle(contactPage.contactsCardsIcon, "width", "24px");
    });

    test("C6186627 Check the functionality of hotline short phone number (For individuals).", async () => {
        await helpers.hoverElement(contactPage.individualsPhone);

        await helpers.checkElementCssStyle(contactPage.individualsPhone, "border-bottom", CssValues.YELLOW_DASHED_FOOTER);
    });

    test("C6186628 Check the functionality of the hotline international phone number (For individuals).", async () => {
        await helpers.hoverElement(contactPage.individualsPhoneUK);

        await helpers.checkElementCssStyle(contactPage.individualsPhoneUK, "border-bottom", CssValues.YELLOW_DASHED_FOOTER);
    });

    test("C6186633 Check the functionality of hotline short phone number (Cards support)", async () => {
        await helpers.hoverElement(contactPage.cardsSupportPhoneUK);

        await helpers.checkElementCssStyle(contactPage.cardsSupportPhoneUK, "border-bottom", CssValues.YELLOW_DASHED_FOOTER);
    });

    test("C6186634 Check the functionality of the hotline international phone number (cards support)", async () => {
        await helpers.hoverElement(contactPage.cardsSupportPhone);

        await helpers.checkElementCssStyle(contactPage.cardsSupportPhone, "border-bottom", CssValues.YELLOW_DASHED_FOOTER);
    });

    test("C6188703 Check the functionality of the breadcrumbs (Logged out user)", async () => {
        await helpers.clickOnElement(contactPage.breadcumbsHome);

        await helpers.verifyUrl("/");
    });
});	 