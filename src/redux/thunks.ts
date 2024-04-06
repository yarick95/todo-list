import { ITodo } from '@/types/todos.types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const postTodo = createAsyncThunk<any, ITodo>(
  'todos/post',
  async (data) => {
    const body = {
      ...data,
    };
    const res = await fetch('http://localhost:8000/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  },
);

export const fetchTodos = createAsyncThunk('todos/get', async () => {
  const res = await fetch('http://localhost:8000/api/todos', {
    method: 'GET',
  });
  return await res.json();
});

export const deleteTodo = createAsyncThunk<any, string>(
  'todos/delete',
  async (id) => {
    const res = await fetch(`http://localhost:8000/api/todos/${id}`, {
      method: 'DELETE',
    });
    return await res.json();
  },
);

export const updateTodo = createAsyncThunk<any, ITodo>(
  'todos/update',
  async (data) => {
    const res = await fetch(`http://localhost:8000/api/todos`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
);
