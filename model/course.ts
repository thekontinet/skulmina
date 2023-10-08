import { z } from "zod";

export const CourseSchema = z.object({
  id: z.coerce.string().default(""),
  teacher_id: z.coerce.string().optional(),
  code: z.coerce.string().optional(),
  title: z
    .string()
    .min(2, {
      message: "title must be at least 2 characters.",
    })
    .max(255, { message: "title must not be lengther than 255" }),
});

export type TCourse = z.infer<typeof CourseSchema>
