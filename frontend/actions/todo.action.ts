"use server";
import "server-only";
import { env } from "@/config/env";
import { getSession } from "@/lib/sessions";
import { formatErrors } from "@/schemas";
import { createTodoSchema } from "@/schemas/todo.schema";

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

   console.log(parsedData);

   const formDataToSend = new FormData();
   formDataToSend.append("title", parsedData.title);
   formDataToSend.append("date", parsedData.date.toISOString());
   formDataToSend.append("description", parsedData.description);
   formDataToSend.append("priority", parsedData.priority);
   formDataToSend.append("status", parsedData.status);
   if (parsedData.image) {
      formDataToSend.append("image", parsedData.image);
   }

   const sessionData = await getSession();

   const response = await fetch(`${env.apiUrl}/api/v1/todos`, {
      method: "POST",
      headers: {
         Authorization: `Bearer ${sessionData?.access_token}`,
      },
      body: formDataToSend,
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

   return { success: true };
};
