const url = 'https://pokeapi.co/api/v2/pokemon';

let correctAnswer = ''; //Almacena el nombre correcto del pokemmon
let correctHeight = '';
let correctWeight = ''; 
let correctTypes = '';

async function getPokemon(id) {
    const response = await fetch(`${url}/${id}`);
    const data = await response.json();
    return data;
}

function getImagePokemon(id){
    const imageString = '00' + id;
    return imageString.slice(-3);
}

function getRandomId() {
    return Math.floor(Math.random() * 50) + 1;
}

function shuffleArray(array) {
    for ( let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/*Funcion para iniciar el juego*/
async function startGame(){
    const randomId = getRandomId();
    const pokemon = await getPokemon(randomId);
    correctAnswer = pokemon.name;
    correctHeight = pokemon.height;
    correctWeight = pokemon.weight;
    correctTypes = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');

    const imageId = getImagePokemon(randomId);
    const imgElement = document.getElementById('imagen');
    imgElement.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imageId}.png`;
    imgElement.style.filter = 'brightness(0)'

    const options = [correctAnswer];
    while (options.length < 3) {
        const randomOptionId = getRandomId();
        const optionPokemon = await getPokemon(randomOptionId);
        if (!options.includes(optionPokemon.name)) {
            options.push(optionPokemon.name);
        }
    }

    shuffleArray(options);
    document.getElementById('option1').value = options[0];
    document.getElementById('option2').value = options[1];
    document.getElementById('option3').value = options[2];
    document.getElementById('result').textContent = '';
    document.getElementById('result-height').textContent = '';
    document.getElementById('result-weight').textContent = '';
    document.getElementById('result-type').textContent = '';
}

function checkAnswer(button) {
    const selectedName = button.value;
    const resultElement = document.getElementById('result');
    const resultHeight = document.getElementById('result-height');
    const resultWeight = document.getElementById('result-weight');
    const resultType= document.getElementById('result-type');
    const imgElement = document.getElementById('imagen');

    if(selectedName === correctAnswer) {
        resultElement.innerHTML  = `<strong>Name:</strong> ${correctAnswer} `;
        resultHeight.innerHTML = `<strong>Height:</strong> ${correctHeight}`;
        resultWeight.innerHTML = `<strong>Weight:</strong> ${correctWeight}`;
        resultType.innerHTML = `<strong>Type:</strong> ${correctTypes}`;
        imgElement.style.filter = 'brightness(1)';
        // setTimeout(startGame, 2000);
    }else {
        resultElement.textContent = 'Incorrecto'
    }
}