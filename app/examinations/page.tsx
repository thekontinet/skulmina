"use client";

import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import ExaminationCard from "@/components/ui/examination";
import useAuth from "@/hooks/useAuth";
import { ExamType } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Menu } from "lucide-react";
import Link from "next/link";
import { type } from "os";
import { useState } from "react";

const Examinations = () => {
  useAuth({ middleware: "guest" });

  const [display, setDisplay] = useState("none");
  const [isOpen, setIsOpen] = useState(false);

  const clooaspe = () => {
    if (display == "none") {
      setDisplay("block");
    } else {
      setDisplay("none");
    }
  };

  //   array of test exmas

  const Exams: ExamType[] = [
    {
      id: 1,
      title: "Web Desgin (Introduction to HTML)",
      numberOfQuestions: "12",
      duration: 45,
      status: true,
    },
    {
      id: 6,
      title: "Web Desgin (Introduction to HTML)",
      numberOfQuestions: "12",
      duration: 45,
      status: true,
    },
    {
      id: 7,
      title: "Web Desgin (Introduction to HTML)",
      numberOfQuestions: "12",
      duration: 45,
      status: true,
    },
    {
      id: 2,
      title: "Web Desgin (Introduction to JavaScript)",
      numberOfQuestions: "12",
      duration: 45,
      status: false,
    },
    {
      id: 3,
      title: "UI/UX",
      numberOfQuestions: "12",
      duration: 45,
      status: true,
    },
    {
      id: 4,
      title: "Web Development (Introduction to Node.js)",
      numberOfQuestions: "12",
      duration: 45,
      status: false,
    },
  ];

  return (
    <DashboardLayout>
      <section className="p-4 md:px-12 md:py-8 w-full ">
        <div className="space-y-4">
          <h1>Available Examinations</h1>
          <div className="grid gap-2 md:grid-cols-3 w-full">
            {Exams.length < 1 && <div>no exam</div>}
            {Exams.map((exam) => {
              if (exam.status) {
                return (
                  <ExaminationCard
                    key={exam.id}
                    id={exam.id}
                    title={exam.title}
                    duration={exam.duration}
                    numberOfQuestions={exam.numberOfQuestions}
                    status={exam.status}
                  />
                );
              }
            })}
          </div>
          <h1>Recently Finished</h1>
          <div className="grid gap-2 md:grid-cols-3  w-full">
            {Exams.map((exam) => {
              if (!exam.status) {
                return (
                  <ExaminationCard
                    key={exam.id}
                    id={exam.id}
                    title={exam.title}
                    duration={exam.duration}
                    numberOfQuestions={exam.numberOfQuestions}
                    status={exam.status}
                  />
                );
              }
            })}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Examinations;
