import request from "@/services/Api/base";

export const login = async (data: { email: string; password: string }) =>
    (await request.post("/login", data)).data;

export const getAuthUser = async () =>
    (await request.get("/user")).data;
