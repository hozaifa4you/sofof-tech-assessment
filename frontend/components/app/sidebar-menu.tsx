"use client";
import {
   BotMessageSquareIcon,
   CalendarSyncIcon,
   GaugeIcon,
   ListTodo,
   PlusIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import { SearchTodos } from "@/components/app/todos/search-todos";
import { Logo } from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type Todo = {
   id: number;
   title: string;
   url: string;
   Icon: ComponentType<{ className?: string }>;
};

const todos: Todo[] = [
   {
      id: 1,
      title: "Analytics",
      url: "/analytics",
      Icon: GaugeIcon,
   },
   { id: 2, title: "Todo List", url: "/todos", Icon: ListTodo },
   { id: 3, title: "Calendar", url: "/calendar", Icon: CalendarSyncIcon },
   { id: 4, title: "Assistant", url: "/assistant", Icon: BotMessageSquareIcon },
];

const SidebarMenu = () => {
   const pathname = usePathname();

   return (
      <div className="h-full w-full rounded-xl bg-accent p-4">
         <div className="flex items-center justify-between gap-4">
            <Logo />

            <div>
               <Link
                  href="/todos/new"
                  className={buttonVariants({
                     size: "sm",
                     variant: "outline",
                     className:
                        "border-primary text-primary hover:bg-primary/5 hover:text-primary",
                  })}
               >
                  <PlusIcon className="size-5" />
               </Link>
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
                     className={cn(
                        "rounded-md font-medium text-black/70 transition-colors duration-200 ease-in-out hover:bg-primary/10 hover:text-primary",
                        {
                           active: pathname.startsWith(todo.url),
                        },
                     )}
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
   );
};

export { SidebarMenu };
