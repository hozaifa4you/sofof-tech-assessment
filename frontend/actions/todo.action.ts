"use server";
import { fetchWithAuth } from "@/lib/authFetch";
import { formatErrors } from "@/schemas";
import { createTodoSchema } from "@/schemas/todo.schema";
import "server-only";

export const createTodo = async (
   _initialState: unknown,
   formData: FormData,
) => {
   const data = {
      title: formData.get("title"),
      date: formData.get("date"),
      description: formData.get("description"),
      priority: formData.get("priority"),
      image: formData.get("image"),
      status: formData.get("status"),
   };

   const {
      success,
      data: parsedData,
      error,
   } = await createTodoSchema.safeParseAsync(data);

   if (!success) {
      data.image = null;

      return {
         success: false,
         state: data,
         errors: formatErrors(error),
      };
   }

   const response = await fetchWithAuth("/api/v1/todos", {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: formData,
   });

   if (!response.ok) {
      const err = await response.json();
      console.log(err);

      return {
         success: false,
         state: data,
         message: err.message || "Something went wrong",
      };
   }

   console.log(parsedData);
};
