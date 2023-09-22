"use server";

import axios from "@/lib/axios";

export const getAllCourses = async () => {
  return (await axios.get("/courses")).data?.data;
};
