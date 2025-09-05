import {
   CheckCircleIcon,
   CircleCheckBigIcon,
   EllipsisVerticalIcon,
   SquarePenIcon,
   Trash2Icon,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TodoCard = () => {
   return (
      <div className="flex w-full gap-2 rounded-lg border p-4 transition-all duration-200 ease-in-out hover:border-primary/50">
         <div>
            <button type="button">
               <CheckCircleIcon className="size-4" />
            </button>
         </div>

         <div className="flex-1">
            <div>
               <h3 className="-mt-1 line-clamp-2 font-secondary font-semibold text-base text-black/70 leading-normal tracking-normal">
                  Todo Header
               </h3>
            </div>
            <div className="mt-2 flex items-center gap-1">
               <p className="line-clamp-3 font-primary text-black/50 text-sm">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Nostrum, placeat.
               </p>
               <Image
                  src="https://images.unsplash.com/photo-1635079959001-69736953f90f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Todo Image"
                  width={70}
                  height={70}
                  className="ml-auto h-16 w-16 rounded-lg object-cover object-center"
               />
            </div>

            <div className="mt-3 flex items-center justify-between gap-2">
               <div className="flex items-center gap-2">
                  <Badge>High</Badge>
                  <Badge variant="outline">Pending</Badge>
               </div>
               <div>
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost">
                           <EllipsisVerticalIcon className="text-black/60" />
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuItem>
                           <SquarePenIcon /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                           <CircleCheckBigIcon /> Mark as Done
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                           <Trash2Icon /> Delete
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>
            </div>
         </div>
      </div>
   );
};

export { TodoCard };
