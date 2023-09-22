"use server";

import axios from "@/lib/axios";
import { handleValidationError } from "@/lib/axios";
import { QuestionFormSchema } from "@/model/question";
import { quizFormSchema } from "@/model/quiz";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const getAllQuiz = async () => {
  return (await axios.get(`examinations`)).data;
};

export const getQuiz = async (id: string | number) => {
  return (await axios.get(`examinations/${id}`)).data?.data;
};

export const createQuiz = async (data: z.infer<typeof quizFormSchema>) => {
  await axios.post(`examinations`, data);
  revalidatePath(`examinations`);
};

export const updateQuiz = async (
  id: number | string,
  data: z.infer<typeof quizFormSchema>
) => {
  await axios.put(`examinations/${id}`, data);
  revalidatePath(`examinations/${id}`);
};

export const deleteQuiz = async (id: number | string) => {
  await axios.delete(`examinations/${id}`);
  revalidatePath(`examinations/${id}`);
};

export const deleteQuizQuestion = async (id: string | number) => {
  await axios.delete(`/questions/${id}`);
  revalidatePath(`/quizzes`);
};

export const createQuizQuestions = async (
  quizId: number | string,
  data: z.infer<typeof QuestionFormSchema>
) => {
  const transformedData = data.questions.map((question) => ({
    id: question.id,
    description: question.description,
    options: question?.options
      .filter((op) => !op.is_correct)
      .map((d) => d.value),
    answers: question.options.filter((op) => op.is_correct).map((d) => d.value),
    examination_id: quizId,
  }));

  await Promise.allSettled(
    transformedData.map((question) => {
      if (question.id) {
        return axios.put(`/questions/${question.id}`, question);
      }
      return axios.post("/questions", question);
    })
  );

  revalidatePath(`/quizzes/${quizId}`);
};
