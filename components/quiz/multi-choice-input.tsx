import {
  FieldArrayWithId,
  UseFormReturn,
  useFieldArray,
} from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Minus, Plus, X } from "lucide-react";
import { z } from "zod";
import { Checkbox } from "../ui/checkbox";
import { Switch } from "../ui/switch";
import { TQuestionForm } from "@/model/question";

type MultiChoiceInputProps = {
  form: UseFormReturn<TQuestionForm, any, undefined>;
  index: number;
  field?: FieldArrayWithId<TQuestionForm, "questions", "id">;
  name: string;
};

function MultiChoiceInput({
  form,
  index: parentIndex,
  name,
}: MultiChoiceInputProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `questions.${parentIndex}.${name}` as any,
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="p-1 relative">
          <FormField
            name={`questions.${parentIndex}.${name}.${index}.value`}
            render={({ field }) => (
              <FormItem className="w-full mt-4">
                <FormMessage />
                <div className="flex">
                  <Input
                    {...field}
                    id={field.name}
                    placeholder={`Choice ${index + 1}`}
                  />
                </div>
              </FormItem>
            )}
          />
          <FormField
            key={field.id}
            name={`questions.${parentIndex}.${name}.${index}.is_correct`}
            render={({ field }) => (
              <FormItem className="flex items-center">
                <Checkbox
                  className="mt-2"
                  id={field.name}
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  placeholder={`Choice ${index + 1}`}
                />
                <FormLabel htmlFor={field.name} className="ml-2">
                  Mark as correct
                </FormLabel>
                <button
                  className="ml-auto text-xs flex items-center text-destructive"
                  type="button"
                  onClick={() => remove(index)}
                >
                  <X size={14} className="mr-1" /> Remove
                </button>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}
      <div className="flex mt-4">
        <Button
          className="ml-auto"
          variant={"outline"}
          type="button"
          onClick={() => append({ value: "Option", is_correct: false })}
        >
          <Plus size={14} /> Add Option
        </Button>
      </div>
    </div>
  );
}

export default MultiChoiceInput;
