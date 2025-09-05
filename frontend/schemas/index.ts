import z from "zod";

export function formatErrors<T>(error: z.ZodError<T>) {
   const errs = z.flattenError(error);

   return errs.fieldErrors;
}
