"use client";

import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import ExaminationCard from "@/components/ui/examination";
import useAuth from "@/hooks/useAuth";
import httpClient from "@/lib/httpClient";
import { ExamType } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import CreateExaminatioForm from "./createExaminationForm";

const Examinations = () => {
  const { user } = useAuth({ middleware: "auth" });
  // const [errors, setErrors] = useState<ExamType | null>();
  // const [exams, setExams] = useState<ExamType[]>([]);

  // useEffect(() => {
  //   fetchExams();
  // }, []);

  // test array (to be dleted before production)

  const Exams: ExamType[] = [
    {
      id: 1,
      title: "Web Desgin (Introduction to HTML)",
      numberOfQuestions: "12",
      time_limit: 45,
      status: true,
      start_date: "05/04/2023",
      end_date: "07/04/2023",
    },
    {
      id: 6,
      title: "Web Desgin (Introduction to HTML)",
      numberOfQuestions: "12",
      time_limit: 45,
      status: true,
      start_date: "05/04/2023",
      end_date: "07/04/2023",
    },
    {
      id: 7,
      title: "Web Desgin (Introduction to HTML)",
      numberOfQuestions: "12",
      time_limit: 45,
      status: true,
      start_date: "05/04/2023",
      end_date: "07/04/2023",
    },
    {
      id: 2,
      title: "Web Desgin (Introduction to JavaScript)",
      numberOfQuestions: "12",
      time_limit: 45,
      status: false,
      start_date: "05/04/2023",
      end_date: "07/04/2023",
    },
    {
      id: 3,
      title: "UI/UX",
      numberOfQuestions: "12",
      time_limit: 45,
      status: true,
      start_date: "05/04/2023",
      end_date: "07/04/2023",
    },
    {
      id: 4,
      title: "Web Development (Introduction to Node.js)",
      numberOfQuestions: "12",
      time_limit: 45,
      status: false,
      start_date: "05/04/2023",
      end_date: "07/04/2023",
    },
  ];

  // fetch exams

  // const fetchExams = () => {
  //   setErrors(null);
  //   httpClient
  //     .get("examinations")
  //     .then((response) => {
  //       setExams(response.data.data);
  //     })
  //     .catch((error) => {
  //       if (axios.isAxiosError(error) && error?.response?.status !== 422)
  //         throw error;

  //       setErrors(error.response.data.errors);
  //     });
  // };

  if (!user) return <p>loading...</p>;

  return (
    <DashboardLayout>
      <section className="p-4 md:px-12 md:py-8 w-full ">
        {user.roles[0] === "teacher" ? (
          <div className="space-y-4">
            <div className="flex justify-between">
              <h1>All Examinations</h1>
              <CreateExaminatioForm />
            </div>
            <div className="grid gap-2 md:grid-cols-3 w-full">
              {Exams.length < 1 && <div>no exam</div>}
              {Exams.map((exam) => {
                if (exam.status) {
                  return (
                    <ExaminationCard
                      key={exam.id}
                      id={exam.id}
                      start_date={exam.start_date}
                      end_date={exam.end_date}
                      title={exam.title}
                      time_limit={exam.time_limit}
                      status={exam.status}
                      role={user.roles[0]}
                    />
                  );
                }
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between">
              <h1>Available Examinations</h1>
            </div>
            <div className="grid gap-2 md:grid-cols-3 w-full">
              {Exams.length < 1 && <div>no exam</div>}
              {Exams.map((exam) => {
                if (exam.status) {
                  return (
                    <ExaminationCard
                      key={exam.id}
                      id={exam.id}
                      start_date={exam.start_date}
                      end_date={exam.end_date}
                      title={exam.title}
                      time_limit={exam.time_limit}
                      status={exam.status}
                      role={user.roles[0]}
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
                      start_date={exam.start_date}
                      end_date={exam.end_date}
                      title={exam.title}
                      time_limit={exam.time_limit}
                      status={exam.status}
                      role={user.roles[0]}
                    />
                  );
                }
              })}
            </div>
          </div>
        )}
      </section>
    </DashboardLayout>
  );
};

export default Examinations;
