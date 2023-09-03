import clsx from "clsx";
import {
  GraduationCap,
  LayoutDashboard,
  LucideIcon,
  Presentation,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type SidebarProps = {
  navigations: { title: string; path: string; icon: LucideIcon }[];
};

function Sidebar({ navigations }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col h-screen max-w-lg py-6 space-y-12 bg-background">
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
    </aside>
  );
}

export default Sidebar;
