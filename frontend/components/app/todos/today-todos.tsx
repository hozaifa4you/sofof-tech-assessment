import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import type { TodoType } from "@/types/todo";
import { TodoCard } from "./todo-card";

interface TodayTodosProps {
   todos: TodoType[];
}

const TodayTodos = ({ todos }: TodayTodosProps) => {
   return (
      <div className="w-full rounded-xl border p-5">
         <div className="flex flex-wrap items-center gap-2 sm:justify-between">
            <h2 className="header font-primary">
               Today's Todos
               <span className="color-text ml-3 rounded-l-full rounded-br-full border px-2.5 py-1 text-sm">
                  {todos.length}
               </span>
            </h2>

            <Link href="/todos" className={buttonVariants({ variant: "link" })}>
               Show more <ArrowRightIcon />
            </Link>
         </div>

         <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {todos.length > 0 ? (
               todos.map((todo) => <TodoCard key={todo.id} {...todo} />)
            ) : (
               <div>
                  <p className="text-muted-foreground">No todos for today</p>
               </div>
            )}
         </div>
      </div>
   );
};

export { TodayTodos };
