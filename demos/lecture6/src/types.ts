export type Task = {
	name: string;
	priority: number;
	status: 'todo' | 'in_progress' | 'done';
};
