import { useParams, useSearchParams } from "react-router";

import { useEffect, useState } from "react";

type PokemonData = {
	sprites: {
		front_default: string;
		front_shiny: string;
	}
};

export const Pokemon = () => {
	const { pokemon } = useParams();
	const [queryParams, setQueryParams] = useSearchParams();
	const rawShowShiny = queryParams.get('showShiny');
	const showShiny = rawShowShiny === null || rawShowShiny === '0' ? false : true;

	const [data, setData] = useState<null | PokemonData>(null);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			if (!pokemon) return;

			const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
			if (res.ok) {
				const json = await res.json();
				setData(json);
				setError('');
			} else {
				setData(null);
				setError(await res.text());
			}
		};

		fetchData();
	}, [pokemon]);

	if (error) {
		return <div>{error}</div>
	}

	if (!data) {
		return <div>loading...</div>
	}
	
	if (!pokemon) {
		return <div>no pokemon</div>
	}

	return (
		<div>
			<img src={showShiny ? data.sprites.front_shiny : data.sprites.front_default} />
			<button onClick={() => setQueryParams({ showShiny: showShiny ? '0' : '1' })}>{showShiny ? 'Show default' : 'Show shiny'}</button>
		</div>
	);
};
