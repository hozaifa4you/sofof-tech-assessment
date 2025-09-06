"use client";
import { useState } from "react";
import { type CalendarEvent, EventCalendar } from "@/components/event-calendar";

interface EventCalendarContainerProps {
   initialEvents: CalendarEvent[];
}

export function EventCalendarContainer({
   initialEvents,
}: EventCalendarContainerProps) {
   const [events] = useState<CalendarEvent[]>(initialEvents);

   return <EventCalendar events={events} />;
}
