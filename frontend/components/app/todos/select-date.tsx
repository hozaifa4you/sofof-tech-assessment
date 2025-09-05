"use client";
import { CalendarSearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";

export function SelectDate() {
   const [open, setOpen] = React.useState(false);
   const [date, setDate] = React.useState<Date | undefined>(undefined);
   const router = useRouter();

   return (
      <div className="flex flex-col gap-3">
         <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
               <Button
                  variant="link"
                  id="date"
                  className="w-auto justify-between font-normal"
               >
                  <CalendarSearchIcon />
                  {date ? date.toLocaleDateString() : "Select date"}
               </Button>
            </PopoverTrigger>
            <PopoverContent
               className="w-auto overflow-hidden p-0"
               align="start"
            >
               <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                     setDate(date);
                     setOpen(false);
                     router.push(`?date=${date?.toISOString().split("T")[0]}`);
                  }}
               />
            </PopoverContent>
         </Popover>
      </div>
   );
}
