import httpClient from "@/lib/httpClient";

export async function createQuestion(data: Record<string, any>) {
  return (await httpClient.post("/questions", data)).data;
}
export async function getQuestions(id?: string | number) {
  const questionId = id ? `/${id}`: "";
  return (await httpClient.get("/questions" + questionId)).data;
}
export async function deleteQuestion(id?: string | number) {
  const questionId = id ? `/${id}`: "";
  return (await httpClient.delete("/questions" + questionId)).data;
}
