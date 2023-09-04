import { UseFormReturn, useFieldArray } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";

function MultiChoiceInput({ form }: { form: UseFormReturn<any> }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  return (
    <>
      {fields.map((field, index) => (
        <FormField
          key={field.id}
          name={`options.${index}`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Option {index + 1}</FormLabel>
              <div className="flex">
                <Button
                  className="rounded-l-none"
                  variant={"outline"}
                  type="button"
                  onClick={() => remove(index)}
                >
                  <Minus size={14} />
                </Button>
                <Input
                  {...field}
                  className="rounded-r-none"
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
