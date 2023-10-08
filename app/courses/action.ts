"use server";

import axios from "@/lib/axios";
import { revalidatePath } from "next/cache";

export const getAllCourses = async () => {
  return (await axios.get("/courses")).data?.data;
};

export const deleteQuestion = async (id: string | number) => {
  await axios.delete(`/questions/${id}`);
  revalidatePath(`/questions`);
};
