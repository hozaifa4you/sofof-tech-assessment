import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { TodoHeader } from "@/components/app/todos/header";
import { ThisWeekTodos } from "@/components/app/todos/this-week-todos";
import { TodayTodos } from "@/components/app/todos/today-todos";
import { TomorrowTodos } from "@/components/app/todos/tomorrow-todos";
import { buttonVariants } from "@/components/ui/button";
import { fetchWithAuth } from "@/lib/authFetch";
import type { TodoType } from "@/types/todo";

const TodosPage = async () => {
   const res = await fetchWithAuth(`/api/v1/todos/todays`);
   if (!res.ok) {
      throw new Error("Failed to fetch data");
   }
   const todaysTodos: TodoType[] = await res.json();

   return (
      <div className="h-full rounded-xl border p-4">
         <TodoHeader
            title="Analytics"
            button={
               <Link
                  href="/todos/new"
                  className={buttonVariants({
                     size: "sm",
                  })}
               >
                  <PlusIcon /> Create
               </Link>
            }
         />
         <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
               <TomorrowTodos />
            </div>
            <div>
               <ThisWeekTodos />
            </div>
            <div className="col-span-1 md:col-span-2">
               <TodayTodos todos={todaysTodos} />
            </div>
         </div>
      </div>
   );
};

export default TodosPage;
