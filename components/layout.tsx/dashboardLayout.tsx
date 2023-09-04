"use client";

import Sidebar from "@/components/sidebar";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import Navbar from "./navbar";
import {
  BookOpenCheck,
  GraduationCap,
  LayoutDashboard,
  Loader,
  Presentation,
  Users,
} from "lucide-react";

const navigations = {
  admin: [
    { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { title: "Accounts", path: "/accounts", icon: Users },
  ],
  student: [
    { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { title: "Quizzes", path: "/quizzes", icon: Presentation },
    { title: "Results", path: "/results", icon: GraduationCap },
  ],
  teacher: [
    { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { title: "Qestion Bank", path: "/questions", icon: BookOpenCheck },
    { title: "Quizzes", path: "/quizzes", icon: Presentation },
    { title: "Results", path: "/results", icon: GraduationCap },
    { title: "zzzzz", path: "/results", icon: GraduationCap },
  ],
};

const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  const [display, setDisplay] = useState("w-0");
  const { logout, user } = useAuth({ middleware: "auth" });

  const collaspe = () => {
    if (display == "w-0") {
      setDisplay("w-full");
    } else {
      setDisplay("w-0");
    }
  };

  if (!user) {
    return (
      <div className="h-screen grid place-items-center uppercase text-center">
        <div>
          <Loader size={24} className="animate-spin mx-auto" />
          <p className="text-sm mt-3">Please Wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <main className="flex">
        <Sidebar navigations={navigations[user.role]} />
        <section className="w-full">
          <Navbar logout={logout} />
          <header className="bg-primary h-56"></header>
          <div className="-translate-y-48 mx-auto px-2 md:px-4 lg:px-12">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
