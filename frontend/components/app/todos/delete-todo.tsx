"use client";
import { CircleAlertIcon, LoaderCircleIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";
import { deleteTodo } from "@/actions/todo.action";
import {
   AlertDialog,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useUtils } from "@/hooks/use-utils";

interface DeleteTodoModalProps {
   todoId: number;
}

export function DeleteTodoModal({ todoId }: DeleteTodoModalProps) {
   const { open, setOpen } = useUtils();
   const [state, action, pending] = useActionState(deleteTodo, null);
   const router = useRouter();

   const handleDelete = () => {
      const formData = new FormData();
      formData.append("id", todoId.toString());

      startTransition(() => {
         action(formData);
      });
   };

   useEffect(() => {
      if (state?.success) {
         toast.info("Todo Delete", {
            description: "Todo deleted successfully",
         });
         setOpen(false);
         router.refresh();
      }

      if (!state?.success && state?.message) {
         toast.error("Todo Delete", {
            description: state.message,
         });
      }
   }, [state, setOpen, router]);

   return (
      <AlertDialog open={open} onOpenChange={setOpen}>
         <AlertDialogContent>
            <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
               <div
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                  aria-hidden="true"
               >
                  <CircleAlertIcon className="opacity-80" size={16} />
               </div>
               <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                     Are you sure you want to delete the todo? All your data
                     will be removed.
                  </AlertDialogDescription>
               </AlertDialogHeader>
            </div>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <Button onClick={handleDelete}>
                  {pending && (
                     <LoaderCircleIcon
                        className="-ms-1 animate-spin"
                        size={16}
                        aria-hidden="true"
                     />
                  )}{" "}
                  Confirm
               </Button>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}

export const DeleteTodo = () => {
   const { openModal } = useUtils();

   const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      openModal();
   };

   return (
      <DropdownMenuItem variant="destructive" onClick={handleClick}>
         <Trash2Icon /> Delete
      </DropdownMenuItem>
   );
};
