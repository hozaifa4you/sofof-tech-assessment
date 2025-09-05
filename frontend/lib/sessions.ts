"use server";
import "server-only";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { env } from "@/config/env";

const sessionId = "todo.session";

export type Session = {
   user: {
      id: string;
      avatar: string | null;
      name: string;
      email: string;
   };
   access_token: string;
};

const encodedKey = new TextEncoder().encode(env.jwtSecret);

export async function createSession(payload: Session) {
   const expiredAt = new Date(Date.now() + +env.jwtExpirationNumber);

   const session = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(env.jwtExpiration)
      .sign(encodedKey);

   (await cookies()).set(sessionId, session, {
      httpOnly: true,
      secure: env.appEnv === "production",
      expires: expiredAt,
      sameSite: "lax",
      path: "/",
   });

   return session;
}

export async function getSession() {
   const cookie = (await cookies()).get(sessionId)?.value;
   if (!cookie) return null;

   try {
      const { payload } = await jwtVerify(cookie, encodedKey, {
         algorithms: ["HS256"],
      });

      return payload as Session;
   } catch (err) {
      console.error("Failed to verify the session", err);
      await deleteSession();
      return null;
   }
}

export async function deleteSession() {
   (await cookies()).delete(sessionId);
}

export async function updateTokens({ accessToken }: { accessToken: string }) {
   const cookie = (await cookies()).get(sessionId)?.value;
   if (!cookie) return null;

   try {
      const { payload } = await jwtVerify<Session>(cookie, encodedKey);

      if (!payload) throw new Error("Session not found");

      const newPayload: Session = {
         user: {
            ...payload.user,
         },
         access_token: accessToken,
      };

      await createSession(newPayload);
      return newPayload;
   } catch (err) {
      console.error("Failed to update tokens", err);
      await deleteSession();
      return null;
   }
}