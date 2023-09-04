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
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Button } from "../ui/button";
import MultiChoiceInput from "./multi-choice-input";

function QuestionForm({ form }: { form: UseFormReturn<any> }) {
  return (
    <div className="space-y-3">
      <FormField
        name="description"
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
      <FormField
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Answer Type</FormLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Answer Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="multi-choice">Multi Choice</SelectItem>
                <SelectItem value="short-answer">Short Answer</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <MultiChoiceInput form={form} />
    </div>
  );
}

export default QuestionForm;
