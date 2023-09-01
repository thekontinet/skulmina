import React from "react";
import { Button } from "@/components/ui/button";
import { ExamType } from "@/types";
import Link from "next/link";

const ExaminationCard = ({
  id,
  title,
  numberOfQuestions,
  time_limit,
  start_date,
  end_date,
  status,
  role,
}: ExamType) => {
  return (
    <div className="py-8 px-6 bg-background flex justify-between flex-col space-y-5 w-full max-w-[450px] rounded-md">
      <h3 className="text-xl">{title}</h3>
      <div className="space-y-1 text-sm">
        <p>Questions: {role === "teacher" ? "Not set" : numberOfQuestions}</p>
        <p>Minutes: {time_limit}</p>
        {status ? (
          <div className="space-y-1">
            <p>Start: {start_date}</p>
            <p>End: {end_date}</p>
          </div>
        ) : (
          <p>Ended</p>
        )}
      </div>
      {role === "teacher" ? (
        <Button className="w-full">
          <Link href={`/examinations/${id}`}>Edit</Link>
        </Button>
      ) : (
        <div>
          {status ? (
            <Button className="w-full">
              <Link href={`/examinations/${id}`}>Start Examination</Link>
            </Button>
          ) : (
            <Button className="w-full">
              <Link href={`/examinations/result/${id}`}>See Result </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ExaminationCard;
