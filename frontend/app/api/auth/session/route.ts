import { NextResponse } from "next/server";
import { deleteSession, getSession } from "@/lib/sessions";

export const GET = async () => {
   const session = await getSession();
   if (session) {
      return NextResponse.json(session);
   }

   return NextResponse.json({ success: false }, { status: 401 });
};

export const DELETE = async () => {
   await deleteSession();

   return NextResponse.json({ success: true });
};
