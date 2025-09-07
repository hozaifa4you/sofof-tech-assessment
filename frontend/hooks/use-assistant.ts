"use client";
import { useState } from "react";
import { toast } from "sonner";
import { env } from "@/config/env";
import type { Message } from "@/types/assistant";
import { useSession } from "./use-session";

export const useAssistant = () => {
   const session = useSession();
   const [loading, setLoading] = useState(false);
   const [messages, setMessages] = useState<Message[]>([]);

   const runAssistant = async (prompt: string) => {
      setLoading(true);
      const response = await fetch(
         `${env.nextPublicApiUrl}/api/v1/ai-agent/start-conversation`,
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${session?.access_token}`,
            },
            body: JSON.stringify({ prompt }),
            cache: "no-store",
         },
      );

      const result = await response.json();
      if (!response.ok) {
         toast.error("AI Assistant", { description: result.message });
      }

      setMessages((prev) => [...prev, ...result.messages]);
      setLoading(false);
   };

   return { loading, runAssistant, messages, setMessages };
};
