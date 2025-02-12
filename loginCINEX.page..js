export class loginPage {

    //CONSTRUCTOR
    constructor(page){
        this.page = page;
    }

    get elements(){
        return{
            textBoxes: {
                correoElectronico: this.page.locator('input[id="username"]'),
                contrasena: this.page.locator('input[id="password"]'),
            },
            buttons: {
                aceptarButton: this.page.locator('input[id="btnloginsubmit"]'),
                XButton: this.page.locator('button[title="Close (Esc)'),
            },
            //messages: {
            //    welcomeMessage: this.page.locator('a.login-btn span#usernames').first(),
            //}
        };
    };

    async insertCorreoElectronico(){
        const Usuario = 'romerovg.16@gmail.com';
        await this.elements.textBoxes.correoElectronico.fill(Usuario);
    }

    async insertContrasena(){
        const Contrasena = 'VEr2476494.';
        await this.elements.textBoxes.contrasena.fill(Contrasena);
    }

    async clickOnAceptarButton(){
        await this.elements.buttons.aceptarButton.click();
    }

    async clickOnXButton(){
        await this.elements.buttons.XButton.click();
    }

    //async validateLogin(){
    //    const Saludo = 'Hola Verónica';
    //    await expect(this.elements.messages.welcomeMessage).toBeVisible();
    //    await expect(this.elements.messages.welcomeMessage).toHaveText(Saludo);
    //}

};