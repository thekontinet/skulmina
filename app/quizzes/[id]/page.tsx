"use client";

import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import QuestionForm from "@/components/quiz/question-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { handleValidationError } from "@/lib/httpClient";
import { createQuestion } from "@/src/api/question";
import { getQuizzes } from "@/src/api/quiz";
import { QuestionFormSchema } from "@/src/schemas/quiz";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSwr from "swr";
import { z } from "zod";

const initialData = {
  questions: [
    {
      description: "",
      options: [],
    },
  ],
};

function page() {
  const { id } = useParams();
  const router = useRouter();
  const { data: quiz } = useSwr(["quiz", id], () => getQuizzes(id as string));
  const [localStorageQuestion, setLocalStorageQuestion] = useLocalStorage(
    `question-${id}`,
    initialData
  );

  const form = useForm<z.infer<typeof QuestionFormSchema>>({
    resolver: zodResolver(QuestionFormSchema),
    defaultValues: localStorageQuestion,
  });

  // Autosave form state while form is changing
  useEffect(() => {
    const subscription = form.watch((value) => {
      setLocalStorageQuestion(value);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const onSubmit = (data: z.infer<typeof QuestionFormSchema>) => {
    const transformedData = data.questions.map((question) => ({
      description: question.description,
      options: question.options
        .filter((op) => !op.is_correct)
        .map((d) => d.value),
      answers: question.options
        .filter((op) => op.is_correct)
        .map((d) => d.value),
      examination_id: id,
    }));

    Promise.allSettled(
      transformedData.map((question) => createQuestion(question))
    )
      .then((questions) => {
        router.refresh();
      })
      .catch((err) => handleValidationError(err, form.setError));
  };

  return (
    <DashboardLayout>
      <Card className="py-4">
        <CardContent>
          <CardTitle>{quiz?.data.title}</CardTitle>
          <Typography variant="small">
            <Typography variant="strong">Publish Date:</Typography>
            <Typography as="span">{quiz?.data.published_at}</Typography>
          </Typography>
          <div className="flex items-center py-3">
            <Button onClick={form.handleSubmit(onSubmit)} className="ml-auto">
              Save
            </Button>
          </div>
        </CardContent>
      </Card>

      <QuestionForm form={form} onSubmit={onSubmit} />

      {/* {fields.map((field, index) => (
        <Card key={field.id} className="my-4 p-2">
          <CardHeader className="flex-row items-center">
            <Typography variant="h4">Question {1 + index}</Typography>
            <Button
              className="ml-auto block"
              onClick={() => remove(index)}
              variant={"outline"}
            >
              <X size={14} />
            </Button>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                
              </form>
            </Form>
          </CardContent>
        </Card>
      ))} */}
    </DashboardLayout>
  );
}

export default page;
