import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
   title: "Create Todo - Todo Miner",
   description: "Create a new todo item",
};

const NewTodoLayout = ({ children }: PropsWithChildren) => {
   return <>{children}</>;
};

export default NewTodoLayout;
