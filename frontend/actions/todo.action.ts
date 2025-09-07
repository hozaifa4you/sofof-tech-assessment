"use server";
import "server-only";
import { env } from "@/config/env";
import { fetchWithAuth } from "@/lib/authFetch";
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

export const updateTodo = async (
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

   const id = formData.get("id");

   const {
      success,
      data: parsedData,
      error,
   } = await createTodoSchema.safeParseAsync(data);

   if (!success) {
      data.image = null;

      return {
         success: false,
         errors: formatErrors(error),
      };
   }

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

   const response = await fetch(`${env.apiUrl}/api/v1/todos/${id}`, {
      method: "PUT",
      headers: {
         Authorization: `Bearer ${sessionData?.access_token}`,
      },
      body: formDataToSend,
   });

   if (!response.ok) {
      const err = await response.json();

      return {
         success: false,
         message: err.message || "Something went wrong",
      };
   }

   return { success: true };
};

export const deleteTodo = async (
   _initialState: unknown,
   formData: FormData,
) => {
   const id = formData.get("id");

   const response = await fetchWithAuth(`/api/v1/todos/${id}`, {
      method: "DELETE",
   });
   if (!response.ok) {
      const result = await response.json();
      return {
         success: false,
         message: result.message ?? "Something went wrong",
      };
   }

   return { success: true };
};
