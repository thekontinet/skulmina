import httpClient from "@/lib/httpClient";
import { AccountType, LoginCredentials, LoginCredentialsError } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

type LoginArgs = {
  setErrors: React.Dispatch<
    React.SetStateAction<LoginCredentialsError | undefined>
  >;
  data: LoginCredentials;
};

type UseAuthArgs = {
  middleware: "auth" | "guest";
  redirectIfAuthenticated?: string | undefined;
};

function useAuth({ middleware, redirectIfAuthenticated }: UseAuthArgs) {
  const router = useRouter();
  const getAuthUser = () =>
    httpClient.get("/user").then((res) => res.data.data);

  const {
    data: user,
    error,
    mutate,
  } = useSWR<AccountType>("/api/user", getAuthUser);

  const login = async ({ setErrors, data }: LoginArgs) => {
    setErrors(undefined);
    httpClient
      .post("/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.auth_token);
        mutate();
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error?.response?.status !== 422)
          throw error;

        setErrors(error.response.data.errors);
      });
  };

  const logout = async () => {
    if (!error) {
      await httpClient.post("/logout").then(() => mutate());
    }

    window.location.pathname = "/login";
  };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated);
    if (
      window.location.pathname === "/verify-email" &&
      user?.email_verified_at &&
      redirectIfAuthenticated
    )
      router.push(redirectIfAuthenticated);
    if (middleware === "auth" && error) logout();
  }, [user, error]);

  return { user, login, logout };
}

export default useAuth;
