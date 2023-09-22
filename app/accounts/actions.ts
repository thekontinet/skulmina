"use server";
import axios from "@/lib/axios";
import { userSchema } from "@/model/user";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const getAuthUser = async () => {
  return (await axios.get("/user")).data;
};

export const createUser = async (data: z.infer<typeof userSchema>) => {
  await axios.post("/users", data);
  revalidatePath("/accounts");
};

export const getAllUsers = async () => {
  return (await axios.get("/users")).data;
};

export const deleteUser = async (id: string | number) => {
  await axios.delete(`/users/${id}`);
  revalidatePath("/accounts");
};
