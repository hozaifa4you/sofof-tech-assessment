export interface TodoType {
   id: number;
   title: string;
   description: string;
   date: Date;
   status: "pending" | "in_progress" | "done" | "canceled";
   priority: "low" | "medium" | "high";
   image: string | null;
   created_at: Date;
   updated_at: Date;
}

export type ExtraJson = {
   color?: string;
   end?: Date;
   allDay?: boolean;
   location?: string;
};
