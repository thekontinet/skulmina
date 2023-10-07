import httpClient from "@/lib/httpClient";

export async function getCourses(id: string | number) {
  const courseId = id ? `/${id}` : "";
  return (await httpClient.get("/courses" + courseId)).data;
}

export async function createCourse(data: Record<string, any>) {
  return (await httpClient.post("/courses", data)).data;
}

export async function updateCourse(
  id: string | number,
  data: Record<string, any>
) {
  const coursesId = id ? `/${id}` : "";
  return (await httpClient.put("/courses" + coursesId, data)).data;
}

export async function deleteCourse(id: string | number) {
  const coursesId = id ? `/${id}` : "";
  return (await httpClient.delete("/courses" + coursesId)).data;
}
