// Product_informatie.js

const productNaam = document.querySelector('#productNaam');
const productBeschrijving = document.querySelector('#productBeschrijving');

let form = document.querySelector('#form');
let input = document.querySelector('#form_input');
let submit = document.querySelector('#submit');

submit.addEventListener('click', (e) => {
	e.preventDefault();
	getSearch();
});

let getSearch = async () => {
	let res = await axios.get(
		`https://www.bol.com/nl/rnwy/search-suggestions/products?query=${input.value}`
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
}
