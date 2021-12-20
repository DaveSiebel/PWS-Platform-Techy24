// Product_informatie.js

const productNaam = document.querySelector('#productNaam');
const productBeschrijving = document.querySelector('#productBeschrijving');
const productPrijs = document.querySelector('#productPrijs');

let form = document.querySelector('#form');
let input = document.querySelector('#form_input');
let submit = document.querySelector('#submit');

let getSearch = async (zoekParameter) => {
	let res = await axios.get(
		`https://www.bol.com/nl/rnwy/search-suggestions/products?query=${zoekParameter}`
	);
	console.log(res);
	zoekLink = 'https://bol.com' + res.data.suggestions[0].href;
	makeRequest(zoekLink);
};

async function makeRequest(zoekLink) {
	const reqdata = {
		testWaarde: zoekLink,
	};
	console.log(reqdata);

	const response = await fetch('http://localhost:3000/api', {
		method: 'POST',
		body: JSON.stringify(reqdata),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const data = await response.json();
	productNaam.textContent = data.productTitel;
	productBeschrijving.textContent = data.productBeschrijving;
	productPrijs.textContent = '€' + data.productPrijs;
}

function zoekbalkValue() {
	const urlParameters = new URLSearchParams(window.location.search);
	const zoekParameter = urlParameters.get('q');
	getSearch(zoekParameter);
}

zoekbalkValue();

submit.addEventListener('click', (e) => {
	e.preventDefault();
	productNaam.textContent = 'Laden...';
	productBeschrijving.textContent = 'Laden...';
	productPrijs.textContent = 'Laden...';
	getSearch(input.value);
});
