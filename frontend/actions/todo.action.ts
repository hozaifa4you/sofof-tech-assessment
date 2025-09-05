"use server";
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

   console.log(data);
};
