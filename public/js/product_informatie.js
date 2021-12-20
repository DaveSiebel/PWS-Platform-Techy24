// Zoek de HTML elementen

const productNaam = document.querySelector('#productNaam');
const productBeschrijving = document.querySelector('#productBeschrijving');
const productPrijs = document.querySelector('#productPrijs');

let form = document.querySelector('#form');
let input = document.querySelector('#form_input');
let submit = document.querySelector('#submit');

// Zoek de bol.com link bij de zoekterm
let getSearch = async (zoekParameter) => {
	let res = await axios.get(
		`https://www.bol.com/nl/rnwy/search-suggestions/products?query=${zoekParameter}`
	);
	console.log(res);
	zoekLink = 'https://bol.com' + res.data.suggestions[0].href;
	makeRequest(zoekLink);
};

// Maak een API call naar de back-end voor de productinformatie
async function makeRequest(zoekLink) {
	// Zet de link van Bol.com om in een JSON object
	const reqdata = {
		testWaarde: zoekLink,
	};
	console.log(reqdata);

	// Maak de API call naar localhost:3000/api
	const response = await fetch('http://localhost:3000/api', {
		method: 'POST',
		body: JSON.stringify(reqdata),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const data = await response.json();
	// Plaats de productinformatie in de HTML
	productNaam.textContent = data.productTitel;
	productBeschrijving.textContent = data.productBeschrijving;
	productPrijs.textContent = '€' + data.productPrijs;
}

// Haal de zoekterm op uit de link
function zoekbalkValue() {
	const urlParameters = new URLSearchParams(window.location.search);
	const zoekParameter = urlParameters.get('q');
	getSearch(zoekParameter);
}

zoekbalkValue();

// Haal de zoekterm uit de zoekbalk
submit.addEventListener('click', (e) => {
	e.preventDefault();
	productNaam.textContent = 'Laden...';
	productBeschrijving.textContent = 'Laden...';
	productPrijs.textContent = 'Laden...';
	getSearch(input.value);
});
