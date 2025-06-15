import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from '../../../types/todo.types';

// TODO: Replace with your actual API endpoints
const fetchTodos = async (): Promise<Todo[]> => {
    // TODO: Implement fetch from your server
    const res = await fetch('/api/todos');
    if (!res.ok) throw new Error('Failed to fetch todos');
    return res.json();
};

const addTodoApi = async (title: string): Promise<Todo> => {
    // TODO: Implement add todo on your server
    const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
    });
    if (!res.ok) throw new Error('Failed to add todo');
    return res.json();
};

const toggleTodoApi = async (id: number): Promise<Todo> => {
    // TODO: Implement toggle todo on your server
    const res = await fetch(`/api/todos/${id}/toggle`, { method: 'PATCH' });
    if (!res.ok) throw new Error('Failed to toggle todo');
    return res.json();
};

const removeTodoApi = async (id: number): Promise<void> => {
    // TODO: Implement remove todo on your server
    const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to remove todo');
};

export function useTodos() {
    const queryClient = useQueryClient();

    const { data: todos = [], isLoading, isError } = useQuery<Todo[]>({
        queryKey: ['todos'],
        queryFn: fetchTodos,
    });

    const addTodoMutation = useMutation({
        mutationFn: addTodoApi,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
    });

    const toggleTodoMutation = useMutation({
        mutationFn: toggleTodoApi,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
    });

    const removeTodoMutation = useMutation({
        mutationFn: removeTodoApi,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
    });

    return {
        todos,
        isLoading,
        isError,
        addTodo: (title: string) => addTodoMutation.mutate(title),
        toggleTodo: (id: number) => toggleTodoMutation.mutate(id),
        removeTodo: (id: number) => removeTodoMutation.mutate(id),
    };
} 