import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import Typography from "@/components/ui/typography";
import QuizForm from "../quizForm";
import { getQuiz } from "../actions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TQuiz } from "@/model/quiz";
import QuizQuestionForm from "../quiz-questions-form";

type PageProps = {
  params: { id: number | string | undefined };
};

async function page({ params }: PageProps) {
  const quiz: TQuiz = await getQuiz(params?.id as string);

  return (
    <DashboardLayout>
      <header className="py-4">
        <Typography variant="h3" className="mb-4">
          {quiz.title}
        </Typography>
      </header>
      <section className="lg:grid grid-cols-10 gap-4 items-start">
        <Card className="col-span-4 mb-4">
          <CardHeader>
            <Typography variant="h4">Quiz</Typography>
          </CardHeader>
          <CardContent>
            <QuizForm quiz={quiz} />
          </CardContent>
        </Card>
        <Card className="col-span-6">
          <CardHeader>
            <Typography variant="h4">Questions</Typography>
          </CardHeader>
          <CardContent>
            <QuizQuestionForm quiz={quiz} />
          </CardContent>
        </Card>
      </section>
    </DashboardLayout>
  );
}

export default page;
