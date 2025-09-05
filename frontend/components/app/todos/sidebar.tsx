import { MenuIcon } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { SearchTodos } from "./search-todos";

const Sidebar = () => {
   return (
      <aside className="max-w-[340px] w-full p-5 max-h-screen h-full">
         <div className="w-full h-full bg-accent p-4 rounded-xl ">
            <div className="flex items-center justify-between gap-4">
               <Logo />

               <div>
                  <Button size="icon" variant="link">
                     <MenuIcon className="size-5" />
                  </Button>
               </div>
            </div>

            <div className="w-full mt-4">
               <SearchTodos />
            </div>
         </div>
      </aside>
   );
};

export { Sidebar };
