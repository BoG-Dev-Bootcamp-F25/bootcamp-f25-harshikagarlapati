type Props = {
	onClick: () => void;
};

export const Incrementor = ({ onClick }: Props) => {
	return <button onClick={onClick}>Increment</button>
};
