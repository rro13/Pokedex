const getPokemon = async(preFix, pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon${preFix}/${pokemon}`);
    if(APIResponse.status === 200) {
        const selectedPokemon = await APIResponse.json();
        return selectedPokemon
    }
}

const capitalizeWords = (word) => {
    const capitalizedWord  = word.charAt(0).toUpperCase() + word.slice(1);
    return capitalizedWord
}

const searchEnglishDescription = (flavor_text_entries) => {
    for(description of flavor_text_entries){
        if(description.language.name == "en"){
            return description.flavor_text
        }
    }
}

const renderInfos = (id, name, weight, description, type) => {
    const elementPokeId = document.getElementById('poke-id');
    const elementPokeName = document.getElementById('poke-name');
    const elementPokeImg = document.getElementById('poke-img');
    const elementWeight = document.getElementById('poke-weight');
    const elementDescription = document.getElementById('poke-description');
    const elementPokeType = document.getElementById('poke-type');
    const notFoundMsg = document.getElementById('not-found-return');

    if(id === undefined) {
        elementPokeImg.src = "not_found.png"
        elementPokeId.textContent = '-';
        elementPokeName.textContent = '-';
        elementWeight.textContent = '-';
        elementPokeType.textContent = '-';
        elementDescription.textContent = '-'
    } else{
        const pageTitle = `Pokédex | ${name}`;
        document.title = pageTitle;
    
        elementPokeId.textContent = id;
        elementPokeName.textContent = name;
        elementWeight.textContent = weight;
        elementDescription.textContent = description.replace("\u000c"," ");
        elementPokeType.textContent = type;
        elementPokeImg.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;
    }

}

let pokeId = "";
const pokemonInfos = async(pokemon) => {
    const elementDescription = document.getElementById('poke-description');
    elementDescription.textContent = "Procurando..."

    const pokeBasicInfos = await getPokemon('', pokemon);
    const pokeText = await getPokemon('-species', pokemon);

    if(pokeBasicInfos && pokeText){
        pokeId = String(pokeBasicInfos.id).padStart(3, '0');
        const pokeName = capitalizeWords(pokeBasicInfos.name);
        const pokeWeight = (pokeBasicInfos.weight)/10 + " kg";
        const pokeDescription = pokeText.flavor_text_entries;
        const englishDescription = searchEnglishDescription(pokeDescription);
        
        if(pokeBasicInfos.types.length > 1) {
            const pokemonType = [];
            /*Itera sob o objeto de tipos (pokeBasicInfos.types) e adiciona cada tipo ao arr (pokemonType), com a primeira letra do nome maiscula, utilizando a função capitalizeWord*/
            pokeBasicInfos.types.forEach(element => pokemonType.push(capitalizeWords(element.type.name)));
            var pokeType = pokemonType.reduce((accum, curr) => accum + "/" + curr);
        }else{
            var pokeType = capitalizeWords(pokeBasicInfos.types[0].type.name);
        }

        renderInfos(pokeId, pokeName, pokeWeight, englishDescription, pokeType);
    }else {
        renderInfos()
    }
    
}

const nextBtn = () => {
    if(pokeId == 905) {
        pokeId = 1
    }else {
        pokeId = Number(pokeId) + 1;
    }
    pokemonInfos(pokeId)
}

const previousBtn = () => {
    if(pokeId == 1 || pokeId == "") {
        pokeId = 905
    }else {
        pokeId = Number(pokeId) - 1;
    }
    pokemonInfos(pokeId)
}

const form = document.getElementById('form');
const inputBar = document.getElementById('search-bar');
const searchPokemon = (event) => {
    if(inputBar.value != ""){
        pokemonInfos(inputBar.value.toLowerCase());
        inputBar.value = '';
        event.preventDefault();
    }
}

form.addEventListener("submit", searchPokemon);
