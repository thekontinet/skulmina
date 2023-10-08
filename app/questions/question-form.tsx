"use client";
import QuestionFormComponent from "@/components/question/question-form";
import notify from "@/lib/notify";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { deleteQuestion, updateQuestion } from "./actions";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { QuestionFormSchema, TQuestion, TQuestionForm } from "@/model/question";

type Props = {
  question: TQuestion;
};

function QuestionForm({ question }: Props) {
  const router = useRouter();

  const form = useForm<TQuestionForm>({
    resolver: zodResolver(QuestionFormSchema),
    defaultValues: { questions: [question] },
  });

  const handleDelete = async (id: number | string) => {
    await notify.withPromise(deleteQuestion(id));
    router.replace("questions");
  };

  const handleSave = async (data: z.infer<typeof QuestionFormSchema>) => {
    await notify.withPromise(
      updateQuestion(question.id!, data.questions.at(0)!)
    );
    router.replace("/questions");
  };

  return (
    <section>
      <header className="flex items-center justify-between py-4">
        <Typography variant="h4">Modify Question</Typography>
        <Button onClick={form.handleSubmit(handleSave)}>Save</Button>
      </header>
      <QuestionFormComponent form={form} limit={1} onDelete={handleDelete} />
    </section>
  );
}

export default QuestionForm;
