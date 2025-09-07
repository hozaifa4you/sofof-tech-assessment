"use client";

import {
   addHours,
   differenceInMinutes,
   eachDayOfInterval,
   eachHourOfInterval,
   endOfWeek,
   format,
   getHours,
   isBefore,
   isSameDay,
   isToday,
   startOfDay,
   startOfWeek,
} from "date-fns";
import { useMemo } from "react";
import { EndHour, StartHour } from "@/components/app/event-calendar/constants";
import { cn } from "@/lib/utils";
import {
   type CalendarEvent,
   DraggableEvent,
   DroppableCell,
   EventItem,
   useCurrentTimeIndicator,
   WeekCellsHeight,
} from "./index";

interface WeekViewProps {
   currentDate: Date;
   events: CalendarEvent[];
   onEventClick?: (event: CalendarEvent) => void;
}

interface PositionedEvent {
   event: CalendarEvent;
   top: number;
   height: number;
   left: number;
   width: number;
   zIndex: number;
}

export function WeekView({ currentDate, events, onEventClick }: WeekViewProps) {
   const days = useMemo(() => {
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
      const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
      return eachDayOfInterval({ start: weekStart, end: weekEnd });
   }, [currentDate]);

   const weekStart = useMemo(
      () => startOfWeek(currentDate, { weekStartsOn: 0 }),
      [currentDate],
   );

   const hours = useMemo(() => {
      const dayStart = startOfDay(currentDate);
      return eachHourOfInterval({
         start: addHours(dayStart, StartHour),
         end: addHours(dayStart, EndHour - 1),
      });
   }, [currentDate]);

   // Get events for the week (simplified for single-day events)
   const allDayEvents = useMemo(() => {
      return events.filter((event) => {
         const eventStart = new Date(event.start);
         return days.some((day) => isSameDay(day, eventStart));
      });
   }, [events, days]);

   // Process events for each day to calculate positions (simplified for single-day events)
   const processedDayEvents = useMemo(() => {
      const result = days.map((day) => {
         // Get events for this day
         const dayEvents = events.filter((event) => {
            const eventStart = new Date(event.start);
            return isSameDay(day, eventStart);
         });

         // Sort events by start time
         const sortedEvents = [...dayEvents].sort((a, b) => {
            const aStart = new Date(a.start);
            const bStart = new Date(b.start);
            return aStart.getTime() - bStart.getTime();
         });

         // Create positioned events (simplified - assuming 1 hour duration)
         const positionedEvents: PositionedEvent[] = sortedEvents.map(
            (event) => {
               const eventStart = new Date(event.start);
               const dayStart = startOfDay(day);

               // Calculate position from start of day
               const minutesFromStart = differenceInMinutes(
                  eventStart,
                  dayStart,
               );
               const top = (minutesFromStart / 60) * WeekCellsHeight;
               const height = WeekCellsHeight; // Default 1 hour height

               return {
                  event,
                  top,
                  height,
                  left: 0,
                  width: 100,
                  zIndex: 10,
               };
            },
         );

         return positionedEvents;
      });

      return result;
   }, [days, events]);

   const showAllDaySection = allDayEvents.length > 0;
   const { currentTimePosition, currentTimeVisible } = useCurrentTimeIndicator(
      currentDate,
      "week",
   );

   return (
      <div data-slot="week-view" className="flex h-full flex-col">
         <div className="sticky top-0 z-30 grid grid-cols-8 border-border/70 border-b bg-background/80 backdrop-blur-md">
            <div className="py-2 text-center text-muted-foreground/70 text-sm">
               <span className="max-[479px]:sr-only">
                  {format(new Date(), "O")}
               </span>
            </div>
            {days.map((day) => (
               <div
                  key={day.toString()}
                  className="py-2 text-center text-muted-foreground/70 text-sm data-today:font-medium data-today:text-foreground"
                  data-today={isToday(day) || undefined}
               >
                  <span className="sm:hidden" aria-hidden="true">
                     {format(day, "E")[0]} {format(day, "d")}
                  </span>
                  <span className="max-sm:hidden">{format(day, "EEE dd")}</span>
               </div>
            ))}
         </div>

         {showAllDaySection && (
            <div className="border-border/70 border-b bg-muted/50">
               <div className="grid grid-cols-8">
                  <div className="relative border-border/70 border-r">
                     <span className="absolute bottom-0 left-0 h-6 w-16 max-w-full pe-2 text-right text-[10px] text-muted-foreground/70 sm:pe-4 sm:text-xs">
                        All day
                     </span>
                  </div>
                  {days.map((day, dayIndex) => {
                     const dayAllDayEvents = allDayEvents.filter((event) => {
                        const eventStart = new Date(event.start);
                        return isSameDay(day, eventStart);
                     });

                     return (
                        <div
                           key={day.toString()}
                           className="relative border-border/70 border-r p-1 last:border-r-0"
                           data-today={isToday(day) || undefined}
                        >
                           {dayAllDayEvents.map((event) => {
                              const eventStart = new Date(event.start);
                              const isFirstDay = isSameDay(day, eventStart);
                              const isLastDay = true; // Single day event

                              // Check if this is the first day in the current week view
                              const isFirstVisibleDay =
                                 dayIndex === 0 &&
                                 isBefore(eventStart, weekStart);
                              const shouldShowTitle =
                                 isFirstDay || isFirstVisibleDay;

                              return (
                                 <EventItem
                                    key={`spanning-${event.id}`}
                                    event={event}
                                    view="month"
                                    isFirstDay={isFirstDay}
                                    isLastDay={isLastDay}
                                 >
                                    {/* Show title if it's the first day of the event or the first visible day in the week */}
                                    <div
                                       className={cn(
                                          "truncate",
                                          !shouldShowTitle && "invisible",
                                       )}
                                       aria-hidden={!shouldShowTitle}
                                    >
                                       {event.title}
                                    </div>
                                 </EventItem>
                              );
                           })}
                        </div>
                     );
                  })}
               </div>
            </div>
         )}

         <div className="grid flex-1 grid-cols-8 overflow-hidden">
            <div className="grid auto-cols-fr border-border/70 border-r">
               {hours.map((hour, index) => (
                  <div
                     key={hour.toString()}
                     className="relative min-h-[var(--week-cells-height)] border-border/70 border-b last:border-b-0"
                  >
                     {index > 0 && (
                        <span className="-top-3 absolute left-0 flex h-6 w-16 max-w-full items-center justify-end bg-background pe-2 text-[10px] text-muted-foreground/70 sm:pe-4 sm:text-xs">
                           {format(hour, "h a")}
                        </span>
                     )}
                  </div>
               ))}
            </div>

            {days.map((day, dayIndex) => (
               <div
                  key={day.toString()}
                  className="relative grid auto-cols-fr border-border/70 border-r last:border-r-0"
                  data-today={isToday(day) || undefined}
               >
                  {/* Positioned events */}
                  {(processedDayEvents[dayIndex] ?? []).map(
                     (positionedEvent) => (
                        <div
                           key={positionedEvent.event.id}
                           className="absolute z-10 px-0.5"
                           style={{
                              top: `${positionedEvent.top}px`,
                              height: `${positionedEvent.height}px`,
                              left: `${positionedEvent.left * 100}%`,
                              width: `${positionedEvent.width * 100}%`,
                              zIndex: positionedEvent.zIndex,
                           }}
                        >
                           <div className="size-full">
                              <DraggableEvent
                                 event={positionedEvent.event}
                                 view="week"
                                 showTime
                                 height={positionedEvent.height}
                                 onClick={() =>
                                    onEventClick?.(positionedEvent.event)
                                 }
                              />
                           </div>
                        </div>
                     ),
                  )}

                  {/* Current time indicator - only show for today's column */}
                  {currentTimeVisible && isToday(day) && (
                     <div
                        className="pointer-events-none absolute right-0 left-0 z-20"
                        style={{ top: `${currentTimePosition}%` }}
                     >
                        <div className="relative flex items-center">
                           <div className="-left-1 absolute h-2 w-2 rounded-full bg-primary"></div>
                           <div className="h-[2px] w-full bg-primary"></div>
                        </div>
                     </div>
                  )}
                  {hours.map((hour) => {
                     const hourValue = getHours(hour);
                     return (
                        <div
                           key={hour.toString()}
                           className="relative min-h-[var(--week-cells-height)] border-border/70 border-b last:border-b-0"
                        >
                           {/* Quarter-hour intervals */}
                           {[0, 1, 2, 3].map((quarter) => {
                              const quarterHourTime =
                                 hourValue + quarter * 0.25;
                              return (
                                 <DroppableCell
                                    key={`${hour.toString()}-${quarter}`}
                                    id={`week-cell-${day.toISOString()}-${quarterHourTime}`}
                                    date={day}
                                    time={quarterHourTime}
                                    className={cn(
                                       "absolute h-[calc(var(--week-cells-height)/4)] w-full",
                                       quarter === 0 && "top-0",
                                       quarter === 1 &&
                                          "top-[calc(var(--week-cells-height)/4)]",
                                       quarter === 2 &&
                                          "top-[calc(var(--week-cells-height)/4*2)]",
                                       quarter === 3 &&
                                          "top-[calc(var(--week-cells-height)/4*3)]",
                                    )}
                                 />
                              );
                           })}
                        </div>
                     );
                  })}
               </div>
            ))}
         </div>
      </div>
   );
}
