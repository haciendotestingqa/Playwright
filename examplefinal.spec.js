const { test, expect } = require('@playwright/test');
const { homePage } = require('../Playwright/homeCINEX.page');
const { loginPage } = require('./loginCINEX.page.');

//AAA
//POM

// DECLARACION DE VARIABLES >

// URL de prueba
//const URL = 'https://www.cinex.com.ve/';
const Usuario = 'romerovg.16@gmail.com';
const Contrasena = 'VEr2476494.';
const Saludo = 'Hola Verónica';
const Pelicula = 'MOANA 2';


async function cerrarPopUp(page) {

  // Abrir pagina web de prueba
  
  await HomePage.navigateToCINEXWebsite();

    // Ubicar la imagen de la ventana pop-up desplegada al inicio
  const imagePopUp = 'img[src="assets/popup/xpre-venta-disponible-feed.jpg.pagespeed.ic.YaPJbvzW3-.webp"]';

  // Esperar a que la página esté completamente cargada antes de cerrar la ventana pop-up
  await page.waitForTimeout(1000);

  // Verificar si la imagen de la ventana pop-up está visible antes de continuar
  try {
    // Esperar a que la imagen este visible con un ligero incremento en la espera
    const image = await page.waitForSelector(imagePopUp, { state: 'visible', timeout: 1000 }); 
    // Verificar que la imagen este visible
    await expect(image).toBeVisible(); 
  }
  catch (error) {
    // Manejo    posibles errores
    if (error.name === 'TimeoutError') {
      console.error(`Image with src "${imagePopUp}" not found or took too long to appear.`);
    } else {
        console.error(`An unexpected error occurred: ${error}`);
     }
  }

  // Ubicar el botón 'Cerrar' en la ventana pop-up desplegada al inicio
  const cerrarBotonPopup = await page.locator('a[title="Haga click para cerrar"]');

  // Hacer click en el boton 'Cerrar'
  await cerrarBotonPopup.click();
  await page.waitForTimeout(500);
  
  // Verificar si la imagen de la ventana pop-up ya NO está visible
  try {
    await expect(page.locator(imagePopUp)).not.toBeVisible();
    }
  catch (error) {
      if (error.name === 'TimeoutError') {
        console.error(`Image with src "${imagePopUp}" is still visible after closing the popup.`);
      } else {
        console.error(`An unexpected error occurred: ${error}`);
      };
  };
};

async function inicioSesion(page) {

  // Hacer click en Boton INGRESA e ingresar datos de Usuario y Contrasena
  await page.getByRole('banner').getByRole('link', { name: 'Ingresa' }).click();  
  await page.getByPlaceholder('Ingrese su Correo Electrónico').click();
  await page.locator('input[id="username"]').fill(Usuario);
  await page.locator('input[id="password"]').fill(Contrasena);
  await page.locator('input[id="btnloginsubmit"]').click();

  // Validacion de Inicio de Sesion exitoso
  await expect(page.locator('a.login-btn span#usernames').first()).toBeVisible();
  await expect(page.locator('a.login-btn span#usernames').first()).toHaveText(Saludo);
  
};




test.describe('CINEX Website', () => {

    test('Flujo de Compra PELICULA TOP 5', async ({ page }) => {
    
    const HomePage = new homePage(page);
    const LoginPage = new loginPage(page);
  

    // Llamar a Funcion Cierre de Pop-up desplegado al inicio
    await cerrarPopUp(page);

    // Llamar a Funcion Inicio de Sesion
    await inicioSesion(page);

    // Ir al Home (verificar si hace falta)
          //await page.getByRole('link', { name: 'logo cinex' }).click();
    await HomePage.clickOnCINEXLogo();
    await page.waitForTimeout(5000);

    // Llamar a Funcion Cierre de Pop-up desplegado al inicio
    await cerrarPopUp(page);

    // Ubicar la seccion TOP 5
    const top5Section = await page.locator('#divtop5');

    // Hacer scroll hasta la seccion TOP5
    await top5Section.scrollIntoViewIfNeeded(); 
 
    // Ubicar la pelicula "MOANA 2" dentro de la seccion TOP 5
    const Movie = await top5Section.locator(`img.lazy[alt="${Pelicula}"]`);

    // Ubicar centro del poster de la pelicula seleccionada
    const boundingBox = await Movie.boundingBox();    

    // Mover el mouse hasta el centro del poster de la pelicula seleccionada
    await page.mouse.move(boundingBox.x + boundingBox.width / 2, boundingBox.y + boundingBox.height / 2, { relative: true });  
 
    // Hacer click sobre el boton "COMPRAR"
    await page.getByRole('link', { name: 'COMPRAR' }).click();


 





    // Esperar a que cargue el detalle de la pelicula
    await page.waitForTimeout(1000);



  });
}); 
  


  
  
  //  await page.getByRole('link', { name: 'COMPRAR' }).click();
  //  await page.getByRole('button', { name: 'Sala 6 05:10 pm' }).click();
  //  await page.getByPlaceholder('Ingrese su Correo Electrónico').click();
  //  await page.getByPlaceholder('Ingrese su Correo Electrónico').fill('romerovg.16@gmail.com');
  //  await page.getByPlaceholder('Ingrese su Correo Electrónico').press('Tab');
  //  await page.getByPlaceholder('Ingrese su Contraseña *').fill('VEr2476494.');
  //  await page.getByRole('button', { name: 'Aceptar' }).click();
  //  await page.getByRole('button', { name: '+' }).first().click();
  //  await page.getByText('Acepto los Terminos y').click();
  //  await page.getByRole('button', { name: 'ACEPTAR' }).click();
  //  page.locator('.form-check-input');