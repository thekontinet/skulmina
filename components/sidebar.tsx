import clsx from "clsx";
import {
  GraduationCap,
  LayoutDashboard,
  Presentation,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

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
    { title: "Examinations", path: "/examinations", icon: Presentation },
    { title: "Results", path: "/results", icon: GraduationCap },
  ],
};

type SidebarProps = {
  role: keyof typeof navigations;
};

function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col h-screen max-w-lg py-6 space-y-12 bg-background">
      <header className="pl-8 pr-4">
        <h1 className="text-2xl font-bold">Logo</h1>
      </header>

      <div className="space-y-2 overflow-hidden">
        {navigations[role].map((navitem) => (
          <Link
            key={navitem.title}
            href={navitem.path}
            className={clsx([
              { "bg-primary": pathname.match(navitem.path) },
              "text-forground hover:bg-primary text-sm font-bold flex items-center space-x-2 px-8 py-2 w-full",
            ])}
          >
            <navitem.icon size={24} className="text-inherit" />
            <span className="py-2">{navitem.title}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
