"use client";

import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import { getQuizzes, updateQuiz } from "@/src/api/quiz";
import { Card, CardContent } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { quizFormSchema } from "@/src/schemas/quiz";
import { useParams, useRouter } from "next/navigation";
import { handleValidationError } from "@/lib/httpClient";
import { useEffect } from "react";
import useSwr from "swr";
import QuizForm from "../../../../components/quiz/quiz-form";

function UpdateQuizPage() {
  const { id } = useParams();
  const { data: quiz, isLoading } = useSwr(["quiz", id], () =>
    getQuizzes(id as string)
  );

  useEffect(() => {
    if (quiz) {
      form.reset({
        ...quiz.data,
        publish_at: new Date(quiz.data.publish_at).toDateString(),
      });
    }
  }, [isLoading]);

  const form = useForm<z.infer<typeof quizFormSchema>>({
    resolver: zodResolver(quizFormSchema),
  });

  const redirect = useRouter();

  const onSubmit = (data: z.infer<typeof quizFormSchema>) => {
    updateQuiz(id as string, data)
      .then((res) => redirect.push("/examinations"))
      .catch((err) => handleValidationError(err, form.setError));
  };

  if (isLoading) return <>Loading...</>;

  return (
    <DashboardLayout>
      <Typography variant="h3" className="mb-4">
        {quiz?.data.title}
      </Typography>
      <Card>
        <CardContent className="py-4">
          <QuizForm form={form} onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

export default UpdateQuizPage;
