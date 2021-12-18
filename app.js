const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

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

app.post('/api', (req, res) => {
	const object = {
		zoekLink: req.body.testWaarde,
	};

	async function start() {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto(object.zoekLink);
		await page.click('.js-confirm-button');
		try {
			const productNaam = await page.$eval(
				'.page-heading span',
				(el) => el.textContent
			);
		} catch {
			productNaam = '';
		}
		try {
			const productBeschrijving = await page.$eval(
				'.page-heading .sub-title',
				(el) => el.textContent
			);
		} catch {
			productBeschrijving = '';
		}

		dataNaarFrontend(productNaam, productBeschrijving);
		await browser.close();
	}

	start();

	function dataNaarFrontend(productNaam, productBeschrijving) {
		const data = dataNaarObject(productNaam, productBeschrijving);
		res.json(data);
	}
});

function dataNaarObject(productNaam, productBeschrijving) {
	const data = {
		productTitel: productNaam,
		productBeschrijving: productBeschrijving,
	};
	return data;
}

// Express
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
