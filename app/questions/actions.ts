"use server";

import axios from "@/lib/axios";
import { TQuestion } from "@/model/question";
import { revalidatePath } from "next/cache";

export const getAllQuestions = async () => {
  return (await axios.get("questions")).data;
};

export const getQuestion = async (id: string | number) => {
  return (await axios.get(`questions/${id}`)).data;
};

export const updateQuestion = async (id: number | string, data: TQuestion) => {
  const question = {
    description: data.description,
    options: data?.options.filter((op) => !op.is_correct).map((d) => d.value),
    answers: data.options.filter((op) => op.is_correct).map((d) => d.value),
  };
  await axios.put(`/questions/${id}`, question);
  revalidatePath(`/quizzes/${id}`);
};

export const deleteQuestion = async (id: string | number) => {
  await axios.delete(`/questions/${id}`);
  revalidatePath(`/questions`);
};
