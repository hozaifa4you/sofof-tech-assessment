import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { TodoHeader } from "@/components/app/todos/header";
import { ThisWeekTodos } from "@/components/app/todos/this-week-todos";
import { TodayTodos } from "@/components/app/todos/today-todos";
import { TomorrowTodos } from "@/components/app/todos/tomorrow-todos";
import { buttonVariants } from "@/components/ui/button";

const TodosPage = () => {
   return (
      <div className="h-full rounded-xl border p-4">
         <TodoHeader
            title="Upcoming"
            count={20}
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
            <div className="col-span-1 md:col-span-2">
               <TodayTodos />
            </div>
            <div>
               <TomorrowTodos />
            </div>
            <div>
               <ThisWeekTodos />
            </div>
         </div>
      </div>
   );
};

export default TodosPage;
