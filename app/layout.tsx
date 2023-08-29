import clsx from "clsx";
import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
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

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skulmina",
  description: "School Management App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={clsx([font.className, "bg-secondary text-foreground dark"])}
      >
        {children}
      </body>
    </html>
  );
}
