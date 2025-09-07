"use client";
import { RiCalendarCheckLine } from "@remixicon/react";
import {
   addDays,
   addMonths,
   addWeeks,
   endOfWeek,
   format,
   isSameMonth,
   startOfWeek,
   subMonths,
   subWeeks,
} from "date-fns";
import {
   ChevronDownIcon,
   ChevronLeftIcon,
   ChevronRightIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuShortcut,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ResponsiveSidebar } from "../todos/responsive-sidebar";
import { AgendaView } from "./agenda-view";
import {
   AgendaDaysToShow,
   EventGap,
   EventHeight,
   WeekCellsHeight,
} from "./constants";
import { DayView } from "./day-view";
import { EventDialog } from "./event-dialog";
import { MonthView } from "./month-view";
import type { CalendarEvent, CalendarView } from "./types";
import { WeekView } from "./week-view";

export interface EventCalendarProps {
   events?: CalendarEvent[];
   className?: string;
   initialView?: CalendarView;
}

export function EventCalendar({
   events = [],
   className,
   initialView = "month",
}: EventCalendarProps) {
   const [currentDate, setCurrentDate] = useState(new Date());
   const [view, setView] = useState<CalendarView>(initialView);
   const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
      null,
   );
   const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);

   // Event handlers
   const handleEventClick = (event: CalendarEvent) => {
      setSelectedEvent(event);
      setIsEventDialogOpen(true);
   };

   const handleCloseEventDialog = () => {
      setIsEventDialogOpen(false);
      setSelectedEvent(null);
   };

   // Add keyboard shortcuts for view switching
   useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         // Skip if user is typing in an input, textarea or contentEditable element
         if (
            e.target instanceof HTMLInputElement ||
            e.target instanceof HTMLTextAreaElement ||
            (e.target instanceof HTMLElement && e.target.isContentEditable)
         ) {
            return;
         }

         switch (e.key.toLowerCase()) {
            case "m":
               setView("month");
               break;
            case "w":
               setView("week");
               break;
            case "d":
               setView("day");
               break;
            case "a":
               setView("agenda");
               break;
         }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
         window.removeEventListener("keydown", handleKeyDown);
      };
   }, []);

   const handlePrevious = () => {
      if (view === "month") {
         setCurrentDate(subMonths(currentDate, 1));
      } else if (view === "week") {
         setCurrentDate(subWeeks(currentDate, 1));
      } else if (view === "day") {
         setCurrentDate(addDays(currentDate, -1));
      } else if (view === "agenda") {
         // For agenda view, go back 30 days (a full month)
         setCurrentDate(addDays(currentDate, -AgendaDaysToShow));
      }
   };

   const handleNext = () => {
      if (view === "month") {
         setCurrentDate(addMonths(currentDate, 1));
      } else if (view === "week") {
         setCurrentDate(addWeeks(currentDate, 1));
      } else if (view === "day") {
         setCurrentDate(addDays(currentDate, 1));
      } else if (view === "agenda") {
         // For agenda view, go forward 30 days (a full month)
         setCurrentDate(addDays(currentDate, AgendaDaysToShow));
      }
   };

   const handleToday = () => {
      setCurrentDate(new Date());
   };

   const viewTitle = useMemo(() => {
      if (view === "month") {
         return format(currentDate, "MMMM yyyy");
      } else if (view === "week") {
         const start = startOfWeek(currentDate, { weekStartsOn: 0 });
         const end = endOfWeek(currentDate, { weekStartsOn: 0 });
         if (isSameMonth(start, end)) {
            return format(start, "MMMM yyyy");
         } else {
            return `${format(start, "MMM")} - ${format(end, "MMM yyyy")}`;
         }
      } else if (view === "day") {
         return (
            <>
               <span className="min-[480px]:hidden" aria-hidden="true">
                  {format(currentDate, "MMM d, yyyy")}
               </span>
               <span
                  className="max-[479px]:hidden min-md:hidden"
                  aria-hidden="true"
               >
                  {format(currentDate, "MMMM d, yyyy")}
               </span>
               <span className="max-md:hidden">
                  {format(currentDate, "EEE MMMM d, yyyy")}
               </span>
            </>
         );
      } else if (view === "agenda") {
         // Show the month range for agenda view
         const start = currentDate;
         const end = addDays(currentDate, AgendaDaysToShow - 1);

         if (isSameMonth(start, end)) {
            return format(start, "MMMM yyyy");
         } else {
            return `${format(start, "MMM")} - ${format(end, "MMM yyyy")}`;
         }
      } else {
         return format(currentDate, "MMMM yyyy");
      }
   }, [currentDate, view]);

   return (
      <div
         className="flex flex-col rounded-lg border has-data-[slot=month-view]:flex-1"
         style={
            {
               "--event-height": `${EventHeight}px`,
               "--event-gap": `${EventGap}px`,
               "--week-cells-height": `${WeekCellsHeight}px`,
            } as React.CSSProperties
         }
      >
         <div
            className={cn(
               "flex items-center justify-between p-2 sm:p-4",
               className,
            )}
         >
            <div className="flex items-center gap-1 sm:gap-4">
               <div className="fixed top-5 left-5 z-30 rounded-lg shadow-md lg:hidden">
                  <ResponsiveSidebar />
               </div>
               <Button
                  variant="outline"
                  className="max-[479px]:aspect-square max-[479px]:p-0!"
                  onClick={handleToday}
               >
                  <RiCalendarCheckLine
                     className="min-[480px]:hidden"
                     size={16}
                     aria-hidden="true"
                  />
                  <span className="max-[479px]:sr-only">Today</span>
               </Button>

               <div className="flex items-center sm:gap-2">
                  <Button
                     variant="ghost"
                     size="icon"
                     onClick={handlePrevious}
                     aria-label="Previous"
                  >
                     <ChevronLeftIcon size={16} aria-hidden="true" />
                  </Button>
                  <Button
                     variant="ghost"
                     size="icon"
                     onClick={handleNext}
                     aria-label="Next"
                  >
                     <ChevronRightIcon size={16} aria-hidden="true" />
                  </Button>
               </div>
               <h2 className="font-semibold text-sm sm:text-lg md:text-xl">
                  {viewTitle}
               </h2>
            </div>
            <div className="flex items-center gap-2">
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button
                        variant="outline"
                        className="gap-1.5 max-[479px]:h-8"
                     >
                        <span>
                           <span
                              className="min-[480px]:hidden"
                              aria-hidden="true"
                           >
                              {view.charAt(0).toUpperCase()}
                           </span>
                           <span className="max-[479px]:sr-only">
                              {view.charAt(0).toUpperCase() + view.slice(1)}
                           </span>
                        </span>
                        <ChevronDownIcon
                           className="-me-1 opacity-60"
                           size={16}
                           aria-hidden="true"
                        />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-32">
                     <DropdownMenuItem onClick={() => setView("month")}>
                        Month <DropdownMenuShortcut>M</DropdownMenuShortcut>
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => setView("week")}>
                        Week <DropdownMenuShortcut>W</DropdownMenuShortcut>
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => setView("day")}>
                        Day <DropdownMenuShortcut>D</DropdownMenuShortcut>
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => setView("agenda")}>
                        Agenda <DropdownMenuShortcut>A</DropdownMenuShortcut>
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         </div>

         <div className="flex flex-1 flex-col">
            {view === "month" && (
               <MonthView
                  currentDate={currentDate}
                  events={events}
                  onEventClick={handleEventClick}
               />
            )}
            {view === "week" && (
               <WeekView
                  currentDate={currentDate}
                  events={events}
                  onEventClick={handleEventClick}
               />
            )}
            {view === "day" && (
               <DayView
                  currentDate={currentDate}
                  events={events}
                  onEventClick={handleEventClick}
               />
            )}
            {view === "agenda" && (
               <AgendaView
                  currentDate={currentDate}
                  events={events}
                  onEventClick={handleEventClick}
               />
            )}
         </div>

         {/* Event Dialog */}
         {selectedEvent && (
            <EventDialog
               event={selectedEvent}
               isOpen={isEventDialogOpen}
               onClose={handleCloseEventDialog}
            />
         )}
      </div>
   );
}
