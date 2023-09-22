import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { ArrowLeft } from "lucide-react";
import React from "react";
import UserForm from "../user-form";
import Link from "next/link";

type Props = {};

function page({}: Props) {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between py-4">
        <Typography variant="h4">Create New Account</Typography>
        <Link href={"/accounts"}>
          <Button variant={"outline"} size={"sm"}>
            <ArrowLeft size={20} className="mr-2" /> Go Back
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardDescription>
            Complete the form to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <UserForm />
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

export default page;
