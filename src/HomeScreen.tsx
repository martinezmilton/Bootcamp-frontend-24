import { View, StyleSheet, FlatList, Text } from "react-native"
import { getPokemon } from "./getPokemon"
import { PokemonCard } from "./components/PokemonCard";
import { useEffect, useState } from "react";
import { Pokemon } from "./pokemon";

export const HomeScreen = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);//Lista de pokemones
    const [isLoading, setIsLoading] = useState(true);//Carga de datos
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const data = await getPokemon(0); //Lama a los datos desde getPokemon
                setPokemons(data);
                setIsLoading(false);
            } catch (err) {
                setError('Error fetching data');
                setIsLoading(false);
            }
        };

        fetchPokemons();
    }, []);

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <View style={styles.margin}>
            <FlatList
                data={pokemons}
                keyExtractor={(pokemon) => `${pokemon.id}`}
                numColumns={2}
                ListHeaderComponent={() => <Text>Pokedex</Text>}
                renderItem={({ item }) => <PokemonCard pokemon={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    imgPosition: {
        position: 'absolute',
        top: -100,
        right: -100,
    },
    margin: {
        marginHorizontal: 20,
        marginTop: 50,
    }
});