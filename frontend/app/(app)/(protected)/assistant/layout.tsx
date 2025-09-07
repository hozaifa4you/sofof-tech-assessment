import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
   title: "Assistant - Todo Miner",
   description: "AI-powered task management assistant",
};

const AssistantLayout = ({ children }: PropsWithChildren) => {
   return <>{children}</>;
};

export default AssistantLayout;
