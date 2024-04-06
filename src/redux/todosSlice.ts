import { ITodo, ITodosState } from '@/types/todos.types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchTodos, postTodo, updateTodo } from './thunks';

const initialState: ITodosState = {
  todos: [],
  todo: {
    _id: '',
    name: '',
    description: '',
    progress: 0,
  },
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.todos.push(action.payload);
    },
    getTodo: (state, action: PayloadAction<string>) => {
      state.todo = state.todos.filter((item) => item._id === action.payload)[0];
    },
    putTodo: (state, action: PayloadAction<ITodo>) => {
      state.todo = action.payload;
    },
    setTodosState: (state, action: PayloadAction<ITodo[]>) => {
      state.todos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postTodo.fulfilled, (state, action) => {
        console.log('posted!');
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        console.log('updated!');
      });
  },
});

export const { setTodosState, addTodo, getTodo, putTodo } = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
