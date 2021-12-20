// Maak de back-end server met Express
const express = require('express');
const app = express();
const port = 3000;

// Importeer functies uit Express om te gebruiken met JSON
app.use(express.json());

// Stel vast waar alle bestanden zijn opgeslagen
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

app.set('views, ./views');

// Vertel Express om EJS te gebruiken
app.set('view engine', 'ejs');

// Zorg dat de link uitkomt bij het bestand
app.get('', (req, res) => {
	res.render('index');
});

app.get('/winkelmand', (req, res) => {
	res.render('winkelmand');
});

app.get('/bestellen', (req, res) => {
	res.render('bestellen');
});

app.get('/product', (req, res) => {
	res.render('product');
});

app.get('/klantenservice', (req, res) => {
	res.render('klantenservice');
});

app.get('/bestellen', (req, res) => {
	res.render('bestellen');
});

// Importeer Puppeteer (Data-scraper)

const puppeteer = require('puppeteer');

// Luister naar API post requests
app.post('/api', (req, res) => {
	// Zet de verzochte link in een object
	const object = {
		zoekLink: req.body.testWaarde,
	};

	// Start met het data-scrapen
	async function start() {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto(object.zoekLink);
		await page.click('.js-confirm-button');

		let productNaam = '';
		let productBeschrijving = '';
		let productPrijs = 'ERROR';

		try {
			productNaam = await page.$eval(
				'.page-heading span',
				(el) => el.textContent
			);
		} catch {}

		try {
			productBeschrijving = await page.$eval(
				'.page-heading .sub-title',
				(el) => el.textContent
			);
		} catch {}

		try {
			productPrijs = await page.$eval('.promo-price', (el) => el.textContent);
		} catch {}

		dataNaarFrontend(productNaam, productBeschrijving, productPrijs);
		await browser.close();
	}

	start();

	function dataNaarFrontend(productNaam, productBeschrijving, productPrijs) {
		const data = dataNaarObject(productNaam, productBeschrijving, productPrijs);
		res.json(data);
	}
});

function dataNaarObject(productNaam, productBeschrijving, productPrijs) {
	const data = {
		productTitel: productNaam,
		productBeschrijving: productBeschrijving,
		productPrijs: productPrijs,
	};
	return data;
}

// Express
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
