"use client";
import { ArrowRightIcon, LoaderCircleIcon, SearchIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { useSession } from "@/hooks/use-session";
import { useSearchStore } from "@/stores/search-store";

export function SearchTodos() {
   const id = useId();
   const [searchInput, setInputValue] = useState("");
   const session = useSession();
   const router = useRouter();
   const pathname = usePathname();
   const { isLoading, debouncedSearchTodos, clearResults, clearError } =
      useSearchStore();

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;
      setInputValue(newQuery);

      if (!newQuery.trim()) {
         clearResults();
         clearError();
         return;
      }

      debouncedSearchTodos(newQuery, session.access_token);
   };

   return (
      <div className="*:not-first:mt-2">
         <div className="relative">
            <Input
               id={id}
               className="peer ps-9 pe-9"
               placeholder="Search..."
               type="search"
               value={searchInput}
               onChange={handleInputChange}
               onClick={() => {
                  if (pathname !== "/search") {
                     router.push("/search");
                  }
               }}
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
               {isLoading ? (
                  <LoaderCircleIcon
                     className="animate-spin"
                     size={16}
                     aria-label="Loading..."
                  />
               ) : (
                  <SearchIcon size={16} aria-hidden="true" />
               )}
            </div>
            <button
               className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
               aria-label="Press to speak"
               type="submit"
            >
               <ArrowRightIcon size={16} aria-hidden="true" />
            </button>
         </div>
      </div>
   );
}
