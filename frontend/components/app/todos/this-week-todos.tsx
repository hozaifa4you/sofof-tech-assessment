import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TodoCard } from "./todo-card";

const ThisWeekTodos = () => {
   return (
      <div className="w-full rounded-xl border p-5">
         <div className="flex flex-wrap items-center gap-2 sm:justify-between">
            <h2 className="header font-primary">
               This week
               <span className="color-text ml-3 rounded-l-full rounded-br-full border px-2.5 py-1 text-sm">
                  {10}
               </span>
            </h2>

            <Button variant="link">
               Show more <ArrowRightIcon />
            </Button>
         </div>

         <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
            <TodoCard />
            <TodoCard />
            <TodoCard />
            <TodoCard />
         </div>
      </div>
   );
};

export { ThisWeekTodos };
