"use client";

import {
   addDays,
   eachDayOfInterval,
   endOfMonth,
   endOfWeek,
   format,
   isSameMonth,
   isToday,
   startOfMonth,
   startOfWeek,
} from "date-fns";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import {
   type CalendarEvent,
   DraggableEvent,
   DroppableCell,
   EventGap,
   EventHeight,
   EventItem,
   getAllEventsForDay,
   getEventsForDay,
   sortEvents,
   useEventVisibility,
} from "./index";

interface MonthViewProps {
   currentDate: Date;
   events: CalendarEvent[];
   onEventClick?: (event: CalendarEvent) => void;
}

export function MonthView({
   currentDate,
   events,
   onEventClick,
}: MonthViewProps) {
   const days = useMemo(() => {
      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(monthStart);
      const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
      const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

      return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
   }, [currentDate]);

   const weekdays = useMemo(() => {
      return Array.from({ length: 7 }).map((_, i) => {
         const date = addDays(startOfWeek(new Date()), i);
         return format(date, "EEE");
      });
   }, []);

   const weeks = useMemo(() => {
      const result = [];
      let week = [];

      for (let i = 0; i < days.length; i++) {
         week.push(days[i]);
         if (week.length === 7 || i === days.length - 1) {
            result.push(week);
            week = [];
         }
      }

      return result;
   }, [days]);

   const [isMounted, setIsMounted] = useState(false);
   const { contentRef, getVisibleEventCount } = useEventVisibility({
      eventHeight: EventHeight,
      eventGap: EventGap,
   });

   useEffect(() => {
      setIsMounted(true);
   }, []);

   return (
      <div
         data-slot="month-view"
         className="contents"
         style={
            {
               "--event-height": `${EventHeight}px`,
               "--event-gap": `${EventGap}px`,
            } as React.CSSProperties
         }
      >
         <div className="grid grid-cols-7 border-border/70 border-b">
            {weekdays.map((day) => (
               <div
                  key={day}
                  className="py-2 text-center text-muted-foreground/70 text-sm"
               >
                  {day}
               </div>
            ))}
         </div>
         <div className="grid flex-1 auto-rows-fr">
            {weeks.map((week, weekIndex) => (
               <div
                  key={`week-${week[0].toISOString()}`}
                  className="grid grid-cols-7 [&:last-child>*]:border-b-0"
               >
                  {week.map((day, dayIndex) => {
                     if (!day) return null; // Skip if day is undefined

                     const dayEvents = getEventsForDay(events, day);
                     const isCurrentMonth = isSameMonth(day, currentDate);
                     const cellId = `month-cell-${day.toISOString()}`;
                     // Use only dayEvents since spanning events are empty
                     const allDayEvents = dayEvents;
                     const allEvents = getAllEventsForDay(events, day);

                     const isReferenceCell = weekIndex === 0 && dayIndex === 0;
                     const visibleCount = isMounted
                        ? getVisibleEventCount(allDayEvents.length)
                        : undefined;
                     const hasMore =
                        visibleCount !== undefined &&
                        allDayEvents.length > visibleCount;
                     const remainingCount = hasMore
                        ? allDayEvents.length - visibleCount
                        : 0;

                     return (
                        <div
                           key={day.toString()}
                           className="group overflow-hidden border-border/70 border-r border-b last:border-r-0 data-outside-cell:bg-muted/25 data-outside-cell:text-muted-foreground/70"
                           data-today={isToday(day) || undefined}
                           data-outside-cell={!isCurrentMonth || undefined}
                        >
                           <DroppableCell id={cellId} date={day}>
                              <div className="mt-1 inline-flex size-6 items-center justify-center rounded-full text-sm group-data-today:bg-primary group-data-today:text-primary-foreground">
                                 {format(day, "d")}
                              </div>
                              <div
                                 ref={isReferenceCell ? contentRef : null}
                                 className="flex min-h-[calc((var(--event-height)+var(--event-gap))*2)] flex-col sm:min-h-[calc((var(--event-height)+var(--event-gap))*3)] lg:min-h-[calc((var(--event-height)+var(--event-gap))*4)]"
                              >
                                 {sortEvents(allDayEvents).map(
                                    (event, index) => {
                                       const isHidden =
                                          isMounted &&
                                          visibleCount &&
                                          index >= visibleCount;

                                       if (!visibleCount) return null;

                                       // Since all events are single-day, render them directly
                                       return (
                                          <div
                                             key={event.id}
                                             className="aria-hidden:hidden"
                                             aria-hidden={
                                                isHidden ? "true" : undefined
                                             }
                                          >
                                             <DraggableEvent
                                                event={event}
                                                view="month"
                                                isFirstDay={true}
                                                isLastDay={true}
                                                onClick={() =>
                                                   onEventClick?.(event)
                                                }
                                             />
                                          </div>
                                       );
                                    },
                                 )}

                                 {hasMore && (
                                    <Popover modal>
                                       <PopoverTrigger asChild>
                                          <button
                                             type="button"
                                             className="mt-[var(--event-gap)] flex h-[var(--event-height)] w-full select-none items-center overflow-hidden px-1 text-left text-[10px] text-muted-foreground outline-none backdrop-blur-md transition hover:bg-muted/50 hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:px-2 sm:text-xs"
                                             onClick={(e) =>
                                                e.stopPropagation()
                                             }
                                          >
                                             <span>
                                                + {remainingCount}{" "}
                                                <span className="max-sm:sr-only">
                                                   more
                                                </span>
                                             </span>
                                          </button>
                                       </PopoverTrigger>
                                       <PopoverContent
                                          align="center"
                                          className="max-w-52 p-3"
                                          style={
                                             {
                                                "--event-height": `${EventHeight}px`,
                                             } as React.CSSProperties
                                          }
                                       >
                                          <div className="space-y-2">
                                             <div className="font-medium text-sm">
                                                {format(day, "EEE d")}
                                             </div>
                                             <div className="space-y-1">
                                                {sortEvents(allEvents).map(
                                                   (event) => {
                                                      return (
                                                         <EventItem
                                                            key={event.id}
                                                            event={event}
                                                            view="month"
                                                            isFirstDay={true}
                                                            isLastDay={true}
                                                            onClick={() =>
                                                               onEventClick?.(
                                                                  event,
                                                               )
                                                            }
                                                         />
                                                      );
                                                   },
                                                )}
                                             </div>
                                          </div>
                                       </PopoverContent>
                                    </Popover>
                                 )}
                              </div>
                           </DroppableCell>
                        </div>
                     );
                  })}
               </div>
            ))}
         </div>
      </div>
   );
}
