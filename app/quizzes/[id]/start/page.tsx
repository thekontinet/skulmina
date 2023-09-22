import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import StartQuiz from "../../start-quiz";

const page = () => {
  return (
    <DashboardLayout>
      <StartQuiz />
    </DashboardLayout>
  );
};

export default page;
