import { create } from "zustand";
import { env } from "@/config/env";
import type { TodoType } from "@/types/todo";

interface SearchStore {
   searchResults: TodoType[];
   isLoading: boolean;
   error: string | null;
   searchTodos: (query: string, token?: string) => Promise<void>;
   debouncedSearchTodos: (query: string, token?: string) => void;
   clearResults: () => void;
   clearError: () => void;
}

export const useSearchStore = create<SearchStore>((set, get) => {
   let searchTimeout: NodeJS.Timeout | null = null;

   return {
      searchResults: [],
      isLoading: false,
      error: null,

      searchTodos: async (query: string, token?: string) => {
         if (!query.trim()) {
            set({ searchResults: [], error: null });
            return;
         }

         set({ isLoading: true, error: null });

         try {
            const headers: HeadersInit = {
               "Content-Type": "application/json",
            };

            if (token) {
               headers.Authorization = `Bearer ${token}`;
            }

            const response = await fetch(
               `${env.nextPublicApiUrl}/api/v1/todos?search=${encodeURIComponent(query)}`,
               {
                  method: "GET",
                  headers,
               },
            );

            if (!response.ok) {
               throw new Error(`Search failed: ${response.statusText}`);
            }

            const data = await response.json();
            const searchResults = Array.isArray(data) ? data : data.data || [];

            set({
               searchResults,
               isLoading: false,
               error: null,
            });
         } catch (error) {
            set({
               searchResults: [],
               isLoading: false,
               error: error instanceof Error ? error.message : "Search failed",
            });
         }
      },

      debouncedSearchTodos: (query: string, token?: string) => {
         if (searchTimeout) {
            clearTimeout(searchTimeout);
         }

         searchTimeout = setTimeout(() => {
            get().searchTodos(query, token);
         }, 300);
      },

      clearResults: () => {
         if (searchTimeout) {
            clearTimeout(searchTimeout);
            searchTimeout = null;
         }
         set({ searchResults: [], error: null });
      },

      clearError: () => {
         set({ error: null });
      },
   };
});
