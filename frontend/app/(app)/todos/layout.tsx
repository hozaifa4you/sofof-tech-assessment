import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Sidebar } from "@/components/app/todos/sidebar";

export const metadata: Metadata = {
   title: "Todos - Todo Miner",
   description: "Manage your tasks efficiently with Todo Miner.",
};

const TodosLayout = ({ children }: PropsWithChildren) => {
   return (
      <main className="w-full min-h-screen">
         <div className="flex h-full gap-5">
            <Sidebar />
            <div className="flex-1 p-5">{children}</div>
         </div>
      </main>
   );
};

export default TodosLayout;
