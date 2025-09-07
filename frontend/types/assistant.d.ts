export type Message = {
   id: string;
   role: "user" | "assistant" | "system" | "tool" | string[];
   content: string;
};
