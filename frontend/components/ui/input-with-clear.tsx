"use client";
import { CircleXIcon } from "lucide-react";
import { type ReactNode, useId, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputWithClearProps {
   label?: ReactNode;
   type?: string;
   placeholder?: string;
   value?: string;
   name?: string;
   onChange?: (value: string) => void;
}

export default function InputWithClear({ ...props }: InputWithClearProps) {
   const id = useId();
   const inputRef = useRef<HTMLInputElement>(null);
   const [value, setValue] = useState("");

   const handleClearInput = () => {
      props.onChange ? props.onChange("") : setValue("");
      if (inputRef.current) {
         inputRef.current.focus();
      }
   };

   return (
      <div className="*:not-first:mt-2">
         {props?.label && <Label htmlFor={id}>{props.label}</Label>}
         <div className="relative">
            <Input
               id={id}
               ref={inputRef}
               className="pe-9"
               placeholder={props.placeholder}
               type={props.type}
               value={props.value ?? value}
               onChange={(e) =>
                  props.onChange
                     ? props.onChange?.(e.target.value)
                     : setValue(e.target.value)
               }
               name={props.name}
            />
            {(props.value || value) && (
               <button
                  type="button"
                  className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Clear input"
                  onClick={handleClearInput}
               >
                  <CircleXIcon size={16} aria-hidden="true" />
               </button>
            )}
         </div>
      </div>
   );
}
