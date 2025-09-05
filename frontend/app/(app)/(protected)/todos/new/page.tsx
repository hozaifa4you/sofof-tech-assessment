"use client";
import Form from "next/form";
import { useActionState, useRef } from "react";
import { createTodo } from "@/actions/todo.action";
import { TodoHeader } from "@/components/app/todos/header";
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

const NewTodoPage = () => {
   const [state, action, pending] = useActionState(createTodo, null);
   const imageInputRef = useRef<HTMLInputElement>(null);

   const handleImageAdd = (files: FileWithPreview[]) => {
      if (files.length > 0 && imageInputRef.current) {
         const fileList = files.map((file) => file.file);

         console.log(fileList);

         imageInputRef.current.files = fileList as unknown as FileList;
      }
   };

   return (
      <div className="h-full rounded-xl border p-4">
         <TodoHeader title="Create New Todo" />
         <div className="mx-auto max-w-3xl">
            <Form action={action}>
               <div className="grid gap-4 md:grid-cols-2">
                  <InputWithClear
                     name="title"
                     label={
                        <>
                           Todo Title<span className="text-primary">*</span>
                        </>
                     }
                     placeholder="e.g. Buy groceries"
                     type="text"
                  />

                  <InputWithClear
                     name="date"
                     label={
                        <>
                           Starting Date<span className="text-primary">*</span>
                        </>
                     }
                     placeholder="e.g. 2023-01-01"
                     type="datetime-local"
                  />

                  <div className="md:col-span-2">
                     <div className="*:not-first:mt-2">
                        <Label htmlFor="description">
                           Description<span className="text-primary">*</span>
                        </Label>
                        <Textarea
                           id="description"
                           placeholder="Write a description for your todo..."
                           name="description"
                        />
                        <p
                           className="mt-2 text-destructive text-xs"
                           role="alert"
                           aria-live="polite"
                        >
                           Message should be at least 10 characters
                        </p>
                     </div>
                  </div>

                  <div>
                     <Label htmlFor="status" className="mb-2">
                        Status<span className="text-primary">*</span>
                     </Label>
                     <Select name="status">
                        <SelectTrigger className="w-full">
                           <SelectValue placeholder="Select a Status" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="pending">Pending</SelectItem>
                           <SelectItem value="is_progress">
                              In Progress
                           </SelectItem>
                           <SelectItem value="done">Done</SelectItem>
                           <SelectItem value="canceled">Canceled</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>

                  <div>
                     <Label htmlFor="priority" className="mb-2">
                        Priority<span className="text-primary">*</span>
                     </Label>
                     <Select name="priority">
                        <SelectTrigger className="w-full">
                           <SelectValue placeholder="Select a Priority" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="low">Low</SelectItem>
                           <SelectItem value="medium">Medium</SelectItem>
                           <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>

                  <div className="md:col-span-2">
                     <Label htmlFor="thumbnail" className="mb-2">
                        Thumbnail
                        <span className="text-black/40">(Optional)</span>
                     </Label>
                     <ImageUploader handleImageAdd={handleImageAdd} />
                     <input
                        type="file"
                        id="thumbnail-input"
                        className="sr-only"
                        ref={imageInputRef}
                        name="image"
                     />
                  </div>

                  <div className="flex justify-between md:col-span-2">
                     <Button type="button" size="lg" variant="outline">
                        Cancel
                     </Button>
                     <Button type="submit" size="lg">
                        Create Now
                     </Button>
                  </div>
               </div>
            </Form>
         </div>
      </div>
   );
};

export default NewTodoPage;
