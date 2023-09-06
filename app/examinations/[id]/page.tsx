"use client";

import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import QuestionForm from "@/components/question/question-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { getQuizzes } from "@/src/api/quiz";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import useSwr from "swr";

function page() {
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const { data: quiz, isLoading } = useSwr(["quiz", id], () =>
    getQuizzes(id as string)
  );
  return (
    <DashboardLayout>
      <Card className="py-4">
        <CardContent>
          <CardTitle>{quiz?.data.title}</CardTitle>
          <Typography variant="small">
            <Typography variant="strong">Publish Date:</Typography>
            <Typography as="span">{quiz?.data.published_at}</Typography>
          </Typography>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardContent className=" space-y-4">
          {" "
            .repeat(count)
            .split("")
            .map(() => (
              <QuestionForm />
            ))}
        </CardContent>
      </Card>
      <Button
        onClick={() => setCount(count + 1)}
        variant={"outline"}
        className="w-full mt-4"
      >
        <Plus size={12} />
      </Button>
    </DashboardLayout>
  );
}

export default page;
