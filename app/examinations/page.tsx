"use client";

import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import ExaminationCard from "@/components/examination/examination-card";
import { ApiResponse, ExamType } from "@/types";
import { useState } from "react";
import ExaminatioForm from "./examination-form";
import { deleteExam, getExam } from "@/src/api/examination";
import useSwr from "swr";
import ExamCardSkeleton from "./skeleton";
import { Button } from "@/components/ui/button";

const Examinations = () => {
  const [exam, setExam] = useState<ExamType | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: exams,
    mutate,
    isLoading,
  } = useSwr<ApiResponse<ExamType[]>>("exams", () => getExam());

  const openForm = (data: ExamType | null) => {
    setExam(data);
    setIsOpen(true);
  };

  const handleDelete = async (id: string | number) => {
    await deleteExam(id);
    mutate();
  };

  const handleEdit = async (id: string | number) => {
    const res = await getExam(id);
    openForm(res.data);
  };

  return (
    <DashboardLayout>
      <ExaminatioForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        initialValues={exam}
      />
      <section className="p-4 md:px-12 md:py-8 w-full">
        <div className="space-y-4">
          <div className="flex justify-between">
            <h1>All Examinations</h1>
            <Button className="h-fit" onClick={() => openForm(null)}>
              Create Examination
            </Button>
          </div>
          <div className="grid gap-2 md:grid-cols-3 w-full">
            {isLoading && <ExamCardSkeleton count={6} />}
            {exams?.data?.map((exam) => (
              <ExaminationCard
                exam={exam}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Examinations;
