export enum TodoStatus {
   PENDING = 'pending',
   IN_PROGRESS = 'in_progress',
   DONE = 'done',
   CANCELED = 'canceled',
}

export enum TodoPriority {
   LOW = 'low',
   MEDIUM = 'medium',
   HIGH = 'high',
}

export type ExtraJson = {
   color?: string;
   end?: Date;
   allDay?: boolean;
   location?: string;
};
