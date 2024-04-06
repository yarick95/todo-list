'use client';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from './ui/input';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { addTodo } from '@/redux/todosSlice';
import { fetchTodos, postTodo } from '@/redux/thunks';
import TodoCard from './TodoCard';
import { v4 as uuidv4 } from 'uuid';

const FormTodoSchema = z.object({
  name: z.string().min(1, 'Title is required').max(100),
  description: z.string().min(1, 'Description is required').max(250),
  progress: z.number(),
});

const CreateTodo = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const [isLoading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormTodoSchema>>({
    resolver: zodResolver(FormTodoSchema),
    defaultValues: {
      name: '',
      description: '',
      progress: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof FormTodoSchema>) => {
    const id = uuidv4();
    setLoading(true);
    dispatch(addTodo({ ...values, _id: id }));
    dispatch(postTodo({ ...values, _id: id }));
    setLoading(false);
    form.reset();
  };

  return (
    <>
      <div className="flex w-full flex-col flex-wrap items-center justify-center gap-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full justify-center px-10"
          >
            <div className="flex w-full flex-col gap-[5px] p-3 sm:w-[450px]">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                variant="outline"
                className="w-full rounded-none"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
        {todos
          ?.map((item) => (
            <div
              key={item._id}
              className="flex w-full flex-col gap-5 px-10 sm:w-[450px] sm:px-0"
            >
              <TodoCard todo={item} />
            </div>
          ))
          .reverse()}
      </div>
    </>
  );
};

export default CreateTodo;
