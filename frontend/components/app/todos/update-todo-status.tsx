"use client";
import {
   CircleCheckBigIcon,
   CircleXIcon,
   HourglassIcon,
   LoaderIcon,
} from "lucide-react";
import { toast } from "sonner";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { env } from "@/config/env";
import { useSession } from "@/hooks/use-session";

type UpdateTodoStatusProps = {
   todoId: number;
   status: "pending" | "in_progress" | "done" | "canceled";
};

const UpdateTodoStatus = ({ status, todoId }: UpdateTodoStatusProps) => {
   const session = useSession();

   const handleTodoStatusUpdate = async (
      newStatus: "pending" | "in_progress" | "done" | "canceled",
   ) => {
      const res = await fetch(
         `${env.nextPublicApiUrl}/api/v1/todos/${todoId}/status?status=${newStatus}`,
         {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${session.access_token}`,
            },
         },
      );

      if (!res.ok) {
         const error = await res.json();

         return toast.error("Todo Update", { description: error.message });
      }

      toast.success("Todo Update", { description: "Status updated" });
   };

   return (
      <>
         {status !== "done" && (
            <DropdownMenuItem onClick={() => handleTodoStatusUpdate("done")}>
               <CircleCheckBigIcon className="text-emerald-500" /> Mark as Done
            </DropdownMenuItem>
         )}
         {status === "done" && (
            <DropdownMenuItem
               onClick={() => handleTodoStatusUpdate("in_progress")}
            >
               <LoaderIcon className="text-indigo-500" /> Mark as In Progress
            </DropdownMenuItem>
         )}
         {status !== "pending" && status !== "done" && (
            <DropdownMenuItem onClick={() => handleTodoStatusUpdate("pending")}>
               <HourglassIcon className="text-yellow-500" /> Mark as Pending
            </DropdownMenuItem>
         )}
         {status !== "canceled" && (
            <DropdownMenuItem
               onClick={() => handleTodoStatusUpdate("canceled")}
            >
               <CircleXIcon className="text-red-500" /> Mark as Canceled
            </DropdownMenuItem>
         )}
      </>
   );
};

export { UpdateTodoStatus };
