"use client"
import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import QuestionTable from "@/components/question/question-table";
import useSwr from "swr";
import { getQuestions } from "@/src/api/question";
import { ApiResponse, QuestionType } from "@/types";

function Question() {
  const {
    data: questions,
    mutate,
    isLoading
  } = useSwr<ApiResponse<QuestionType[]>>("questions", () => getQuestions());




  return (
    <DashboardLayout>
      <Card className="mb-6">
        <CardHeader className="flex-row items-center">
          <CardTitle>Question Bank</CardTitle>
          <Button className="ml-auto">
            <Link href={"/questions/create"}>Create Question</Link>
          </Button>
        </CardHeader>
      </Card>

      <QuestionTable questions={questions?.data || []}/>
    </DashboardLayout>
  );
}

export default Question;
