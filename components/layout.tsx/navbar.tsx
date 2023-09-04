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

type NavbarProps = {
  logout?: () => void;
  user?: UserCredentials;
};

const Navbar = ({ logout, user }: NavbarProps) => {
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
