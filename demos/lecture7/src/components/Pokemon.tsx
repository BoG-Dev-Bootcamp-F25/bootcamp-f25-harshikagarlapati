import { useEffect, useState } from "react";

type Props = {
	name: string;
};

type PokemonData = {
	sprites: {
		front_default: string;
	}
};

const delay = (delayMs: number) => new Promise((resolve) => setTimeout(resolve, delayMs))

export const Pokemon = ({ name }: Props) => {
	const [data, setData] = useState<null | PokemonData>(null);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			if (!name) return;

			const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
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
	}, [name]);

	if (error) {
		return <div>{error}</div>
	}

	if (!data) {
		return <div>loading...</div>
	}

	return <div><img src={data.sprites.front_default} /></div>
};
