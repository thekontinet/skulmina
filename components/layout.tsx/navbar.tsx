"use client";

import { LogOut, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserCredentials } from "@/types";
import { DarkModeSwitch } from "../ui/darkmode-switch";
import { signOut } from "@/app/(auth)/login/action";
import { useRouter } from "next/navigation";

type NavbarProps = {
  user?: UserCredentials;
};

const Navbar = ({ user }: NavbarProps) => {
  const redirect = useRouter();
  const logout = async () => {
    await signOut();
    redirect.replace("/login");
  };
  return (
    <div className="w-full relative bg-primary">
      <header className="flex px-8 py-4 item-center md:px-4 lg:px-12 mx-auto">
        <div className="ml-auto space-x-4 flex items-center">
          <DarkModeSwitch />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="ml-auto cursor-pointer">
                <AvatarImage
                  className="w-8 h-8 rounded-full"
                  src="https://github.com/shadcn.png"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Settings size={18} className="mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="cursor-pointer">
                <LogOut size={18} className="mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
