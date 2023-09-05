import { test } from "@playwright/test";
import { Helpers } from "../../../helpers/helpers";
import { Hrefs } from "../../../data/test-data/href-values.enum";
import { PrivacyPolicyPage } from "../../../page-object-model/privacy-policy.page";

test.describe("US 1.10 Main components", () => {
    let helpers: Helpers;
    let privacyPolicy: PrivacyPolicyPage;

    test.beforeEach(async ({ page }) => {
        helpers = new Helpers(page);
        privacyPolicy = new PrivacyPolicyPage(page);

        await page.goto("/documents");
    });

    test("C6076203 Check the text label 'Privacy Policy'", async () => {
        await helpers.clickOnElement(privacyPolicy.privacyPolicy);
        await helpers.verifyElementHaveText(privacyPolicy.title, "Privacy policy");
        await helpers.verifyUrl(Hrefs.PRIVACY_POLICY);
    });

    test("C6076216 Check the text label 'Remote banking rules'", async () => {
        await helpers.clickOnElement(privacyPolicy.bankingRules);
        await helpers.verifyElementHaveText(privacyPolicy.title, "Remote banking rules");
        await helpers.verifyUrl(Hrefs.REMOTE_BANKING_RULES);
    });

    test("C6076227 Check the text label 'Terms of Personal Data Processing and Cookies'", async () => {
        await helpers.clickOnElement(privacyPolicy.termsOfPersonalData);
        await helpers.verifyElementHaveText(privacyPolicy.title, "Terms of Personal Data Processing and Cookies");
        await helpers.verifyUrl(Hrefs.COOKIES_POLICY);
    });
});
