import Image from "next/image";
import { SignupForm } from "@/components/app/auth/signup-form";
import { FacebookIcon, GitHubIcon, GoogleIcon } from "@/components/icons";

const SignupPage = () => {
   return (
      <div className="container flex min-h-screen items-center justify-center">
         <div className="text-foreground bg-card border-border mx-auto w-full max-w-md rounded-3xl border p-8 font-sans shadow-2xl">
            <div className="mb-6 flex justify-center">
               <div className="bg-accent border-border flex h-12 w-12 items-center justify-center rounded-lg border">
                  <Image
                     src="/assets/logo.svg"
                     alt="Logo"
                     width={25}
                     height={25}
                  />
               </div>
            </div>

            <h1 className="text-foreground mb-8 text-center text-3xl font-bold">
               Signup with email
            </h1>

            <SignupForm />

            <div className="my-6 flex items-center">
               <hr className="border-border flex-grow border-t" />
               <span className="text-muted-foreground mx-4 text-sm">
                  Or signup with
               </span>
               <hr className="border-border flex-grow border-t" />
            </div>

            <div className="flex justify-center space-x-4">
               <button
                  type="button"
                  aria-label="Sign in with Google"
                  className="bg-card border-border hover:bg-accent hover:text-accent-foreground flex h-12 w-12 transform items-center justify-center rounded-full border transition-transform hover:scale-110"
               >
                  <GoogleIcon />
               </button>
               <button
                  type="button"
                  aria-label="Sign in with Facebook"
                  className="bg-card border-border hover:bg-accent hover:text-accent-foreground flex h-12 w-12 transform items-center justify-center rounded-full border transition-transform hover:scale-110"
               >
                  <FacebookIcon />
               </button>
               <button
                  type="button"
                  aria-label="Sign in with Apple"
                  className="bg-card border-border hover:bg-accent hover:text-accent-foreground flex h-12 w-12 transform items-center justify-center rounded-full border transition-transform hover:scale-110"
               >
                  <GitHubIcon />
               </button>
            </div>
         </div>
      </div>
   );
};

export default SignupPage;
