import React from "react";
import { Button } from "@/components/ui/button";
import { ExamType } from "@/types";
import Link from "next/link";

const ExaminationCard = ({
  id,
  title,
  numberOfQuestions,
  duration,
  status,
}: ExamType) => {
  return (
    <div className="py-8 px-6 bg-background flex justify-between flex-col space-y-5 w-full max-w-[450px] rounded-md">
      <h3 className="text-xl">{title}</h3>
      <div className="space-y-1 text-sm">
        <p>{numberOfQuestions} questions</p>
        <p>{duration} minutes</p>
      </div>

      {status ? (
        <Button className="flex-end">
          <Link href={`/examinations/exam/${id}`}>Start Examination</Link>
        </Button>
      ) : (
        <Button className="justify-self-end">
          <Link href={`/examinations/result/${id}`}>See Result </Link>
        </Button>
      )}
    </div>
  );
};

export default ExaminationCard;
