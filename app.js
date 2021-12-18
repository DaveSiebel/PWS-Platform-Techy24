const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

app.set('views, ./views');
app.set('view engine', 'ejs');

app.get('', (req, res) => {
	res.render('index');
});

app.get('/winkelmand', (req, res) => {
	res.render('winkelmand');
});

app.get('/winkelmand', (req, res) => {
	res.render('winkelmand');
});

app.get('/zoekfunctie', (req, res) => {
	res.render('zoekfunctie');
});

app.get('/zoekresultaten', (req, res) => {
	res.render('zoekresultaten');
});

app.get('/product', (req, res) => {
	res.render('product');
});

// Puppeteer

const puppeteer = require('puppeteer');
const fs = require('fs').promises;

async function start() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(
		'https://www.bol.com/nl/nl/p/apple-airpods-2-met-reguliere-oplaadcase/9200000108340791/?bltgh=omqEYt0S3RQNAvqrayNIZg.2_35.36.ProductImage'
	);
	await page.click('.js-confirm-button');
	const productTitel = await page.$eval(
		'.page-heading span',
		(el) => el.textContent
	);
	const productBeschrijving = await page.$eval(
		'.page-heading .sub-title',
		(el) => el.textContent
	);
	console.log(productTitel);
	console.log(productBeschrijving);
	await browser.close();
}

start();

// Express
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
