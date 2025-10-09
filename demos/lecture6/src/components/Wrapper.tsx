import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export const Wrapper = (props: Props) => {
	return <div className="wrapper">{props.children}</div>
};
