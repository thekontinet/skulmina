import httpClient from "@/lib/httpClient";

export async function createQuiz(data: Record<string, any>) {
  return (await httpClient.post("/examinations", data)).data;
}

export async function getQuizzes(id?: string | number) {
  const examId = id ? `/${id}` : ``;
  return (await httpClient.get("/examinations" + examId)).data;
}

export async function updateQuiz(
  id: string | number,
  data: Record<string, any>
) {
  const examId = id ? `/${id}` : ``;
  return (await httpClient.put("/examinations" + examId, data)).data;
}

export async function deleteQuiz(id: string | number) {
  const examId = id ? `/${id}` : ``;
  return (await httpClient.delete("/examinations" + examId)).data;
}
