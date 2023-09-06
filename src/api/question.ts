import httpClient from "@/lib/httpClient";

export async function createQuestion(data: Record<string, any>) {
  return (await httpClient.post("/questions", data)).data;
}
