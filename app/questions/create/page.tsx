"use client"
import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import QuestionForm from "@/components/question/question-form";
import { Card, CardContent } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { handleValidationError } from "@/lib/httpClient";
import { createQuestion } from "@/src/api/question";
import { QuestionFormSchema } from "@/src/schemas/quiz";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function QuestionCreate() {

  const form = useForm<z.infer<typeof QuestionFormSchema>>({
      resolver: zodResolver(QuestionFormSchema),

  });

  const redirect = useRouter();

  // const onSubmit = (data: z.infer<typeof QuestionFormSchema>) => {
  //   createQuestion(data)
  //     .then((res) => redirect.push("/questions"))
  //     .catch((err) => handleValidationError(err, form.setError));
  // };

  return (
    <DashboardLayout>
      <Typography variant="h3" className="mb-4">
        Create New Question
      </Typography>
      <Card>
        <CardContent>
          <QuestionForm form={form} />
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

export default QuestionCreate;
