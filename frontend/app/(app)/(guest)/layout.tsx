import type { PropsWithChildren } from "react";

const GuestLayout = ({ children }: PropsWithChildren) => {
   return <main className="w-full min-h-screen">{children}</main>;
};

export default GuestLayout;
