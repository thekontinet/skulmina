import { z } from "zod";

export const optionSchema = z.object({
  value: z.string().min(1, { message: "the option value is required" }),
  is_correct: z.boolean(),
});

export const QuestionSchema = z.object({
  id: z.coerce.string().optional(),
  description: z.string().min(1, { message: "the description required" }),
  options: z
    .array(optionSchema)
    .nonempty({ message: "Please add atleast one answer to this question" })
    .refine(
      // Ensure there is at least one correct option
      (options) => {
        return options.some((option) => option.is_correct);
      },
      {
        message: "At least one option must be marked as correct.",
      }
    )
    .refine(
      (options) => {
        // Ensure options are unique
        const values = options.map((option) => option.value);
        return new Set(values).size === values.length;
      },
      {
        message: "Options must be unique within a question.",
      }
    ),
});

export const QuestionFormSchema = z.object({
  questions: z.array(QuestionSchema),
});

export type TQuestion = z.infer<typeof QuestionSchema>;
export type TQuestionForm = z.infer<typeof QuestionFormSchema>;
