let form = document.querySelector('#form');
let input = document.querySelector('#form_input');
let submit = document.querySelector('#submit');

submit.addEventListener('click', (e) => {
	e.preventDefault();
	getSearch(input.value);
});

function getSearch(zoekQuery) {
	window.open(`/product?q=${zoekQuery}`, '_self');
}
