import { Page } from "@playwright/test";
import { BasePage } from "./basePage/base.page";

export class ExchangeRatesPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public breadcumbsHome: string = "//div[@data-testid='breadcumbs']/a";
    public currencyConverterSelectFrom: string = "(//div[@variant])[1]";
    public currencyConverterSelectTo: string = " (//div[@variant])[2]";
    public currencyConverterInputFrom: string = "//input[@id='from']";
    public currencyConverterInputTo: string = "//input[@id='to']";
    public secondCurrencyFrom:string = "//ul/li[2]";
    public poupUpFrom:string =  "//ul/li[@data-value='CUR-1']";
    public poupUpTo:string = "//ul/li[@data-value='CUR-3']";
    public swapButton:string = "//div/img[@alt='Change currency']";
    public currentPriceLabel:string = "//div[@class='sc-bEeDdh iGtkmD']";
    public firstCurrencyBuyRate: string = "//h3/following-sibling::div[2]/div[1]/div[2]/div[1]";
    public firstCurrencySellRate: string = "//h3/following-sibling::div[2]/div[1]/div[2]/div[2]";

    public titleExchangeRate: string = "(//main//h3)[1]"; 
    public titleCurrencyConverter: string = "(//main//h3)[2]";
    public breadcumbs: string = "//div[@data-testid='breadcumbs']";
    public exchangeRatesFirstRow: string = "//div[@class='sc-eHIRxx hFpZXN'][1]";
    public dateAndTime: string = "//div[@data-testid='date-and-time']";
    public currencyConverterFromShort: string = "(//div[@class='sc-cKkZIC cJlLbf'])[1]";
    public currencyConverterToShort: string = "(//div[@class='sc-cKkZIC cJlLbf'])[2]";
    public openedListOfCurrency: string = "//div/ul[@role='listbox']";
    public currenciesInList: string = "//div/ul/li";
    public convertFromHelper: string = "//div[@class='sc-gVUVPo cHIpto']";
}
