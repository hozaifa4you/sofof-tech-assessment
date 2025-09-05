import { TodoHeader } from "@/components/app/todos/header";
import { SelectDate } from "@/components/app/todos/select-date";
import { TodoCard } from "@/components/app/todos/todo-card";
import { fetchWithAuth } from "@/lib/authFetch";
import type { TodoType } from "@/types/todo";

const TodoListPage = async () => {
   const res = await fetchWithAuth("/api/v1/todos");
   if (!res.ok) {
      throw new Error("Failed to fetch todos");
   }

   const data: TodoType[] = await res.json();

   return (
      <div className="h-full rounded-xl border p-4">
         <div className="flex items-center justify-between gap-4">
            <TodoHeader title="Todo List" count={data.length} />
            <SelectDate />
         </div>

         <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {data.map((todo) => (
               <TodoCard key={todo.id} {...todo} />
            ))}
         </div>
      </div>
   );
};

export default TodoListPage;
