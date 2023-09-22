import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import { getUser } from "../(auth)/login/action";
import { TUser } from "@/model/user";

async function Dashboard() {
  return (
    <DashboardLayout>
      <div>hello</div>
    </DashboardLayout>
  );
}

export default Dashboard;
