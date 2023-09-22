import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { UseFormSetError } from "react-hook-form";
import { ZodError } from "zod";

const httpClient = axios.create({
  baseURL: process.env.API_ENPOINT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

httpClient.interceptors.request.use(function (config) {
  return config;
});

export const handleValidationError = (error: ZodError) => {
  const err = error.errors.map((error) => ({
    path: error.path.at(0) as string,
    message: error.message,
  }));

  return { errors: err };
};

export default httpClient;
