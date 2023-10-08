import { TUser } from "@/model/user";
import Navbar from "./navbar";
import Sidebar from "../sidebar";
import { redirect } from "next/navigation";
import { getUser } from "@/app/(auth)/login/action";

const DashboardLayout = async ({ children }: React.PropsWithChildren) => {
  let user: TUser | null = await getUser();

  return (
    <div className="">
      <main className="flex">
        <Sidebar user={user!} />
        <section className="w-full">
          <Navbar />
          <div className="mx-auto px-4">{children}</div>
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
