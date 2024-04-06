export interface ITodo {
  _id?: string;
  name: string;
  description: string;
  progress: number;
}

export interface ITodosState {
  todos: ITodo[];
  todo: ITodo;
}
