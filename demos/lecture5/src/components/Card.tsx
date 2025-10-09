type Props = {
	name: string;
	age: number;
};

export const Card = (props: Props) => {
	return (
		<div>
			Hello {props.name}. You are {props.age}
		</div>
	)
};
