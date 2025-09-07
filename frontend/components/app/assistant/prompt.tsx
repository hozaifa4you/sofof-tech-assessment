"use client";
import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PromptComponentProps {
   runAssistant: (prompt: string) => void;
   loading: boolean;
}

const PromptComponent = ({ runAssistant, loading }: PromptComponentProps) => {
   const [prompt, setPrompt] = useState("");

   const handleSubmit = () => {
      if (prompt.trim().length < 10) return;
      runAssistant(prompt);
      setPrompt("");
   };

   return (
      <div className="mb-13 w-full self-end">
         <div className="relative rounded-3xl border border-gray-200/50 bg-white/80 p-4 shadow backdrop-blur-xl transition-all duration-300 hover:shadow-lg dark:border-gray-800/50 dark:bg-black/90">
            <textarea
               className="w-full resize-none bg-transparent font-medium text-base text-gray-800 leading-relaxed placeholder-gray-500 focus:outline-none dark:text-gray-100 dark:placeholder-gray-400"
               rows={3}
               placeholder="Ask me anything about your todos..."
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
               onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && prompt.trim().length >= 10) {
                     e.preventDefault();
                     handleSubmit();
                  }
               }}
            />

            {/* Right side controls */}
            <div className="absolute right-4 bottom-4 flex items-center gap-3">
               <Button
                  type="button"
                  size="lg"
                  disabled={loading || prompt.trim().length < 10}
                  onClick={handleSubmit}
               >
                  <ArrowUp size={22} />
               </Button>
            </div>
         </div>
      </div>
   );
};

export default PromptComponent;
