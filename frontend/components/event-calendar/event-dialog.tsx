"use client";
import { RiCalendarLine } from "@remixicon/react";
import { format } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { DefaultStartHour, EndHour, StartHour } from "./constants";
import type { CalendarEvent } from "./types";

interface EventDialogProps {
   event: CalendarEvent;
   isOpen: boolean;
   onClose: () => void;
}

export function EventDialog({ event, isOpen, onClose }: EventDialogProps) {
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [startDate, setStartDate] = useState<Date>(new Date());
   const [startTime, setStartTime] = useState(`${DefaultStartHour}:00`);
   const [error, setError] = useState<string | null>(null);
   const [startDateOpen, setStartDateOpen] = useState(false);

   // Debug log to check what event is being passed
   useEffect(() => {
      console.log("EventDialog received event:", event);
   }, [event]);

   const resetForm = useCallback(() => {
      setTitle("");
      setDescription("");
      setStartDate(new Date());
      setStartTime(`${DefaultStartHour}:00`);
      setError(null);
   }, []);

   const formatTimeForInput = useCallback((date: Date) => {
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = Math.floor(date.getMinutes() / 15) * 15;
      return `${hours}:${minutes.toString().padStart(2, "0")}`;
   }, []);

   // Memoize time options so they're only calculated once
   const timeOptions = useMemo(() => {
      const options = [];
      for (let hour = StartHour; hour <= EndHour; hour++) {
         for (let minute = 0; minute < 60; minute += 15) {
            const formattedHour = hour.toString().padStart(2, "0");
            const formattedMinute = minute.toString().padStart(2, "0");
            const value = `${formattedHour}:${formattedMinute}`;
            // Use a fixed date to avoid unnecessary date object creations
            const date = new Date(2000, 0, 1, hour, minute);
            const label = format(date, "h:mm a");
            options.push({ value, label });
         }
      }
      return options;
   }, []);

   useEffect(() => {
      if (event) {
         setTitle(event.title || "");
         setDescription(event.description || "");

         const start = new Date(event.start);

         setStartDate(start);
         setStartTime(formatTimeForInput(start));
         setError(null);
      } else {
         resetForm();
      }
   }, [event, formatTimeForInput, resetForm]);

   return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Task Details</DialogTitle>
               <DialogDescription className="sr-only">
                  Your task/todo details
               </DialogDescription>
            </DialogHeader>
            {error && (
               <div className="rounded-md bg-destructive/15 px-3 py-2 text-destructive text-sm">
                  {error}
               </div>
            )}
            <div className="grid gap-4 py-4">
               <div className="*:not-first:mt-1.5">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" value={title} disabled readOnly />
               </div>

               <div className="*:not-first:mt-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                     id="description"
                     value={description}
                     rows={3}
                     disabled
                     readOnly
                  />
               </div>

               <div className="flex gap-4">
                  <div className="flex-1 *:not-first:mt-1.5">
                     <Label htmlFor="start-date">Start Date</Label>
                     <Popover
                        open={startDateOpen}
                        onOpenChange={setStartDateOpen}
                     >
                        <PopoverTrigger asChild>
                           <Button
                              disabled
                              id="start-date"
                              variant={"outline"}
                              className={cn(
                                 "group w-full justify-between border-input bg-background px-3 font-normal outline-none outline-offset-0 hover:bg-background focus-visible:outline-[3px]",
                                 !startDate && "text-muted-foreground",
                              )}
                           >
                              <span
                                 className={cn(
                                    "truncate",
                                    !startDate && "text-muted-foreground",
                                 )}
                              >
                                 {startDate
                                    ? format(startDate, "PPP")
                                    : "Pick a date"}
                              </span>
                              <RiCalendarLine
                                 size={16}
                                 className="shrink-0 text-muted-foreground/80"
                                 aria-hidden="true"
                              />
                           </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-2" align="start">
                           <Calendar
                              disabled
                              mode="single"
                              selected={startDate}
                              defaultMonth={startDate}
                              onSelect={(date) => {
                                 if (date) {
                                    setStartDate(date);
                                    setError(null);
                                    setStartDateOpen(false);
                                 }
                              }}
                           />
                        </PopoverContent>
                     </Popover>
                  </div>

                  <div className="min-w-28 *:not-first:mt-1.5">
                     <Label htmlFor="start-time">Start Time</Label>
                     <Select
                        value={startTime}
                        onValueChange={setStartTime}
                        disabled
                     >
                        <SelectTrigger id="start-time">
                           <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                           {timeOptions.map((option) => (
                              <SelectItem
                                 key={option.value}
                                 value={option.value}
                              >
                                 {option.label}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                  </div>
               </div>
            </div>
            <DialogFooter className="flex-row sm:justify-between">
               <div className="flex flex-1 justify-end gap-2">
                  <Button onClick={onClose}>Close</Button>
               </div>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
