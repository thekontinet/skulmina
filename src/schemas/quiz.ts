import { z } from "zod";

export const quizFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(255, { message: "Title must not be lengther than 255" }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  time_limit: z
    .any()
    .transform((v) => parseInt(v))
    .pipe(
      z.number().min(20, {
        message: "time must be at least 20 seconds.",
      })
    ),
  published_at: z.coerce.date().min(new Date(), {
    message: "published date must be greater than today",
  }),
});

export const QuestionFormSchema = z.object({
  questions: z.array(
    z.object({
      description: z.string().min(1, { message: "Description required" }),
      options: z
        .array(
          z.object({
            value: z.string().min(2, { message: "Min 2 chars" }),
            is_correct: z.boolean(),
          })
        )
        .min(1, { message: "Please enter atleast one answer" }),
    })
  ),
});
