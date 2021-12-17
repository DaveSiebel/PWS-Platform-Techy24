const urlParameters = new URLSearchParams(window.location.search);
const zoekParameter = urlParameters.get('q');

let getSearch = async () => {
	let res = await axios.get(
		`https://www.bol.com/nl/nl/s/?searchtext=${zoekParameter}`,
		config
	);
	console.log(res.data);
	createElements(res);
	// makeElement(res.data);
};

let createElements = (res) => {
	let doc = document.createElement('html');
	doc.innerHTML = res;
};

// let makeElement = (data) => {
// 	for (let i = 0; i < data.suggestions.length; i++) {
// 		const tekst = document.createElement('P');
// 		tekst.append(
// 			'Product: ' + data.suggestions[i].label + ' ID:' + data.suggestions[i].id
// 		);
// 		document.body.append(tekst);
// 	}
// };

getSearch();
