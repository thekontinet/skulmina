import React, { MouseEventHandler, useState } from "react";
import { Button } from "../ui/button";
import { LogOut, Menu, Settings } from "lucide-react";
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

type NavbarProps = {
  logout?: () => void;
  collapse: MouseEventHandler<HTMLButtonElement>;
  user?: UserCredentials;
};

const Navbar = ({ logout, collapse, user }: NavbarProps) => {
  return (
    <div className="w-full relative">
      <header className="flex px-8 py-4 bg-background item-center">
        <Button onClick={collapse} size={"sm"} variant={"secondary"}>
          <Menu size={18} />
        </Button>
        <div className="ml-auto">
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
              {logout && (
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => logout()}
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
