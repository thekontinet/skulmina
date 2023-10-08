import Axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { UseFormSetError } from "react-hook-form";
import { ZodError } from "zod";

const axios = Axios.create({
  baseURL: process.env.API_ENPOINT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

axios.interceptors.request.use(function (config) {
  const token = cookies().get("token");
  config.headers["Authorization"] = `Bearer ${token?.value}`;
  return config;
});

export const handleValidationError = <T>(
  error: ZodError<T>
): { errors: { path: keyof T; message: string }[] } => {
  const err: { path: keyof T; message: string }[] = error.errors.map(
    (error) => ({
      path: error.path[0] as keyof T,
      message: error.message,
    })
  );

  return { errors: err };
};

export default axios;
