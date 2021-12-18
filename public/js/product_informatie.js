// Product_informatie.js

const productNaam = document.querySelector('#productNaam');
const productBeschrijving = document.querySelector('#productBeschrijving');

let form = document.querySelector('#form');
let input = document.querySelector('#form_input');
let submit = document.querySelector('#submit');

submit.addEventListener('click', (e) => {
	e.preventDefault();
	makeRequest();
});
async function makeRequest() {
	const reqdata = {
		testWaarde: input.value,
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
