type Props = {
	count: number;
	setCount: (newCount: number) => void;
};

export const Decrementor = ({ count, setCount }: Props) => {
	return <button onClick={() => setCount(count - 1)}>Decrement</button>
};
