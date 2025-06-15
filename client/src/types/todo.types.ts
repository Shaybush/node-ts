export type Todo = {
    id: number;
    title: string;
    completed: boolean;
    createdAt: string;
};

export type TodoApiResponse = {
    data: Todo[];
    meta: {
        totalRowCount: number;
    };
}; 