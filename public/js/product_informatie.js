// Product_informatie.js

const productNaam = document.querySelector('#productNaam');
const productBeschrijving = document.querySelector('#productBeschrijving');

let request = async () => {
	const reqdata = {
		testWaarde: '123',
	};

	const response = await fetch('http://localhost:3000/api');
	const data = await response.json();
	productNaam.textContent = data.productTitel;
	productBeschrijving.textContent = data.productBeschrijving;
};

console.log(request());
