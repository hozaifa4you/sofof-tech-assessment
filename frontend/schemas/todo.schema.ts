import z from "zod";

export const createTodoSchema = z.object({
   title: z.string().min(1).max(100),
   date: z.coerce.date(),
   description: z.string().min(10).max(500),
   priority: z.enum(["low", "medium", "high"]),
   status: z
      .enum(["pending", "in_progress", "done", "canceled"])
      .optional()
      .default("pending"),
   image: z
      .instanceof(File)
      .refine((file) => file.size <= 1 * 1024 * 1024, {
         message: "Image size should be less than 1MB",
      })
      .optional()
      .or(z.literal("").optional()),
});
