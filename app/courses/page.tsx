import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import { Input } from "@/components/ui/input";
import { Table, TableHead, TableHeader } from "@/components/ui/table";
import Typography from "@/components/ui/typography";
import React from "react";
import CourseList from "./course-list";

/**
 * Courses Page Component
 * TODO: Create the couse list page with deletion and editing feature
 * TODO: Add Sorting, Filter and Searach
 */

type Props = {};

function page({}: Props) {
  const courses = [
    { id: "1", title: "HTML", teacherId: "001" },
    { id: "2", title: "CSS", teacherId: "013"},
  ];
  return (
    <DashboardLayout>
      <header className="flex-row items-center py-4">
        <Typography variant="h4">Courses</Typography>
      </header>
      <CourseList courses={courses}/>
    </DashboardLayout>
  );
}

export default page;
