"use client";

import {
   addHours,
   eachHourOfInterval,
   format,
   getHours,
   getMinutes,
   isSameDay,
   startOfDay,
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

interface DayViewProps {
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

export function DayView({ currentDate, events, onEventClick }: DayViewProps) {
   const hours = useMemo(() => {
      const dayStart = startOfDay(currentDate);
      return eachHourOfInterval({
         start: addHours(dayStart, StartHour),
         end: addHours(dayStart, EndHour - 1),
      });
   }, [currentDate]);

   const dayEvents = useMemo(() => {
      return events
         .filter((event) => {
            const eventStart = new Date(event.start);
            return isSameDay(currentDate, eventStart);
         })
         .sort(
            (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
         );
   }, [currentDate, events]);

   // All events are treated as single-day events (simplified)
   const allDayEvents = useMemo(() => {
      return dayEvents; // All events shown in day view
   }, [dayEvents]);

   // Get time-based events (same as all events for now)
   const timeEvents = useMemo(() => {
      return dayEvents;
   }, [dayEvents]);

   // Process events to calculate positions
   const positionedEvents = useMemo(() => {
      // Sort events by start time (simplified)
      const sortedEvents = [...timeEvents].sort((a, b) => {
         const aStart = new Date(a.start);
         const bStart = new Date(b.start);
         return aStart.getTime() - bStart.getTime();
      });

      // Create positioned events (simplified - assuming 1 hour duration)
      const positionedEvents: PositionedEvent[] = sortedEvents.map((event) => {
         const eventStart = new Date(event.start);

         // Calculate top position and height
         const startHour = getHours(eventStart) + getMinutes(eventStart) / 60;
         const top = (startHour - StartHour) * WeekCellsHeight;
         const height = WeekCellsHeight; // Default 1 hour height

         return {
            event,
            top,
            height,
            left: 0,
            width: 100,
            zIndex: 10,
         };
      });

      return positionedEvents;
   }, [timeEvents]);

   const showAllDaySection = allDayEvents.length > 0;
   const { currentTimePosition, currentTimeVisible } = useCurrentTimeIndicator(
      currentDate,
      "day",
   );
   return (
      <div data-slot="day-view" className="contents">
         {showAllDaySection && (
            <div className="border-border/70 border-t bg-muted/50">
               <div className="grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_1fr]">
                  <div className="relative">
                     <span className="absolute bottom-0 left-0 h-6 w-16 max-w-full pe-2 text-right text-[10px] text-muted-foreground/70 sm:pe-4 sm:text-xs">
                        All day
                     </span>
                  </div>
                  <div className="relative border-border/70 border-r p-1 last:border-r-0">
                     {allDayEvents.map((event) => {
                        const eventStart = new Date(event.start);
                        const isFirstDay = isSameDay(currentDate, eventStart);
                        const isLastDay = true; // Single day event

                        return (
                           <EventItem
                              key={`spanning-${event.id}`}
                              event={event}
                              view="month"
                              isFirstDay={isFirstDay}
                              isLastDay={isLastDay}
                           >
                              {/* Always show the title in day view for better usability */}
                              <div>{event.title}</div>
                           </EventItem>
                        );
                     })}
                  </div>
               </div>
            </div>
         )}

         <div className="grid flex-1 grid-cols-[3rem_1fr] overflow-hidden border-border/70 border-t sm:grid-cols-[4rem_1fr]">
            <div>
               {hours.map((hour, index) => (
                  <div
                     key={hour.toString()}
                     className="relative h-[var(--week-cells-height)] border-border/70 border-b last:border-b-0"
                  >
                     {index > 0 && (
                        <span className="-top-3 absolute left-0 flex h-6 w-16 max-w-full items-center justify-end bg-background pe-2 text-[10px] text-muted-foreground/70 sm:pe-4 sm:text-xs">
                           {format(hour, "h a")}
                        </span>
                     )}
                  </div>
               ))}
            </div>

            <div className="relative">
               {/* Positioned events */}
               {positionedEvents.map((positionedEvent) => (
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
                           view="day"
                           showTime
                           height={positionedEvent.height}
                           onClick={() => onEventClick?.(positionedEvent.event)}
                        />
                     </div>
                  </div>
               ))}

               {/* Current time indicator */}
               {currentTimeVisible && (
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

               {/* Time grid */}
               {hours.map((hour) => {
                  const hourValue = getHours(hour);
                  return (
                     <div
                        key={hour.toString()}
                        className="relative h-[var(--week-cells-height)] border-border/70 border-b last:border-b-0"
                     >
                        {/* Quarter-hour intervals */}
                        {[0, 1, 2, 3].map((quarter) => {
                           const quarterHourTime = hourValue + quarter * 0.25;
                           return (
                              <DroppableCell
                                 key={`${hour.toString()}-${quarter}`}
                                 id={`day-cell-${currentDate.toISOString()}-${quarterHourTime}`}
                                 date={currentDate}
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
         </div>
      </div>
   );
}
