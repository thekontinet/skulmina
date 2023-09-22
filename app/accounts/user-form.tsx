"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userSchema } from "@/model/user";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createUser } from "./actions";
import notify from "@/lib/notify";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

type Props = {};

type TForm = z.infer<typeof userSchema>;

function UserForm({}: Props) {
  const ROLES = ["student", "teacher"];

  const form = useForm<TForm>({
    resolver: zodResolver(userSchema),
  });

  const router = useRouter();

  const createAccount = async (data: TForm) => {
    notify.withPromise(createUser(data));
    router.replace("/accounts");
  };

  return (
    <form onSubmit={form.handleSubmit(createAccount)}>
      <Form {...form}>
        <FormField
          name="role"
          render={({ field }) => (
            <FormItem {...field}>
              <FormLabel htmlFor={field.name}>Account Role</FormLabel>
              <Select onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Account Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="" disabled>
                    SELECT ROLE
                  </SelectItem>
                  {ROLES.map((role) => (
                    <SelectItem key={role.replace(" ", "-")} value={role}>
                      {role.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem {...field}>
              <FormLabel htmlFor={field.name}>Name</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Email</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Password</FormLabel>
              <Input type="password" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
      <Button className="mt-4">Save</Button>
    </form>
  );
}

export default UserForm;
