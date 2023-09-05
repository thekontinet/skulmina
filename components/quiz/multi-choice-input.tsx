import {
  FieldArrayWithId,
  UseFormReturn,
  useFieldArray,
} from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { z } from "zod";
import { QuestionFormSchema } from "@/src/schemas/quiz";

type MultiChoiceInputProps = {
  form: UseFormReturn<z.infer<typeof QuestionFormSchema>, any, undefined>;
  index: number;
  field?: FieldArrayWithId<
    z.infer<typeof QuestionFormSchema>,
    "questions",
    "id"
  >;
  name: string;
};

function MultiChoiceInput({
  form,
  index: parentIndex,
  name,
}: MultiChoiceInputProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `questions.${parentIndex}.${name}`,
  });

  return (
    <>
      {fields.map((field, index) => (
        <FormField
          key={field.id}
          name={`questions.${parentIndex}.${name}.${index}`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Option {index + 1}</FormLabel>
              <div className="flex">
                <Button
                  className="rounded-r-none border-r-0"
                  variant={"outline"}
                  type="button"
                  onClick={() => remove(index)}
                >
                  <Minus size={14} />
                </Button>
                <Input
                  {...field}
                  className="rounded-l-none border-l-0"
                  placeholder={`Choice ${index + 1}`}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      <Button
        className="w"
        variant={"outline"}
        type="button"
        onClick={() => append("")}
      >
        <Plus size={14} /> Add Option
      </Button>
    </>
  );
}

export default MultiChoiceInput;
