const getPokemonForType = async(typeId) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/type/${typeId}/`);
    if(APIResponse.status === 200) {
        const selectedTypePokemons = await APIResponse.json();
        document.title = `Pokédex | ${capitalizeWords(selectedTypePokemons.name)}`
        return selectedTypePokemons.pokemon
    }
}

const showPokemonForType = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    checkPokemonSeason1(params.type)
}

const checkPokemonSeason1 = async(typeId) => {
    const pokemons = await getPokemonForType(typeId);
    pokemons.forEach(function(elemento) {
        const urlPokemon = elemento.pokemon.url.slice(0,-1);
        const idPokemon = urlPokemon.substr(34);
        if (idPokemon <= 151) {
            pokemonInfos(idPokemon);
        }
    })
}

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

const renderInfos = (id, name, weight, type) => {
    const pokemonsCards = document.getElementById('pokemonsCards');
    const card = `
    <div class="col-10 col-sm-6 col-lg-4 p-1">
    <div class="card">
        <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" class="card-img-top" alt="${name}">
        <div class="card-body">
            <div class="container d-flex justify-content-around pb-3 pt-3">
                <label class="col-6 col-md-3 fw-bold" for="poke-name">Name:
                    <div class="text-box d-flex justify-content-center rounded fw-normal px-5" class="poke-name">${name}</div>
                </label>
                <label class="col-4 col-md-3 fw-bold" for="poke-id">N°:
                    <div class="text-box d-flex justify-content-center rounded fw-normal" class="poke-id">${id}</div>
                </label>
            </div>
            <div class="container d-flex justify-content-around">
                <label class="col-6 col-md-3 fw-bold" for="type">Type: 
                    <div class="text-box d-flex justify-content-center rounded fw-normal px-5" class="poke-type">${type}</div>
                </label>
                <label class="col-4 col-md-3 fw-bold" for="weight">Weight:
                    <div class="text-box d-flex justify-content-center rounded fw-normal" class="poke-weight">${weight}</div>
                </label>
            </div>
        </div>
    </div>
</div>`

    pokemonsCards.innerHTML += card;
}

const pokemonInfos = async(pokemon) => {
    const pokeBasicInfos = await getPokemon('', pokemon);

        const pokeId = String(pokeBasicInfos.id).padStart(3, '0');
        const pokeName = capitalizeWords(pokeBasicInfos.name);
        const pokeWeight = (pokeBasicInfos.weight)/10 + " kg";
        
        if(pokeBasicInfos.types.length > 1) {
            const pokemonType = [];
            /*Itera sob o objeto de tipos (pokeBasicInfos.types) e adiciona cada tipo ao arr (pokemonType), com a primeira letra do nome maiscula, utilizando a função capitalizeWord*/
            pokeBasicInfos.types.forEach(element => pokemonType.push(capitalizeWords(element.type.name)));
            var pokeType = pokemonType.reduce((accum, curr) => accum + "/" + curr);
        }else{
            var pokeType = capitalizeWords(pokeBasicInfos.types[0].type.name);
        }

        renderInfos(pokeId, pokeName, pokeWeight, pokeType);
}
