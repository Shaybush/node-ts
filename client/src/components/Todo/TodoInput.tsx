import React, { useState } from 'react';

interface TodoInputProps {
  onAdd: (title: string) => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className='flex mb-4'>
      <input
        className='flex-1 border rounded-l px-3 py-2 focus:outline-none'
        type='text'
        placeholder='Add a new todo...'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600'>
        Add
      </button>
    </form>
  );
};
