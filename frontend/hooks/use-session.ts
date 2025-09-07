"use client";
import { useEffect, useState } from "react";
import type { Session } from "@/lib/sessions";

export function useSession() {
   const [session, setSession] = useState<Session | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchSession = async () => {
         try {
            const response = await fetch("/api/auth/session");
            if (response.ok) {
               const sessionData = await response.json();
               setSession(sessionData);
            }
            // biome-ignore lint/correctness/noUnusedVariables: error is intentionally unused in catch block
         } catch (error) {
         } finally {
            setLoading(false);
         }
      };

      fetchSession();
   }, []);

   return {
      ...session,
      loading,
      isAuthenticated: !!session?.user,
   };
}
