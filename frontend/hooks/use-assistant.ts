"use client";
import { useState } from "react";
import { toast } from "sonner";
import { env } from "@/config/env";
import type { Message } from "@/types/assistant";
import { useSession } from "./use-session";

export const useAssistant = () => {
   const session = useSession();
   const [loading, setLoading] = useState(false);
   const [messages, setMessages] = useState<Message[]>([
      {
         id: "welcome",
         role: "assistant",
         content: "Hello! I'm your AI assistant. How can I help you today?",
      },
   ]);

   const runAssistant = async (prompt: string) => {
      const userMessage: Message = {
         id: `user-${Date.now()}`,
         role: "user",
         content: prompt,
      };

      setMessages((prev) => [...prev, userMessage]);
      setLoading(true);

      try {
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

         if (!response.ok) {
            const result = await response.json();
            toast.error("AI Assistant", { description: result.message });
            setLoading(false);
            return;
         }

         const data = await response.json();

         // Create assistant message from response
         const assistantMessage: Message = {
            id: data.id || `assistant-${Date.now()}`,
            role: "assistant",
            content: data.content || data.message || "No response received",
         };

         setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
         toast.error("AI Assistant", {
            description:
               (error as unknown as Error).message ??
               "Failed to get response from AI assistant",
         });
      } finally {
         setLoading(false);
      }
   };

   return {
      loading,
      runAssistant,
      messages,
      setMessages,
      clearMessages: () =>
         setMessages([
            {
               id: "welcome",
               role: "assistant",
               content:
                  "Hello! I'm your AI assistant. How can I help you today?",
            },
         ]),
   };
};
