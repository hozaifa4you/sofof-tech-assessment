import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarMenu } from "./sidebar-menu";

const ResponsiveSidebar = () => {
   return (
      <Sheet>
         <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
               <MenuIcon className="size-4" />
            </Button>
         </SheetTrigger>
         <SheetContent side="left" className="max-w-[300px] p-5">
            <SheetHeader className="sr-only">
               <SheetTitle>Responsive Sidebar (Mobile View)</SheetTitle>
               <SheetDescription>
                  This sidebar is visible on mobile devices.
               </SheetDescription>
            </SheetHeader>
            <SidebarMenu />
         </SheetContent>
      </Sheet>
   );
};

export { ResponsiveSidebar };
