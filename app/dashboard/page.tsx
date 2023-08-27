"use client";

import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Menu } from "lucide-react";
import React from "react";

function Dashboard() {
    useAuth({ middleware: "auth" });

    return (
        <section className="grid w-full grid-cols-12">
            <div className="col-span-2">
                <Sidebar />
            </div>
            <div className="col-span-10">
                <header className="flex px-8 py-4 bg-background item-center">
                    <Button size={'sm'} variant={'secondary'}>
                        <Menu size={18} />
                    </Button>
                    <Avatar className="ml-auto">
                        <AvatarImage
                            className="w-8 h-8 rounded-full"
                            src="https://github.com/shadcn.png"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </header>
            </div>
        </section>
    );
}

export default Dashboard;
