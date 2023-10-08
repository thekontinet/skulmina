import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import Typography from "@/components/ui/typography";
import QuestionList from "./question-list";
import { getAllQuestions } from "./actions";

async function Question() {
  const res = await getAllQuestions();

  return (
    <DashboardLayout>
      <header className="flex-row items-center py-4">
        <Typography variant="h4">Question Bank</Typography>
      </header>
      <QuestionList questions={res.data} />
    </DashboardLayout>
  );
}

export default Question;
