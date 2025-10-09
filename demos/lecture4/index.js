const container = document.getElementById('container');
const button = document.getElementById('button');
const button2 = document.getElementById('button2');

let click = 0;
button.addEventListener('click', (event) => {
	const text = document.createElement('p');
	text.innerText = 'Click ' + click;
	container.prepend(text);
	click++;
});

button2.addEventListener('click', async (event) => {
	// API docs: https://pokeapi.co/docs/v2#pokemon
	// Challenge: show some more information about this pokemon or even allow
	//            getting info for any pokemon
	const response = await fetch('https://pokeapi.co/api/v2/pokemon/azumarill');
	const data = await response.json();
	const img = document.createElement('img');
	img.src = data.sprites.front_default;
	container.appendChild(img);
});


