"use client";
import { LoaderCircleIcon } from "lucide-react";
import Form from "next/form";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { updateTodo } from "@/actions/todo.action";
import { ImageUploader } from "@/components/app/todos/image-uploader";
import { Button } from "@/components/ui/button";
import InputWithClear from "@/components/ui/input-with-clear";
import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { FileWithPreview } from "@/hooks/use-file-upload";
import { formatDateForInput } from "@/lib/utils";
import type { TodoType } from "@/types/todo";

interface EditTodoFormProps {
   todo: TodoType;
}

const EditTodoForm = ({ todo }: EditTodoFormProps) => {
   const [state, action, pending] = useActionState(updateTodo, null);
   const imageInputRef = useRef<HTMLInputElement>(null);
   const formRef = useRef<HTMLFormElement>(null);

   const [title, setTitle] = useState(todo.title);
   const [date, setdate] = useState(formatDateForInput(todo.date));

   const handleImageAdd = (files: FileWithPreview[]) => {
      if (files.length > 0 && imageInputRef.current) {
         const fileList = files.map((file) => file.file);

         const dataTransfer = new DataTransfer();
         fileList.forEach((file) => {
            dataTransfer.items.add(file as unknown as File);
         });
         imageInputRef.current.files = dataTransfer.files;
      }
   };

   useEffect(() => {
      if (state?.success) {
         formRef.current?.reset();
         setTitle("");
         setdate("");
         toast.success("Todo", { description: "Todo updated successfully" });
      }

      if (!state?.success && state?.message) {
         toast.error("Todo", { description: state?.message });
      }
   }, [state]);

   return (
      <Form action={action} ref={formRef}>
         <div className="grid gap-4 md:grid-cols-2">
            <div>
               <InputWithClear
                  name="title"
                  placeholder="e.g. Buy groceries"
                  type="text"
                  defaultValue={todo.title}
                  label={
                     <>
                        Todo Title<span className="text-primary">*</span>
                     </>
                  }
                  value={title}
                  onChange={setTitle}
               />
               {state?.errors?.title && (
                  <p
                     className="mt-2 text-destructive text-xs"
                     role="alert"
                     aria-live="polite"
                  >
                     {state.errors.title}
                  </p>
               )}
            </div>

            <div>
               <InputWithClear
                  name="date"
                  placeholder="e.g. 2023-01-01"
                  type="datetime-local"
                  defaultValue={formatDateForInput(todo.date)}
                  label={
                     <>
                        Starting Date
                        <span className="text-primary">*</span>
                     </>
                  }
                  value={date}
                  onChange={setdate}
               />
               {state?.errors?.date && (
                  <p
                     className="mt-2 text-destructive text-xs"
                     role="alert"
                     aria-live="polite"
                  >
                     {state.errors.date}
                  </p>
               )}
            </div>

            <div className="md:col-span-2">
               <div className="*:not-first:mt-2">
                  <Label htmlFor="description">
                     Description<span className="text-primary">*</span>
                  </Label>
                  <Textarea
                     id="description"
                     placeholder="Write a description for your todo..."
                     name="description"
                     defaultValue={todo.description}
                  />
                  {state?.errors?.description && (
                     <p
                        className="mt-2 text-destructive text-xs"
                        role="alert"
                        aria-live="polite"
                     >
                        {state.errors.description}
                     </p>
                  )}
               </div>
            </div>

            <div>
               <Label htmlFor="priority" className="mb-2">
                  Priority<span className="text-primary">*</span>
               </Label>
               <Select name="priority" defaultValue={todo.priority}>
                  <SelectTrigger className="w-full">
                     <SelectValue placeholder="Select a Priority" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="low">Low</SelectItem>
                     <SelectItem value="medium">Medium</SelectItem>
                     <SelectItem value="high">High</SelectItem>
                  </SelectContent>
               </Select>

               {state?.errors?.priority && (
                  <p
                     className="mt-2 text-destructive text-xs"
                     role="alert"
                     aria-live="polite"
                  >
                     {state.errors.priority}
                  </p>
               )}
            </div>

            <div>
               <Label htmlFor="status" className="mb-2">
                  Status
                  <span className="text-black/70">(Default: Pending)</span>
               </Label>
               <Select name="status" defaultValue={todo.status}>
                  <SelectTrigger className="w-full">
                     <SelectValue placeholder="Select a Status" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="pending">Pending</SelectItem>
                     <SelectItem value="in_progress">In Progress</SelectItem>
                     <SelectItem value="done">Done</SelectItem>
                     <SelectItem value="canceled">Canceled</SelectItem>
                  </SelectContent>
               </Select>

               {state?.errors?.status && (
                  <p
                     className="mt-2 text-destructive text-xs"
                     role="alert"
                     aria-live="polite"
                  >
                     {state.errors.status}
                  </p>
               )}
            </div>

            <div className="md:col-span-2">
               <Label htmlFor="thumbnail" className="mb-2">
                  Thumbnail
                  <span className="text-black/40">(Optional)</span>
               </Label>
               <ImageUploader
                  handleImageAdd={handleImageAdd}
                  onRemoveFile={imageInputRef}
               />
               <input
                  type="file"
                  id="thumbnail-input"
                  className="sr-only"
                  ref={imageInputRef}
                  name="image"
               />

               {state?.errors?.image && (
                  <p
                     className="mt-2 text-destructive text-xs"
                     role="alert"
                     aria-live="polite"
                  >
                     {state.errors.image}
                  </p>
               )}
            </div>

            <div className="flex justify-between md:col-span-2">
               <Button type="button" size="lg" variant="outline">
                  Cancel
               </Button>
               <Button type="submit" size="lg">
                  {pending && (
                     <LoaderCircleIcon
                        className="-ms-1 animate-spin"
                        size={16}
                        aria-hidden="true"
                     />
                  )}{" "}
                  Update
               </Button>
            </div>
         </div>
      </Form>
   );
};

export { EditTodoForm };
