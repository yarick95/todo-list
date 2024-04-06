import CreateTodo from '@/components/CreateTodo';
import Websocket from '@/components/Websocket';

export default function Home() {
  return (
    <main className="flex flex-col pb-10 pt-20">
      <CreateTodo />
      <Websocket />
    </main>
  );
}
