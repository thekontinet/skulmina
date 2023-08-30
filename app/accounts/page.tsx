import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import CreateUserForm from "./createUserForm";
import UserCard from "@/components/ui/userCard";
import { Users } from "@/src/constant";

const page = () => {
  return (
    <DashboardLayout>
      <section className="p-4 md:px-12 md:py-8 w-full">
        <header className="flex justify-between items-center py-4">
          <h1>ALL USERS</h1>
          <CreateUserForm />
        </header>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {Users.map((user) => {
            return (
              <UserCard name={user.name} email={user.email} role={user.role} />
            );
          })}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default page;
