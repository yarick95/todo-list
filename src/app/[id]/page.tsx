'use client';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { deleteTodo, fetchTodos, updateTodo } from '@/redux/thunks';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { getTodo, putTodo } from '@/redux/todosSlice';

const FormEditTodoSchema = z.object({
  name: z.string().min(1, 'Title is required').max(100),
  description: z.string().min(1, 'Description is required').max(250),
  progress: z.string(),
});

const TodoDetailsPage = () => {
  const pathname = usePathname();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const todo = useAppSelector((state) => state.todos.todo);
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const handleDelete = () => {
    dispatch(deleteTodo(pathname.substring(1)));
    router.push('/');
  };

  const form = useForm<z.infer<typeof FormEditTodoSchema>>({
    resolver: zodResolver(FormEditTodoSchema),
    defaultValues: {
      name: todo?.name,
      description: todo?.description,
      progress: `${todo?.progress}`,
    },
  });

  const onSubmit = async (values: z.infer<typeof FormEditTodoSchema>) => {
    const updatedTodo = {
      _id: pathname.substring(1) || todo?._id,
      name: values.name,
      description: values.description,
      progress: +values.progress,
    };
    dispatch(putTodo(updatedTodo));
    dispatch(updateTodo(updatedTodo));
  };

  return (
    <div className="mx-5 my-20 flex flex-col gap-10 sm:mx-10">
      <Button className="w-[50px]" onClick={() => router.back()}>
        Back
      </Button>
      <Card className="flex w-full flex-col gap-5 p-3">
        <CardTitle className="... w-full truncate">{todo?.name}</CardTitle>
        <CardDescription className="... w-full truncate">
          {todo?.description}
        </CardDescription>
        <Progress value={todo?.progress / 5} className="w-full" />
      </Card>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col items-center"
        >
          {isEdit && (
            <div className="flex w-full flex-col gap-[5px] p-3 sm:w-[450px]">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} className="w-full" />
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
              <FormField
                control={form.control}
                name="progress"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormLabel className="mt-2">Progress</FormLabel>
                    <FormControl>
                      <input
                        type="range"
                        min={1}
                        max={500}
                        className="m-0 p-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <div
            className={
              isEdit ? 'flex w-full gap-10 sm:w-[450px]' : 'flex w-full gap-10'
            }
          >
            <Button
              type={!isEdit ? 'submit' : 'button'}
              className="w-1/2"
              onClick={() => {
                setEdit((prevState) => !prevState);
              }}
            >
              {isEdit ? 'Save' : 'Edit'}
            </Button>
            <Button
              className="w-1/2"
              type="button"
              variant="destructive"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TodoDetailsPage;
