import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AccountType, ApiResponse } from "@/types";
import { getAllUsers } from "./actions";
import UserList from "./user-list";
import Link from "next/link";
import Typography from "@/components/ui/typography";
import { Card, CardContent } from "@/components/ui/card";

const page = async () => {
  const users: ApiResponse<AccountType[]> = await getAllUsers();

  return (
    <DashboardLayout>
      <section>
        <header className="flex items-center justify-between py-4">
          <Typography variant="h4">Accounts</Typography>
          <div className="ml-auto">
            <Link href={"accounts/create"}>
              <Button variant={"outline"} size={"sm"}>
                <PlusCircle size={20} className="mr-2" /> New Account
              </Button>
            </Link>
          </div>
        </header>
        <UserList users={users.data} />
      </section>
    </DashboardLayout>
  );
};

export default page;
