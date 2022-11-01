const getPokemon = async(preFix, pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon${preFix}/${pokemon}`);
    const selectedPokemon = await APIResponse.json();
    return selectedPokemon
}

const renderInfos = (id, name, weight, description, type) => {
    const elementPokeId = document.getElementById('poke-id');
    const elementPokeName = document.getElementById('poke-name');
    const elementPokeImg = document.getElementById('poke-img');
    const elementWeight = document.getElementById('poke-weight');
    const elementDescription = document.getElementById('poke-description');
    const elementPokeType = document.getElementById('poke-type');

    elementPokeId.textContent = id;
    elementPokeName.textContent = name;
    elementWeight.textContent = weight;
    elementDescription.textContent = description;
    elementPokeType.textContent = type;
    elementPokeImg.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`

}

const capitalizeWords = (word) => {
    const capitalizedWord  = word.charAt(0).toUpperCase() + word.slice(1);
    return capitalizedWord
}

const pokemonInfos = async(pokemon) => {
    const pokeBasicInfos = await getPokemon('', pokemon);
    const pokeText = await getPokemon('-species', pokemon);
    
    const pokeId = String(pokeBasicInfos.id).padStart(3, '0');
    const pokeName = capitalizeWords(pokeBasicInfos.name);
    const pokeWeight = (pokeBasicInfos.weight)/10 + " kg";
    const pokeDescription = pokeText.flavor_text_entries[0].flavor_text;
    
    if(pokeBasicInfos.types.length > 1) {
        const pokemonType = [];
        /*Itera sob o objeto de tipos (pokeBasicInfos.types) e adiciona cada tipo ao arr (pokemonType), com a primeira letra do nome maiscula, utilizando a função capitalizeWord*/
        pokeBasicInfos.types.forEach(element => pokemonType.push(capitalizeWords(element.type.name)));
        var pokeType = pokemonType.reduce((accum, curr) => accum + "/" + curr);
    }else{
        var pokeType = capitalizeWords(pokeBasicInfos.types[0].type.name);
    }

    renderInfos(pokeId, pokeName, pokeWeight, pokeDescription, pokeType)
}

// pokemonInfos(123)

