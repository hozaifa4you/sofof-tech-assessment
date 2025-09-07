"use client";
import { CircleAlertIcon } from "lucide-react";
import { TodoHeader } from "@/components/app/header";
import { TodoCard } from "@/components/app/todos/todo-card";
import { useSearchStore } from "@/stores/search-store";

const SearchPage = () => {
   const { searchResults, error } = useSearchStore();

   return (
      <div className="h-full rounded-xl border p-4">
         <TodoHeader title="Search Todos" />
         <hr />

         {error && (
            <div className="rounded-md border border-red-500/50 px-4 py-3 text-red-600">
               <p className="text-sm">
                  <CircleAlertIcon
                     className="-mt-0.5 me-3 inline-flex opacity-60"
                     size={16}
                     aria-hidden="true"
                  />
                  {error}
               </p>
            </div>
         )}

         <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            {searchResults.length > 0 ? (
               searchResults.map((todo) => <TodoCard key={todo.id} {...todo} />)
            ) : (
               <p className="col-span-1 text-center text-slate-600 lg:col-end-3">
                  No search result found
               </p>
            )}
         </div>
      </div>
   );
};

export default SearchPage;
