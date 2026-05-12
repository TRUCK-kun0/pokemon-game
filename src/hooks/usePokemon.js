import { useState, useEffect } from 'react';

const POKEAPI_BASE = 'https://pokeapi.co/api/v2';

export const usePokemon = (pokemonId) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemonId) return;

    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${POKEAPI_BASE}/pokemon/${pokemonId}`);
        if (!response.ok) throw new Error('Failed to fetch Pokémon');
        const data = await response.json();
        
        setPokemon({
          id: data.id,
          name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
          types: data.types.map(t => t.type.name),
          stats: {
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            spAtk: data.stats[3].base_stat,
            spDef: data.stats[4].base_stat,
            speed: data.stats[5].base_stat,
          },
          sprite: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
          height: data.height / 10, // Convert to meters
          weight: data.weight / 10, // Convert to kg
        });
        setError(null);
      } catch (err) {
        setError(err.message);
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [pokemonId]);

  return { pokemon, loading, error };
};

export const usePokemonList = (limit = 20, offset = 0) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${POKEAPI_BASE}/pokemon?limit=${limit}&offset=${offset}`
        );
        if (!response.ok) throw new Error('Failed to fetch Pokémon list');
        const data = await response.json();
        
        // Fetch details for each Pokémon in parallel
        const detailedPokemon = await Promise.all(
          data.results.map(async (poke) => {
            const pokeResponse = await fetch(poke.url);
            const pokeData = await pokeResponse.json();
            return {
              id: pokeData.id,
              name: pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1),
              types: pokeData.types.map(t => t.type.name),
              sprite: pokeData.sprites.other['official-artwork'].front_default || pokeData.sprites.front_default,
            };
          })
        );
        
        setPokemonList(detailedPokemon);
        setTotal(data.count);
        setError(null);
      } catch (err) {
        setError(err.message);
        setPokemonList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, [limit, offset]);

  return { pokemonList, loading, error, total };
};

export const useStarters = () => {
  const [starters, setStarters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStarters = async () => {
      try {
        setLoading(true);
        // Fetch starters from all 10 generations
        const starterIds = [
          // Gen 1
          1, 4, 7,
          // Gen 2
          152, 155, 158,
          // Gen 3
          252, 255, 258,
          // Gen 4
          387, 390, 393,
          // Gen 5
          495, 498, 501,
          // Gen 6
          650, 653, 656,
          // Gen 7
          722, 725, 728,
          // Gen 8
          810, 813, 816,
          // Gen 9
          906, 909, 912,
          // Gen 10
          10001, 10004, 10007, // Placeholder - update with actual Gen 10 IDs when available
        ];

        const starterData = await Promise.all(
          starterIds.map(async (id) => {
            try {
              const response = await fetch(`${POKEAPI_BASE}/pokemon/${id}`);
              if (!response.ok) return null;
              const data = await response.json();
              return {
                id: data.id,
                name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
                types: data.types.map(t => t.type.name),
                stats: {
                  hp: data.stats[0].base_stat,
                  attack: data.stats[1].base_stat,
                  defense: data.stats[2].base_stat,
                  spAtk: data.stats[3].base_stat,
                  spDef: data.stats[4].base_stat,
                  speed: data.stats[5].base_stat,
                },
                sprite: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
                generation: Math.ceil(data.id / 151), // Approximate generation
              };
            } catch {
              return null;
            }
          })
        );

        setStarters(starterData.filter(Boolean));
        setError(null);
      } catch (err) {
        setError(err.message);
        setStarters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStarters();
  }, []);

  return { starters, loading, error };
};
