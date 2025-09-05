import {
   CalendarSyncIcon,
   ChevronsRightIcon,
   ListTodo,
   MenuIcon,
} from "lucide-react";
import Link from "next/link";
import type { ComponentType } from "react";
import { SearchTodos } from "@/components/app/todos/search-todos";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export type Todo = {
   id: number;
   title: string;
   url: string;
   Icon: ComponentType<{ className?: string }>;
};

const todos: Todo[] = [
   {
      id: 1,
      title: "Upcoming",
      url: "/upcoming",
      Icon: ChevronsRightIcon,
   },
   { id: 2, title: "Todo List", url: "/todos", Icon: ListTodo },
   { id: 3, title: "Calendar", url: "/calendar", Icon: CalendarSyncIcon },
];

const Sidebar = () => {
   return (
      <aside className="h-screen w-full max-w-[340px] p-5">
         <div className="h-full w-full rounded-xl bg-accent p-4">
            <div className="flex items-center justify-between gap-4">
               <Logo />

               <div>
                  <Button size="icon" variant="link">
                     <MenuIcon className="size-5" />
                  </Button>
               </div>
            </div>

            <div className="mt-4 w-full">
               <SearchTodos />
            </div>

            <div className="mt-4 h-full">
               <h4 className="font-secondary font-semibold text-lg">Menu</h4>
               <ul className="space-y-1">
                  {todos.map((todo) => (
                     <li
                        key={todo.id}
                        className="rounded-md font-medium text-black/70 transition-colors duration-200 ease-in-out hover:bg-primary/10 hover:text-primary"
                     >
                        <Link
                           href={todo.url}
                           className="flex items-center gap-2 px-3 py-2"
                        >
                           <todo.Icon className="size-5" />{" "}
                           <span className="">{todo.title}</span>
                        </Link>
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </aside>
   );
};

export { Sidebar };
