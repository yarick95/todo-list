'use client';
import { ITodo } from '@/types/todos.types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/store';
import { getTodo } from '@/redux/todosSlice';

const TodoCard = ({ todo }: { todo: ITodo }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleSubmit = () => {
    dispatch(getTodo(todo._id!));
    router.push(`/${_id}`);
  };

  const { name, description, progress, _id } = todo;
  return (
    <Card className="flex w-full flex-col gap-5 p-3">
      <div className="flex gap-3">
        <CardTitle className="... w-full truncate">{name}</CardTitle>
        <CardDescription className="... w-full truncate">
          {description}
        </CardDescription>
      </div>
      <div className="flex items-center gap-5">
        <p className="text-md">Progress</p>
        <Progress value={progress / 5} className="w-full" />
      </div>
      <Button variant="outline" onClick={handleSubmit} className="w-full">
        View Details
      </Button>
    </Card>
  );
};

export default TodoCard;
