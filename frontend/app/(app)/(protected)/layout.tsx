import type { PropsWithChildren } from "react";
import { Sidebar } from "@/components/app/sidebar";

const TodosLayout = ({ children }: PropsWithChildren) => {
   return (
      <main className="min-h-screen w-full">
         <div className="flex h-full">
            <Sidebar />
            <div className="min-h-full flex-1 p-5">{children}</div>
         </div>
      </main>
   );
};

export default TodosLayout;
