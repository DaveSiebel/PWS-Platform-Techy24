// Importeer de HTML zoekbalk en zoekknop
let form = document.querySelector('#form');
let input = document.querySelector('#form_input');
let submit = document.querySelector('#submit');

// Bekijk of de zoekknop of enter wordt ingedrukt
submit.addEventListener('click', (e) => {
	e.preventDefault();
	getSearch(input.value);
});

// Open een nieuwe pagina waar in de link achter q= de zoekterm staat
function getSearch(zoekQuery) {
	window.open(`/product?q=${zoekQuery}`, '_self');
}
