"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState } from "react";
import httpClient from "@/lib/httpClient";
import axios from "axios";
import { AccountType } from "@/types";

const CreateUserForm = () => {
  const [isopen, setIsopen] = useState<boolean>(false);
  const [errors, setErrors] = useState<AccountType | null>();
  const [form, setForm] = useState<AccountType>({
    name: "",
    email: "",
    password: "",
    role: [""],
  });

  const handleFormUpdate = (n: string, v: string) => {
    setForm((prevForm) => ({ ...prevForm, [n]: v }));
  };

  // sunbmit request
  const createUser = () => {
    setErrors(null);
    httpClient
      .post("register", form)
      .then((response) => {
        setIsopen(false);
        setForm({
          name: "",
          email: "",
          password: "",
          role: [""],
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error?.response?.status !== 422)
          throw error;

        setErrors(error.response.data.errors);
      });
  };
  return (
    <Dialog open={isopen} onOpenChange={() => setIsopen(!isopen)}>
      <DialogTrigger className="h-fit">
        <Button>Create Account</Button>
      </DialogTrigger>
      <DialogContent className="p-4">
        <DialogHeader>
          <DialogTitle>Create a New Account</DialogTitle>
        </DialogHeader>
        <form action="#" className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              onChange={(e) => handleFormUpdate("name", e.target.value)}
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
            />
            <span className="text-xs text-red-500">{errors?.name}</span>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              onChange={(e) => handleFormUpdate("email", e.target.value)}
              type="text"
              id="email"
              name="email"
              placeholder="john@example.com"
            />
            <span className="text-xs text-red-500">{errors?.email}</span>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              onChange={(e) => handleFormUpdate("password", e.target.value)}
              type="password"
              id="passowrd"
              name="password"
              placeholder="***********"
            />
            <span className="text-xs text-red-500">{errors?.password}</span>
          </div>
          <div>
            <Select onValueChange={(v) => handleFormUpdate("role", v)}>
              <SelectTrigger className="w-full">
                <SelectValue
                  onChange={() => alert("hello")}
                  placeholder="Select Role"
                />
              </SelectTrigger>
              <SelectContent id="role">
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-xs text-red-500">{errors?.role}</span>
          </div>
        </form>
        <DialogFooter className="mt-4">
          <Button onClick={() => createUser()} className="w-full">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserForm;
