import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
   title: "Todo List - Todo Miner",
   description: "Manage your todo list efficiently with Todo Miner.",
};

const TodoListLayout = ({ children }: PropsWithChildren) => {
   return <>{children}</>;
};

export default TodoListLayout;
