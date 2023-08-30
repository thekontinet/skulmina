"use client";

import Sidebar from "@/components/sidebar";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import Navbar from "./navbar";
import clsx from "clsx";

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
    return <h1>loading</h1>;
  }

  console.log("user", user);

  return (
    <div className="">
      <main className="flex">
        <div className={clsx("transition-[width] max-w-[250px]", display)}>
          <Sidebar role={user.roles[0]} />
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
