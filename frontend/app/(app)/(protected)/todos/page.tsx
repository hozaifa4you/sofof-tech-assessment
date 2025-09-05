import { TodoHeader } from "@/components/app/todos/header";
import { TodoCard } from "@/components/app/todos/todo-card";

const TodoListPage = () => {
   return (
      <div className="h-full rounded-xl border p-4">
         <TodoHeader title="Todo List" count={20} />

         <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <TodoCard />
         </div>
      </div>
   );
};

export default TodoListPage;
