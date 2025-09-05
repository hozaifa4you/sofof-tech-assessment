import { env } from "@/config/env";
import { getSession } from "./sessions";

export interface FetchOptions extends RequestInit {
   headers?: Record<string, string>;
}

const fetchWithoutAuth = async (url: string, options: FetchOptions = {}) => {
   options.headers = {
      "Content-Type": "application/json",
      ...options.headers,
   };

   const response = await fetch(`${env.apiUrl}${url}`, options);
   return response;
};

const fetchWithAuth = async (url: string, options: FetchOptions = {}) => {
   const session = await getSession();
   options.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access_token}`,
      ...options.headers,
   };

   const response = await fetch(`${env.apiUrl}${url}`, options);

   return response;
};

export { fetchWithoutAuth, fetchWithAuth };
