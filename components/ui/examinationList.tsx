import React from "react";
import ExaminationCard from "./examination";
import { ExamType } from "@/types";

function ExaminationList({ exams }: { exams: ExamType[] }) {
  return (
    <>
      {exams.length < 1 && <div>no exam</div>}
      {exams.map((exam: ExamType) => (
        <ExaminationCard {...exam} />
      ))}
    </>
  );
}

export default ExaminationList;
