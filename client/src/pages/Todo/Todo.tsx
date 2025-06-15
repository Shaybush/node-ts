import React from 'react';
import { TodoList } from '../../components/Todo/TodoList';
import { TodoInput } from '../../components/Todo/TodoInput';
import { useTodos } from './hooks/useTodos';

const Todo: React.FC = () => {
  const { todos, isLoading, isError, addTodo, toggleTodo, removeTodo } = useTodos();

  return (
    <div className='max-w-xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Todo App</h1>
      <TodoInput onAdd={addTodo} />
      <TodoList todos={todos} isLoading={isLoading} isError={isError} onToggle={toggleTodo} onRemove={removeTodo} />
    </div>
  );
};

export default Todo;
