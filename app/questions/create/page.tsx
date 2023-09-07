"use client";
import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import QuestionForm from "@/components/question/question-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { handleValidationError } from "@/lib/httpClient";
import { createQuestion, deleteQuestion } from "@/src/api/question";
import { QuestionFormSchema } from "@/src/schemas/quiz";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { promise, z } from "zod";
import Question from "../page";
import { Description } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

function QuestionCreate() {
  const form = useForm<z.infer<typeof QuestionFormSchema>>({
    resolver: zodResolver(QuestionFormSchema),
  });

  const router = useRouter();

  const onSubmit = (data: z.infer<typeof QuestionFormSchema>) => {
    const transformedData = data.questions.map((question) => ({
      description: question.description,
      options: question.options
        .filter((option) => !option.is_correct)
        .map((d) => d.value),
      answers: question.options
        .filter((option) => option.is_correct)
        .map((d) => d.value),
    }));
    Promise.allSettled(
      transformedData.map((question) => createQuestion(question))
    )
      .then((questions) => {
        router.push("/questions");
      })
      .catch((err) => handleValidationError(err, form.setError));
  };


  return (
    <DashboardLayout>
      <Typography variant="h3" className="mb-4">
        Create New Question
      </Typography>
      <Card className="relative">
        <CardHeader>
          <Button
            className="absolute top-4 right-7"
            onClick={form.handleSubmit(onSubmit)}
          >
            Save Questions
          </Button>
        </CardHeader>
        <CardContent>
          <QuestionForm form={form} />
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

export default QuestionCreate;
