"use client";
import clsx from "clsx";
import {
  BookOpenCheck,
  GraduationCap,
  LayoutDashboard,
  LucideIcon,
  Menu,
  Presentation,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { TUser } from "@/model/user";

type SidebarProps = {
  user: TUser;
};

const sidebarNavigations = {
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
  ],
};

function Sidebar({ user }: SidebarProps) {
  const [display, setDisplay] = useState("w-0");
  const pathname = usePathname();
  const navigations = sidebarNavigations[user.role];

  const collaspe = () => {
    if (display == "w-0") {
      setDisplay("w-full");
    } else {
      setDisplay("w-0");
    }
  };

  return (
    <aside
      className={clsx(
        "transition-[width] max-w-[250px] relative z-10 min-h-screen",
        display
      )}
    >
      <Button
        onClick={collaspe}
        className="-right-2 top-4 rounded-none absolute translate-x-full"
        size={"sm"}
        variant={"secondary"}
      >
        <Menu size={18} />
      </Button>

      <div className="flex flex-col h-full max-w-lg py-6 space-y-12 bg-background overflow-hidden">
        <header className="pl-8 pr-4">
          <h1 className="text-2xl font-bold">Logo</h1>
        </header>

        <div className="space-y-2 overflow-hidden">
          {navigations.map((navitem) => {
            const isActive = pathname.match(navitem.path);
            return (
              <Link
                key={navitem.title}
                href={navitem.path}
                className={clsx([
                  {
                    "bg-primary text-background font-bold": isActive,
                  },
                  {
                    "text-forground hover:bg-muted font-light": !isActive,
                  },
                  "text-xs flex items-center space-x-2 px-8 py-2 w-full",
                ])}
              >
                <navitem.icon size={18} className="text-inherit" />
                <span className="py-2">{navitem.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
