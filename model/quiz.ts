import { z } from "zod";
import { QuestionFormSchema, QuestionSchema } from "./question";

export const quizFormSchema = z.object({
  id: z.coerce.string().default(""),
  course_id: z.coerce.string().optional(),
  code: z.coerce.string().optional(),
  title: z
    .string()
    .min(2, {
      message: "title must be at least 2 characters.",
    })
    .max(255, { message: "title must not be lengther than 255" }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  time_limit: z.coerce
    .string()
    .min(1, { message: "number is required" })
    .transform((v) => parseInt(v))
    .pipe(
      z.number().min(20, {
        message: "time must be at least 20 seconds.",
      })
    ),
  published_at: z.string().refine(
    (dateString) => {
      // Convert the input string to a Date object
      const inputDate = new Date(dateString);

      // Get the current date
      const currentDate = new Date();

      // Check if the input date is greater than the current date
      return inputDate > currentDate;
    },
    {
      message: "date must be greater than today",
    }
  ),
});

const quizWithQuestionsSchema = quizFormSchema.merge(QuestionFormSchema);

export type TQuiz = z.infer<typeof quizWithQuestionsSchema>;
