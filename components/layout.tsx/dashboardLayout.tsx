"use client";

import Sidebar from "@/components/sidebar";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import Navbar from "./navbar";
import clsx from "clsx";
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
    { title: "Examinations", path: "/examinations", icon: Presentation },
    { title: "Results", path: "/results", icon: GraduationCap },
  ],
  teacher: [
    { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { title: "Qestion Bank", path: "/questions", icon: BookOpenCheck },
    { title: "Examinations", path: "/examinations", icon: Presentation },
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
        <div className={clsx("transition-[width] max-w-[250px]", display)}>
          <Sidebar navigations={navigations[user.role]} />
        </div>
        <section className="w-full">
          <Navbar collapse={collaspe} logout={logout} />
          {children}
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
