import type { ReactNode } from "react";

interface TodoHeaderProps {
   title: string;
   count?: number;
   button?: ReactNode;
}

const TodoHeader = ({ title, count, button }: TodoHeaderProps) => {
   return (
      <header className="mb-8 flex items-center justify-between gap-4">
         <h1 className="font-secondary font-semibold text-[28px] text-black/70">
            {title}
            {count && (
               <span className="color-text ml-3 rounded-l-full rounded-tr-full border px-2.5 py-1 text-sm">
                  {count}
               </span>
            )}
         </h1>

         {button && button}
      </header>
   );
};

export { TodoHeader };
