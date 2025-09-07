export type CalendarView = "month" | "week" | "day" | "agenda";

export interface CalendarEvent {
   id: string;
   title: string;
   description?: string;
   start: Date;
   color?: EventColor;
   status?: string;
   priority?: string;
   image: string | null;
}

export type EventColor =
   | "sky"
   | "amber"
   | "violet"
   | "rose"
   | "emerald"
   | "orange";
