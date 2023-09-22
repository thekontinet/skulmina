import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Button } from "../ui/button";
import MultiChoiceInput from "../quiz/multi-choice-input";
import { z } from "zod";
import { Card, CardContent, CardHeader } from "../ui/card";
import Typography from "../ui/typography";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { deleteQuizQuestion } from "@/app/quizzes/actions";
import notify from "@/lib/notify";
import ConfirmButton from "../widget/confirm-button";
import { QuestionFormSchema, TQuestionForm } from "@/model/question";

type QuestionFormProps = {
  form: UseFormReturn<TQuestionForm, any, undefined>;
  limit?: number;
  onDelete?: (id: string | number) => Promise<void>;
};

function QuestionForm({ form, limit = 10, onDelete }: QuestionFormProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const hasReachedQuestionsLimit = form.getValues().questions?.length >= limit;

  const addNewQuestionForm = () => {
    if (hasReachedQuestionsLimit) {
      return alert("Limit of questions exceeded");
    }
    append({
      description: "",
      options: [{ value: "", is_correct: false }],
    });
  };

  const handleRemove = async (index: number) => {
    const question = form.getValues(`questions.${index}`);
    if (question?.id && onDelete) await onDelete(question?.id);
    remove(index);
  };

  return (
    <div>
      {fields.map((field, index) => (
        <Card
          key={field.id}
          className={cn("my-4 p-2", {
            "border-primary border-2": form.getValues("questions")[index].id,
          })}
        >
          <CardHeader className="flex-row items-center">
            <Typography variant="h4">Question {1 + index}</Typography>
            <ConfirmButton
              className="ml-auto block"
              onConfirm={() => handleRemove(index)}
              variant={"outline"}
              size={"sm"}
            >
              <X size={14} />
            </ConfirmButton>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form name={`question-form-${index}`} className="space-y-3">
                {/* Start Error Message */}
                <FormField
                  name={`questions.${index}.options.root`}
                  render={({ field }) => (
                    <FormMessage className="bg-destructive text-destructive-foreground p-4 rounded-md" />
                  )}
                />
                {/* End Error Message */}

                <FormField
                  name={`questions.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={`questions.${index}.description`}>
                        Description
                      </FormLabel>
                      <Textarea
                        {...field}
                        placeholder="Write question here"
                        className="resize-none"
                        id={`questions.${index}.description`}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <MultiChoiceInput name="options" form={form} index={index} />
              </form>
            </Form>
          </CardContent>
        </Card>
      ))}

      {!hasReachedQuestionsLimit && (
        <Button
          onClick={addNewQuestionForm}
          variant={"outline"}
          className="w-full mt-4 border-dotted border py-8"
        >
          <Plus size={12} />
        </Button>
      )}
    </div>
  );
}

export default QuestionForm;
