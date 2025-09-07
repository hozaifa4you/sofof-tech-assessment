import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
   title: "Edit Todo - Todo Miner",
   description: "Edit an existing todo item",
};

const EditTodoLayout = ({ children }: PropsWithChildren) => {
   return <>{children}</>;
};

export default EditTodoLayout;
