export class homePage {

    //VARIABLES
    //protected readonly page: Page;

    //CONSTRUCTOR
    constructor(page){
        this.page = page;
    }

    get elements(){
        return{
            topMenu: {
                home: this.page.locator('a[href="index.html"] img[alt="logo cinex"]').first(),
                login: this.page.locator('[href="#login-register-popup"]')


            }
        }
    }

    //METHODS
    async clickOnCINEXLogo(){
        await this.elements.topMenu.home.click();
    }

    async navigateToCINEXWebsite(){
        const URL = 'https://www.cinex.com.ve/';
        await this.page.goto(URL);

    }
}