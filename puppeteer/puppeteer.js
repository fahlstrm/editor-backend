const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars'); 
const path = require('path');


// Puppeteer functions 
const data = {
    // test: {
    //     title: "test",
    //     text: `<p>Detta är Tokers dokument</p><p><br></p><p>Som delas med Frida</p><p>Så det så</p><p><br></p><p>Toker skriver</p><p>Frida ser</p>`
    // },
    createPdf: async function (data) {
        try {
            const browser = await puppeteer.launch({ args: [ '--no-sandbox' ], ignoreDefaultArgs: ['--disable-extensions'] });
            const page = await browser.newPage();
            const content = await this.compile('template', data)

            await page.setContent(content);
            await page.emulateMediaType('screen');
            let buffer = await page.pdf({
                path: 'editor.pdf',
                format: 'A4',
                printBackground: true
            });

            await browser.close();
            return buffer;
            // process.exit();
        } catch (e) {
            console.log('Error: ', e);
            
        }
    },
    compile: async function(templateName, data) {
        const filePath = path.join(process.cwd(), 'puppeteer',  `${templateName}.hbs`)
        const html = await fs.readFile(filePath, 'utf-8');

        return hbs.compile(html)(data);
    }
}

module.exports = data;
