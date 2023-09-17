"use client";
import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import QuestionForm from "@/components/question/question-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { getQuestions } from "@/src/api/question";
import { QuestionFormSchema } from "@/src/schemas/quiz";
import { ApiResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSwr from "swr";
import { z } from "zod";

function QuestionEditPage() {
  const { id } = useParams();
  const { data: question, isLoading } = useSwr(["question", id], () =>
    getQuestions(id as string, {id})
  );

  const form = useForm<z.infer<typeof QuestionFormSchema>>({
    resolver: zodResolver(QuestionFormSchema),
  })

  useEffect(function(){
    if(!question?.data) return
    form.setValue('questions', [question?.data])
  }, [question])

  const onSubmit = async (data: z.infer<typeof QuestionFormSchema>) => {
    console.log(data);
    alert('done')
  }


  return (
    <DashboardLayout>
      <Card className="py-4">
        <CardContent className="flex items-center">
          <CardTitle>Modify Question</CardTitle>
          <Button
            disabled={form.formState.isSubmitting}
            onClick={() => form.handleSubmit(onSubmit)}
            className="ml-auto"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader size={14} className="animate-spin" />
                <span>Please Wait</span>
              </>
            ) : (
              <span>Save</span>
            )}
          </Button>
        </CardContent>
      </Card>

      <QuestionForm form={form}/>
    </DashboardLayout>
  );
}

export default QuestionEditPage;
