"use server";

import axios, { handleValidationError } from "@/lib/axios";
import { TUser, loginSchema } from "@/model/user";
import { AxiosError, isAxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

export const login = async (form: FormData) => {
  try {
    const result = loginSchema.safeParse({
      email: form.get("email"),
      password: form.get("password"),
    });

    if (!result.success) {
      return handleValidationError(result.error);
    }

    const response = await axios.post("/login", form);
    cookies().set("token", response.data.auth_token);
  } catch (error) {
    if (!isAxiosError(error)) return console.log(error);

    console.log(error.response?.data);
  }
};

export const signOut = async () => {
  cookies().delete("token");
  return { message: "success" };
};

export const getUser = async () => {
  const res = await axios.get("/user");
  return res.data?.data;
};
