import Image from "next/image";
import { SigninForm } from "@/components/auth/signin-form";
import { FacebookIcon, GitHubIcon, GoogleIcon } from "@/components/icons";

const SigninPage = () => {
   return (
      <div className="container flex min-h-screen flex-col items-center justify-center">
         <div className="mx-auto w-full max-w-md rounded-3xl border border-border bg-card p-8 font-sans text-foreground shadow-2xl">
            <div className="mb-6 flex justify-center">
               <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-accent">
                  <Image
                     src="/assets/logo.svg"
                     alt="Logo"
                     width={25}
                     height={25}
                  />
               </div>
            </div>

            <h1 className="mb-8 text-center font-bold text-3xl text-foreground">
               Signin with email
            </h1>

            <SigninForm />

            <div className="my-6 flex items-center">
               <hr className="flex-grow border-border border-t" />
               <span className="mx-4 text-muted-foreground text-sm">
                  Or login with
               </span>
               <hr className="flex-grow border-border border-t" />
            </div>

            <div className="flex justify-center space-x-4">
               <button
                  type="button"
                  aria-label="Sign in with Google"
                  className="flex h-12 w-12 transform items-center justify-center rounded-full border border-border bg-card transition-transform hover:scale-110 hover:bg-accent hover:text-accent-foreground"
               >
                  <GoogleIcon />
               </button>
               <button
                  type="button"
                  aria-label="Sign in with Facebook"
                  className="flex h-12 w-12 transform items-center justify-center rounded-full border border-border bg-card transition-transform hover:scale-110 hover:bg-accent hover:text-accent-foreground"
               >
                  <FacebookIcon />
               </button>
               <button
                  type="button"
                  aria-label="Sign in with Apple"
                  className="flex h-12 w-12 transform items-center justify-center rounded-full border border-border bg-card transition-transform hover:scale-110 hover:bg-accent hover:text-accent-foreground"
               >
                  <GitHubIcon />
               </button>
            </div>
         </div>
      </div>
   );
};

export default SigninPage;
