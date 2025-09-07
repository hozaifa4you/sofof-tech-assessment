"use client";
import { LoaderCircleIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import PromptComponent from "@/components/app/assistant/prompt";
import { TodoHeader } from "@/components/app/header";
import { buttonVariants } from "@/components/ui/button";
import { useAssistant } from "@/hooks/use-assistant";
import { cn } from "@/lib/utils";

const AssistantPage = () => {
   const { messages, loading, runAssistant } = useAssistant();

   return (
      <div className="h-full rounded-xl border p-4">
         <TodoHeader
            title="AI Assistant (Anisha)"
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
            <div className="flex h-full w-full flex-col gap-2 overflow-y-auto">
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
                  <div className="flex items-center gap-1">
                     <LoaderCircleIcon
                        className="animate-spin text-primary"
                        size={14}
                        aria-hidden="true"
                     />{" "}
                     <p className="text-sm">Loading...</p>
                  </div>
               )}
            </div>
            <PromptComponent runAssistant={runAssistant} loading={loading} />
         </div>
      </div>
   );
};

export default AssistantPage;
