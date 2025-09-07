import type { CalendarEvent } from "@/components/app/event-calendar";
import { EventCalendarContainer } from "@/components/event-calendar-container";
import { fetchWithAuth } from "@/lib/authFetch";

const CalenderPage = async () => {
   const res = await fetchWithAuth(`/api/v1/calendar`);
   if (!res.ok) {
      throw new Error("Failed to fetch calendar events");
   }

   const data: CalendarEvent[] = await res.json();

   return (
      <div className="h-full rounded-xl border p-4">
         <EventCalendarContainer initialEvents={data} />
      </div>
   );
};

export default CalenderPage;
