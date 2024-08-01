import { Pokemon } from "./pokemon";
import { PokemonMapper } from "./pokemon.mapper";

export const getPokemon = async (offset: number = 0, limit: number = 50): Promise<Pokemon[]> => {//offset define la paginacion 
    try {
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`; 
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();//Convertir respuesta a json

        const pokemonPromises = data.results.map((info: { url: string }) =>
            fetch(info.url).then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
        );

        const pokeAPIPokemon = await Promise.all(pokemonPromises);
        const pokemons = pokeAPIPokemon.map((item: any) => PokemonMapper.pokeApiPokemonToEntity(item));

        return pokemons;
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        throw new Error('Error fetching Pokémon');
    }
};
