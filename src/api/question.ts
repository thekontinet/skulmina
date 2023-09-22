import httpClient from "@/lib/httpClient";
import { TQuestionForm } from "@/model/question";

export async function createQuestion(data: Record<string, any>) {
  return (await httpClient.post("/questions", data)).data;
}

export async function createManyQuestions(
  data: TQuestionForm,
  id?: string | number
) {
  const transformedData = data.questions.map((question) => ({
    description: question.description,
    options: question?.options
      .filter((op) => !op.is_correct)
      .map((d) => d.value),
    answers: question.options.filter((op) => op.is_correct).map((d) => d.value),
    examination_id: id,
  }));

  return await Promise.allSettled(
    transformedData.map((question) => createQuestion(question))
  );
}

export async function getQuestions(
  id?: string | number,
  config?: Record<string, any>
) {
  const questionId = id ? `/${id}` : "";
  const page = config?.page ? "?page=" + config.page : "";
  return (await httpClient.get("/questions" + questionId + page)).data;
}

export async function deleteQuestion(id?: string | number) {
  const questionId = id ? `/${id}` : "";
  return (await httpClient.delete("/questions" + questionId)).data;
}
