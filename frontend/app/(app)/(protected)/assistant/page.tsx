"use client";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import PromptComponent from "@/components/app/assistant/prompt";
import { TodoHeader } from "@/components/app/header";
import { buttonVariants } from "@/components/ui/button";
import { useAssistant } from "@/hooks/use-assistant";
import { cn } from "@/lib/utils";

const AssistantPage = () => {
   const { messages, loading } = useAssistant();

   return (
      <div className="h-full rounded-xl border p-4">
         <TodoHeader
            title="AI Assistant"
            button={
               <Link
                  href="/todos/new"
                  className={buttonVariants({
                     size: "sm",
                  })}
               >
                  <PlusIcon /> Create
               </Link>
            }
         />

         <div className="mx-auto flex h-full max-w-3xl flex-col gap-3">
            <div className="flex h-full w-full flex-col items-end gap-2 overflow-y-auto">
               {messages.map((message) => (
                  <div
                     key={message.id}
                     className={cn(
                        "self-start rounded-lg bg-slate-50 p-1.5 text-slate-500 text-sm",
                        {
                           "self-end bg-primary/10 text-slate-600":
                              message.role === "user",
                        },
                     )}
                  >
                     {message.content}
                  </div>
               ))}
               {loading && (
                  <div>
                     <p>Loading...</p>
                  </div>
               )}
            </div>
            <PromptComponent />
         </div>
      </div>
   );
};

export default AssistantPage;
