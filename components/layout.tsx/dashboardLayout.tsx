"use client";

import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, Menu, Settings } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Navbar from "./navbar";
import clsx from "clsx";
import { log } from "console";

const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  const [display, setDisplay] = useState("w-0");
  const { logout } = useAuth({ middleware: "guest" });

  const collaspe = () => {
    if (display == "w-0") {
      setDisplay("w-full");
    } else {
      setDisplay("w-0");
    }
  };

  return (
    <div className="overflow-hidden">
      <main className="flex">
        <div
          className={clsx(
            "overflow-hidden transition-[width] max-w-[250px]",
            display
          )}
        >
          <Sidebar />
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
