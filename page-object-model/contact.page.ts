import { Page } from "@playwright/test";
import { BasePage } from "./basePage/base.page";

export class ContactPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public title: string = "//main//h4";

    public individualsSectionTitle: string = "//main//section[1]//h5";
    public individualsIcon: string = "//*[@data-testid='individuals-support-icon']";
    public productAdviceLine :string = "(//main//section[@class='sc-dfNdHb gnJBDc']//p)[1]";
    public everyDayLine :string = "(//main//section[@class='sc-dfNdHb gnJBDc']//p)[2]";
    public contactsLine :string = "(//main//section[@class='sc-dfNdHb gnJBDc']//p)[3]";
    public contactsIcon :string = "(//main//section[@class='sc-dfNdHb gnJBDc']//p)[3]//following-sibling::*";
    public individualsPhone: string = "(//main//section[@class='sc-dfNdHb gnJBDc']//p)[5]";
    public individualsPhoneUK: string = "(//main//section[@class='sc-dfNdHb gnJBDc']//p)[4]";

    public cardsSupportSectionTitle: string = "//main//section[2]//h5";
    public cardsSupportIcon: string = "//main//section[2]//h5/following-sibling::*";
    public newCardLine :string = "(//main//section[@class='sc-cDRvxq dupiuS']//p)[1]";
    public weekDaysLine :string = "(//main//section[@class='sc-cDRvxq dupiuS']//p)[2]";
    public contactsCardsLine :string = "(//main//section[@class='sc-cDRvxq dupiuS']//p)[4]";
    public contactsCardsIcon :string = "(//main//section[@class='sc-cDRvxq dupiuS']//p)[4]//following-sibling::*";
    public cardsSupportPhone: string = "(//main//section[@class='sc-cDRvxq dupiuS']//p)[6]";
    public cardsSupportPhoneUK: string = "(//main//section[@class='sc-cDRvxq dupiuS']//p)[5]";

    public breadcumbsHome:string = "//div[@data-testid='breadcumbs']/a";

}
