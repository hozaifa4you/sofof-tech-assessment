"use client";
import { SidebarMenu } from "./sidebar-menu";

const Sidebar = () => {
   return (
      <aside className="sticky top-0 hidden h-screen w-full max-w-[340px] p-5 lg:block">
         <SidebarMenu />
      </aside>
   );
};

export { Sidebar };
