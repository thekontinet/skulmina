import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import { Input } from "@/components/ui/input";
import { Table, TableHead, TableHeader } from "@/components/ui/table";
import Typography from "@/components/ui/typography";
import React from "react";

/**
 * Courses Page Component
 * TODO: Create the couse list page with deletion and editing feature
 * TODO: Add Sorting, Filter and Searach
 */

type Props = {};

function page({}: Props) {
  const courses = [
    { title: "HTML", teacherId: "001", courseCode: "900" },
    { title: "CSS", teacherId: "013", courseCode: "960" },
  ];
  return (
    <DashboardLayout>
      <header className="flex-row items-center py-4">
        <Typography variant="h4">Courses</Typography>
      </header>
      <Table>
        <TableHeader>
           <TableHead>
            <Input type="checkbox"/>
           </TableHead>
           <TableHead>Course title</TableHead>
           <TableHead>teacher id</TableHead>
           <TableHead>code</TableHead>
        </TableHeader>
      </Table>
    </DashboardLayout>
  );
}

export default page;
