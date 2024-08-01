import { Pokemon } from "./pokemon";

interface PokemonAPIData {
    id: number;
    name: string;
    types: { type: { name: string } }[];
}

function getImageUrl(id: number): string {
    const formattedId = id.toString().padStart(3, '0');
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formattedId}.png`;
}

export class PokemonMapper {
    static pokeApiPokemonToEntity(data: PokemonAPIData): Pokemon { //Convertir los datos api en un objeto Pokemon
        const avatar = getImageUrl(data.id);
        //const avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;

        return {
            id: data.id,
            name: data.name,
            avatar: avatar,
            types: data.types.map(type => type.type.name),
        }
    }
}
