"use client";

import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Questions } from "@/src/constant";

const ids: number[] = Questions.reduce<number[]>((p, c) => [...p, c.id], []);

const StartPage = () => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});

  const currentId = ids[index];
  const question = Questions[currentId];

  function updateQuestion(index: number) {
    setIndex(index);
  }

  function updateOption(value: string) {
    setAnswers((prev) => ({
      ...prev,
      [currentId]: value,
    }));
  }

  return (
    <DashboardLayout>
      <section className="w-full flex overflow-hidden h-full justify-between ">
        <div className="p-12 ">
          <p className="text-2xl font-bold">{question.description}</p>
          <div className="space-y-4 py-4">
            {question.options.map((option, index) => {
              return (
                <div key={`${question.id}-${index}`}>
                  <input
                    className="peer"
                    type="radio"
                    name="option"
                    id={`option-${index}`}
                    checked={answers[currentId] === option.value}
                    onChange={() => updateOption(option.value)}
                    hidden
                  />
                  <label
                    className="block max-w-sm peer-checked:bg-primary p-4 rounded-sm border border-primary"
                    htmlFor={`option-${index}`}
                  >
                    {option.value}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        {/* ------------ */}
        {/* sidebar */}
        {/* ------------- */}
        <div className="md:px-8 md:py-4 md:min-w-[250px] bg-background flex flex-col text-center ">
          <h1 className="flex items-center justify-end text-xl font-semibold space-x-2">
            Timer :<span className="md:text-4xl font-bold ml-4"> 2:03</span>
          </h1>
          <h1 className="mt-8">Questions</h1>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {ids.map((num, index) => (
              <Button
                key={num}
                onClick={() => updateQuestion(index)}
                variant={
                  answers[num]
                    ? "default"
                    : num === currentId
                    ? "outline"
                    : "secondary"
                }
              >
                {num}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default StartPage;
