"use client";
import {
   BadgeCheck,
   Bell,
   ChevronsUpDown,
   CreditCard,
   LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

export function UserMenu({
   user,
}: {
   user: {
      name: string;
      email: string;
      avatar?: string;
   };
}) {
   const router = useRouter();

   const handleLogout = async () => {
      const response = await fetch("/api/auth/session", {
         method: "DELETE",
         headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
         toast.error("Signout", {
            description: "There was an error signing out. Please try again.",
         });

         return;
      }

      window.location.href = "/signin";
   };

   const handleNavigate = (href: string) => {
      router.push(href);
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button
               size="lg"
               variant="outline"
               className="w-full py-5 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
               <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">TM</AvatarFallback>
               </Avatar>
               <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
               </div>
               <ChevronsUpDown className="ml-auto size-4" />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg">
            <DropdownMenuLabel className="p-0 font-normal">
               <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                     <AvatarImage src={user.avatar} alt={user.name} />
                     <AvatarFallback className="rounded-lg">TM</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                     <span className="truncate font-medium">{user.name}</span>
                     <span className="truncate text-xs">{user.email}</span>
                  </div>
               </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               <DropdownMenuItem onClick={() => handleNavigate("/analytics")}>
                  <BadgeCheck />
                  Analytics
               </DropdownMenuItem>
               <DropdownMenuItem onClick={() => handleNavigate("/todos")}>
                  <CreditCard />
                  Todos
               </DropdownMenuItem>
               <DropdownMenuItem onClick={() => handleNavigate("/assistant")}>
                  <Bell />
                  Assistant
               </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={handleLogout}>
               <LogOut />
               Log out
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
