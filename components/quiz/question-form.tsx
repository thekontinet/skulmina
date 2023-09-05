import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import {
  FieldArrayWithId,
  UseFormReturn,
  useFieldArray,
} from "react-hook-form";
import { Button } from "../ui/button";
import MultiChoiceInput from "./multi-choice-input";
import { QuestionFormSchema } from "@/src/schemas/quiz";
import { z } from "zod";

type QuestionFormProps = {
  form: UseFormReturn<z.infer<typeof QuestionFormSchema>, any, undefined>;
  index: number;
  field?: FieldArrayWithId<
    z.infer<typeof QuestionFormSchema>,
    "questions",
    "id"
  >;
};

function QuestionForm({ form, index }: QuestionFormProps) {
  return (
    <div className="space-y-3">
      <FormField
        name={`questions.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Write question here"
              className="resize-none"
              {...field}
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <MultiChoiceInput name="options" form={form} index={index} />
      <FormField
        name={`questions.${index}.options.root`}
        render={({ field }) => <FormMessage className="text-primary" />}
      />
    </div>
  );
}

export default QuestionForm;
