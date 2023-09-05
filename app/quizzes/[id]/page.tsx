"use client";

import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import QuestionForm from "@/components/quiz/question-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import { getQuizzes } from "@/src/api/quiz";
import { QuestionFormSchema } from "@/src/schemas/quiz";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import useSwr from "swr";
import { z } from "zod";

function page() {
  const { id } = useParams();
  const { data: quiz, isLoading } = useSwr(["quiz", id], () =>
    getQuizzes(id as string)
  );

  const form = useForm<z.infer<typeof QuestionFormSchema>>({
    resolver: zodResolver(QuestionFormSchema),
  });

  const onSubmit = (data: {}) => {
    console.log(data);
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
        </CardContent>
      </Card>

      <Card className="my-4 p-2">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex items-center py-3">
                <Button className="ml-auto">Save</Button>
              </div>
              <QuestionForm form={form} />
            </form>
          </Form>
        </CardContent>
      </Card>

      <Button variant={"outline"} className="w-full mt-4">
        <Plus size={12} />
      </Button>
    </DashboardLayout>
  );
}

export default page;
