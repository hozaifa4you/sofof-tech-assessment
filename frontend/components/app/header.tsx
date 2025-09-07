import type { ReactNode } from "react";
import { ResponsiveSidebar } from "./todos/responsive-sidebar";

interface TodoHeaderProps {
   title: string;
   count?: number;
   button?: ReactNode;
}

const TodoHeader = ({ title, count, button }: TodoHeaderProps) => {
   return (
      <header className="mb-8 flex items-center justify-between gap-4">
         <div className="flex gap-2.5">
            <ResponsiveSidebar />
            <h1 className="font-secondary font-semibold text-black/70 text-xl sm:text-2xl lg:text-[28px]">
               {title}
               {count && (
                  <span className="color-text ml-3 rounded-l-full rounded-tr-full border px-2.5 py-1 text-sm">
                     {count}
                  </span>
               )}
            </h1>
         </div>

         {button && button}
      </header>
   );
};

export { TodoHeader };
