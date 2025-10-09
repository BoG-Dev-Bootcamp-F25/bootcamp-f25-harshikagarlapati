import type { Task } from "../types";

type Props = {
	task: Task;
};

export const TaskDisplay = ({ task }: Props) => {
	return <div>{task.name}</div>
};
