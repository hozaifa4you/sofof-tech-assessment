import z from "zod";

const signupSchema = z.object({
   name: z.string().min(3).max(32),
   email: z.email(),
   password: z.string().min(8).max(100),
});

const signinSchema = z.object({
   email: z.email(),
   password: z.string().min(8).max(32),
});

export { signupSchema, signinSchema };
