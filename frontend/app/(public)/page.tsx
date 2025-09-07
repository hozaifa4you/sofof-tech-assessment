import { redirect } from "next/navigation";
import { getSession } from "@/lib/sessions";

export default async function Home() {
   const session = await getSession();
   if (session) {
      return redirect("/todos");
   } else {
      return redirect("/signup");
   }
}
