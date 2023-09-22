import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import QuestionForm from "../question-form";
import { getQuestion } from "../actions";

type PageProps = {
  params: { id: number | string };
};

async function page({ params }: PageProps) {
  const question = await getQuestion(params.id);

  return (
    <DashboardLayout>
      <QuestionForm question={question.data} />
    </DashboardLayout>
  );
}

export default page;
