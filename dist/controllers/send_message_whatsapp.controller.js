// import * as puppeteer from 'puppeteer';
// const sendMessage = async (page: puppeteer.Page, to: string, message: string) => {
//   try {
//     await page.goto('https://web.whatsapp.com/');
//     await page.waitForSelector('._1awRl');
//     await page.click('._1awRl');
//     await page.waitForSelector('._2S1VP');
//     await page.type('._2S1VP', to);
//     //await page.waitForTimeout(2000); // Espera para cargar los resultados de búsqueda
//     await page.click(`span[title="${to}"]`);
//     await page.waitForSelector('._3u328');
//     await page.type('._3u328', message);
//     await page.keyboard.press('Enter');
//     console.log('Mensaje enviado a', to);
//   } catch (error) {
//     console.error('Error al enviar mensaje a', to, error);
//   }
// };
// const main = async () => {
//   const browser = await puppeteer.launch({ headless: false }); // Cambia a true si no quieres ver el navegador
//   const page = await browser.newPage();
//   const numbers = [
//     '12345678901',
//     '19876543210',
//     // Agrega más números según sea necesario
//   ];
//   const message = 'Hola, este es un mensaje de prueba desde TypeScript!';
//   for (const number of numbers) {
//     await sendMessage(page, number, message);
//   }
//   await browser.close();
// };
// main();
//# sourceMappingURL=send_message_whatsapp.controller.js.map