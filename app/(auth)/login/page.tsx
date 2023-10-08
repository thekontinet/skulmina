"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import z from "zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { login } from "./action";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { loginSchema } from "@/model/user";

/**
 * Quizzes Page Component
 * TODO: Add Sorting, Filter and Search to quiz table
 */

function Page() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signIn = async (formdata: FormData) => {
    const response = await login(formdata);

    if (!response?.errors) {
      redirect("/dashboard");
      return;
    }

    response.errors.map(({ path, message }) =>
      form.setError(path, { message })
    );
  };

  return (
    <div className="grid h-screen place-items-center">
      <div className="w-full max-w-xl">
        <Card className="p-8">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to login</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form action={signIn}>
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email">Email</Label>
                      <Input {...field} placeholder="Email Address" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Password"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="mt-4" size={"sm"}>
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <p className="ml-auto text-xs">
              Powered By <strong>Skulmina</strong>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Page;
