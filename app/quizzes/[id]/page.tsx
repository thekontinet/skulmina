"use client";

import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import QuestionForm from "@/components/question/question-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import { getQuizzes } from "@/src/api/quiz";
import { QuestionFormSchema } from "@/src/schemas/quiz";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import React, { LegacyRef, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import useSwr from "swr";
import { z } from "zod";

function page() {
  const { id } = useParams();

  const { data: quiz } = useSwr(["quiz", id], () => getQuizzes(id as string));

  const initialData = {
    questions: [
      {
        description: "",
        options: [],
      },
    ],
  };

  const form = useForm<z.infer<typeof QuestionFormSchema>>({
    resolver: zodResolver(QuestionFormSchema),
    defaultValues:
      JSON.parse(localStorage.getItem(`quests-${id}`) || "[]") || initialData,
  });

  React.useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem(`quests-${id}`, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const onSubmit = (data: {}) => {
    console.log(JSON.stringify(data));
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

      {fields.map((field, index) => (
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
                <QuestionForm form={form} index={index} field={field} />
              </form>
            </Form>
          </CardContent>
        </Card>
      ))}

      <Button
        onClick={() => append({ description: "", options: [] })}
        variant={"outline"}
        className="w-full mt-4"
      >
        <Plus size={12} />
      </Button>
    </DashboardLayout>
  );
}

export default page;
