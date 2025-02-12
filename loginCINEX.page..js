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
        };
    };

    async insertCorreoElectronico(username){
        await this.elements.textBoxes.correoElectronico.fill(username);
    }

    async insertContrasena(password){
        
        await this.elements.textBoxes.contrasena.fill(password);
    }

    async clickOnAceptarButton(){

        await this.elements.buttons.aceptarButton.click();
    }
};