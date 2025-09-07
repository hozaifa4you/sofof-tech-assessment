"use client";
import {
   EyeIcon,
   EyeOffIcon,
   LoaderCircleIcon,
   LockIcon,
   MailIcon,
} from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { signin } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";

export const SigninForm: React.FC = () => {
   const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
   const [state, action, pending] = useActionState(signin, null);

   const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
   };

   useEffect(() => {
      if (!state?.success && state?.message) {
         toast.error("Signin", {
            description: state.message,
         });
      }
   }, [state?.message, state?.success]);

   return (
      <Form action={action} className="space-y-5">
         {/* Email Input */}
         <div>
            <div className="relative">
               <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <MailIcon className="size-5" />
               </span>
               <input
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                  name="email"
                  defaultValue={
                     (state?.state?.email as unknown as string) || ""
                  }
                  className="w-full rounded-lg border border-border bg-input py-3 pr-4 pl-10 text-foreground outline-none transition duration-300 placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring"
               />
            </div>
            {state?.errors?.email && (
               <p className="mt-0.5 text-red-500">{state.errors.email}</p>
            )}
         </div>

         {/* Password Input */}
         <div>
            <div className="relative">
               <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <LockIcon className="size-5" />
               </span>
               <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  aria-label="Password"
                  name="password"
                  className="w-full rounded-lg border border-border bg-input py-3 pr-10 pl-10 text-foreground outline-none transition duration-300 placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring"
               />
               <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                  aria-label={
                     passwordVisible ? "Hide password" : "Show password"
                  }
               >
                  {passwordVisible ? (
                     <EyeOffIcon className="size-5" />
                  ) : (
                     <EyeIcon className="size-5" />
                  )}
               </button>
            </div>
            {state?.errors?.password && (
               <p className="mt-0.5 text-red-500">{state.errors.password}</p>
            )}
         </div>

         <div className="text-right">
            <p className="font-medium text-muted-foreground text-sm">
               Don't have an account?
               <Link
                  href="/signup"
                  className="font-medium text-primary hover:underline"
               >
                  Signup
               </Link>
            </p>
         </div>

         <div className="flex items-center justify-center">
            <Button size="lg" type="submit">
               {pending && (
                  <LoaderCircleIcon
                     className="-ms-1 animate-spin"
                     size={16}
                     aria-hidden="true"
                  />
               )}{" "}
               Login
            </Button>
         </div>
      </Form>
   );
};
