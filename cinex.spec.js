const { test, expect } = require('@playwright/test');

test('pagina principal', async ({ page }) => {
  await page.goto('https://www.cinex.com.ve');

  // Buscar la imagen en la página y seleccionarla (reemplaza "lazy" por cualquier otra clase específica si es necesario)
  const imagen = await page.locator('img.lazy[src="assets/popup/xpop-up-dragon-ball-PREVENTA11111.jpg.pagespeed.ic.nfEyBU66Xv.webp"]');
  
  // Asegúrate de que la imagen esté visible antes de continuar
  expect(imagen).toBeVisible();

  // Espera a que la página esté completamente cargada antes de cerrar el pop-up
  await page.waitForTimeout(1000);

  // Haz clic en la imagen para cerrar el pop-up (o haz clic en un botón de cierre si lo hay)
  //await imagen.click();
  
  // Hacer una afirmación para asegurarte de que el pop-up haya sido cerrado correctamente
  //expect(imagen).not.toBeVisible();

  // Buscar el botón 'Cerrar' en la página y hacer clic en él (si es necesario)
  const cerrarPopup = await page.locator('a.bts-popup-close');
  await cerrarPopup.click();
  
  // Hacer una afirmación para asegurarte de que el pop-up haya sido cerrado correctamente
  expect(imagen).not.toBeVisible();
});