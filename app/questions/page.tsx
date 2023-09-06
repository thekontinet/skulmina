import React from "react";
import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ExamCardSkeleton from "@/components/quiz/skeleton";
import QuestionTable from "@/components/question/question-table";

function Question() {
  return (
    <DashboardLayout>
      <Card className="mb-6">
        <CardHeader className="flex-row items-center">
          <CardTitle>Question Bank</CardTitle>
          <Button className="ml-auto">
            <Link href={"/questions/create"}>Create Question</Link>
          </Button>
        </CardHeader>
        <CardContent className="grid gap-2 md:grid-cols-3 w-full">
          {/* {isLoading && <ExamCardSkeleton count={6} />}
          {exams?.data?.map((exam) => (
            <QuizCard key={exam.id} quiz={exam} onDelete={handleDelete} />
          ))} */}
        </CardContent>
      </Card>

      <QuestionTable/>
    </DashboardLayout>
  );
}

export default Question;
