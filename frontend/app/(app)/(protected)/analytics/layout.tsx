import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
   title: "Upcoming - Todo Miner",
   description: "Manage your upcoming tasks efficiently with Todo Miner.",
};

const UpcomingLayout = ({ children }: PropsWithChildren) => {
   return <>{children}</>;
};

export default UpcomingLayout;
