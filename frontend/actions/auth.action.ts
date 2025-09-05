"use server";
import "server-only";
import { fetchWithoutAuth } from "@/lib/authFetch";
import { createSession } from "@/lib/sessions";
import { formatErrors } from "@/schemas";
import { signinSchema, signupSchema } from "@/schemas/auth.schema";
import { redirect } from "next/navigation";

export async function signup(_initialState: unknown, formData: FormData) {
   const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
   };

   const {
      success,
      data: parsedData,
      error,
   } = await signupSchema.safeParseAsync(data);

   if (!success) {
      return {
         success: false,
         state: data,
         errors: formatErrors<typeof data>(error),
      };
   }

   const response = await fetchWithoutAuth("/v1/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(parsedData),
   });

   if (!response.ok) {
      const result = await response.json();

      return {
         success: false,
         state: data,
         message: result.message,
      };
   }

   return { success: true, message: "Signup successful!" };
}

export async function signin(_initialState: unknown, formData: FormData) {
   const data = {
      email: formData.get("email"),
      password: formData.get("password"),
   };

   const {
      success,
      data: parsedData,
      error,
   } = await signinSchema.safeParseAsync(data);

   if (!success) {
      return {
         success: false,
         state: data,
         errors: formatErrors<typeof data>(error),
      };
   }

   const response = await fetchWithoutAuth("/v1/api/auth/signin", {
      method: "POST",
      body: JSON.stringify(parsedData),
   });

   const result = await response.json();
   if (!response.ok) {
      return {
         success: false,
         state: data,
         message: result.message,
      };
   }

   await createSession({
      access_token: result.access_token,
      user: result.user,
   });

   return redirect("/dashboard");
}