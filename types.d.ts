export type UserCredentials = {
  name: string;
  email: string;
  password: string;
};

export type LoginCredentials = Pick<UserCredentials, "email" | "password">;

export type LoginCredentialsError = {
  email: string[] | undefined;
  password: string[] | undefined;
};

export type ExamType = {
  id: number;
  title: string;
  numberOfQuestions: string;
  duration: number;
  description?: string;
  status: boolean;
};

export type AccountType = {
  name: string;
  email: string;
  password: string;
  role: string[];
};
