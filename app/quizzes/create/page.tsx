import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import { createQuiz } from "@/src/api/quiz";
import { Card, CardContent } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { quizFormSchema } from "@/model/quiz";
import { useRouter } from "next/navigation";
import { handleValidationError } from "@/lib/httpClient";
import QuizForm from "../quizForm";
import { getAllCourses } from "@/app/courses/action";

async function page() {
  const courses = await getAllCourses();

  return (
    <DashboardLayout>
      <header className="py-4">
        <Typography variant="h4">Create New Quiz</Typography>
      </header>
      <Card>
        <CardContent className="py-4">
          <QuizForm courses={courses} />
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

export default page;
