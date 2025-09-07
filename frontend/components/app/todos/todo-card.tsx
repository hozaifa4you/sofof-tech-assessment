import {
   BadgeCheckIcon,
   CheckCircleIcon,
   CircleXIcon,
   ClockIcon,
   EllipsisVerticalIcon,
   HourglassIcon,
   LoaderIcon,
   SquarePenIcon,
} from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { TodoType } from "@/types/todo";
import { DeleteTodo, DeleteTodoModal } from "./delete-todo";
import { UpdateTodoStatus } from "./update-todo-status";

const TodoCard = ({ ...todo }: TodoType) => {
   const dateFromNow = moment(todo.date).fromNow();

   return (
      <>
         <div className="flex w-full gap-2 overflow-hidden rounded-lg border p-4 transition-all duration-200 ease-in-out hover:border-primary/50">
            <div className="flex flex-col items-center gap-2">
               <button type="button" className="size-fit">
                  <CheckCircleIcon
                     className={cn("size-4", {
                        "text-emerald-500": todo.status === "done",
                        "text-primary": todo.status === "canceled",
                        "text-yellow-500": todo.status === "pending",
                        "text-indigo-500": todo.status === "in_progress",
                     })}
                  />
               </button>
               <div className="size-fit">
                  <Badge
                     variant="secondary"
                     className="flex flex-col px-0.5 py-2"
                  >
                     <ClockIcon />
                     <span
                        className="flex flex-col gap-0"
                        style={{
                           writingMode: "vertical-rl",
                           textOrientation: "mixed",
                        }}
                     >
                        {dateFromNow}
                     </span>
                  </Badge>
               </div>
            </div>

            <div className="flex-1 pl-2">
               <div>
                  <h3
                     className={cn(
                        "-mt-1 line-clamp-2 font-secondary font-semibold text-base text-black/70 leading-normal tracking-normal",
                        {
                           "line-through": todo.status === "done",
                        },
                     )}
                  >
                     {todo.title}
                  </h3>
               </div>
               <div className="mt-2 flex items-center gap-1">
                  <p className="line-clamp-3 font-primary text-black/50 text-sm">
                     {todo.description}
                  </p>
                  {todo.image && (
                     <Image
                        src={todo.image}
                        alt={todo.title}
                        width={70}
                        height={70}
                        className="ml-auto h-16 w-16 rounded-lg object-cover object-center"
                     />
                  )}
               </div>

               <div className="mt-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                     <Badge
                        className={cn("bg-primary/80 capitalize", {
                           "bg-indigo-400": todo.priority === "medium",
                           "bg-amber-400": todo.priority === "low",
                        })}
                        variant="default"
                     >
                        {todo.priority}
                     </Badge>
                     <Badge variant="outline" className="capitalize">
                        {todo.status === "done" ? (
                           <BadgeCheckIcon className="text-emerald-500" />
                        ) : todo.status === "canceled" ? (
                           <CircleXIcon className="text-primary" />
                        ) : todo.status === "pending" ? (
                           <HourglassIcon className="text-yellow-500" />
                        ) : (
                           <LoaderIcon className="text-indigo-500" />
                        )}{" "}
                        {todo.status.split("_").join(" ")}
                     </Badge>
                  </div>
                  <div>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Button size="sm" variant="ghost">
                              <EllipsisVerticalIcon className="text-black/60" />
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="start">
                           <DropdownMenuItem asChild>
                              <Link href={`/todos/${todo.id}/edit`}>
                                 <SquarePenIcon /> Edit
                              </Link>
                           </DropdownMenuItem>
                           <UpdateTodoStatus
                              status={todo.status}
                              todoId={todo.id}
                           />
                           <DropdownMenuSeparator />
                           <DeleteTodo />
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </div>
               </div>
            </div>
         </div>
         <DeleteTodoModal todoId={todo.id} />
      </>
   );
};

export { TodoCard };
