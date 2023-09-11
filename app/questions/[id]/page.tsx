"use client";
import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { getQuestions } from "@/src/api/question";
import { useParams } from "next/navigation";
import React from "react";
import useSwr from "swr";

function QuestionEditPage() {
  const { id } = useParams();
  const { data: question, isLoading } = useSwr(["question", id], () =>
    getQuestions(id as string)
  );

  console.log(id)
  return (
    <DashboardLayout>
      <Card>
        <Typography>hello</Typography>
        <CardContent></CardContent>
      </Card>
    </DashboardLayout>
  );
}

export default QuestionEditPage;
