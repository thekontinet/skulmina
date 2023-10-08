import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import QuizCard from "@/components/quiz/quiz-card";
import { ApiResponse } from "@/types";
import { useState } from "react";
import useSwr from "swr";
import ExamCardSkeleton from "../../components/quiz/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import notify from "@/lib/notify";
import axios from "@/lib/axios";
import { deleteQuiz, getAllQuiz } from "./actions";
import QuizList from "./quiz-list";
import { Plus, PlusCircle } from "lucide-react";
import Typography from "@/components/ui/typography";
import { getAuthUser } from "../accounts/actions";

/**
 * Quizzes Page Component
 * TODO: Create the couse list page with deletion and editing feature
 * TODO: Add Sorting, Filter and Searach
 */

const page = async () => {
  const quizzes = (await getAllQuiz()).data;
  const user = (await getAuthUser()).data;

  return (
    <DashboardLayout>
      <header className="flex items-center justify-between py-4">
        <Typography variant="h4">All Quizzes</Typography>
        <Link href={"/quizzes/create"}>
          <Button className="ml-auto">
            <PlusCircle size={20} className="mr-2" /> Create Quiz
          </Button>
        </Link>
      </header>
      <div className="grid gap-2 @md:grid-cols-2  @xl:grid-cols-3 @5xl:grid-cols-4 w-full">
        <QuizList quizzes={quizzes} user={user} />
      </div>
    </DashboardLayout>
  );
};

export default page;
