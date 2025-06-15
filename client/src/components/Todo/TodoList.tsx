import React from 'react';
import { Todo } from '../../types/todo.types';

interface TodoListProps {
  todos: Todo[];
  isLoading: boolean;
  isError: boolean;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, isLoading, isError, onToggle, onRemove }) => {
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading todos.</div>;
  if (!todos.length) return <div>No todos yet.</div>;

  return (
    <ul className='divide-y divide-gray-200'>
      {todos.map((todo) => (
        <li key={todo.id} className='flex items-center justify-between py-2'>
          <span
            className={`flex-1 cursor-pointer ${todo.completed ? 'line-through text-gray-400' : ''}`}
            onClick={() => onToggle(todo.id)}
          >
            {todo.title}
          </span>
          <button
            className='ml-4 px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600'
            onClick={() => onRemove(todo.id)}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};
