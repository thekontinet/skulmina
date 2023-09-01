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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ExamFrom } from "@/types";
import React, { useState } from "react";
import httpClient from "@/lib/httpClient";
import axios from "axios";

const CreateExaminatioForm = () => {
  const [isopen, setIsopen] = useState<boolean>(false);
  const [errors, setErrors] = useState<ExamFrom | null>();
  const [form, setForm] = useState<ExamFrom>({
    title: "",
    description: "",
    time_limit: 1,
    start_date: "",
    end_date: "",
  });

  const handleFormUpdate = (n: string, v: string) => {
    setForm((prevForm) => ({ ...prevForm, [n]: v }));
  };

  // submit request

  const createExam = () => {
    setErrors(null);
    httpClient
      .post("examinations", form)
      .then((response) => {
        setIsopen(false);
        setForm({
          title: "",
          description: "",
          time_limit: 1,
          start_date: "",
          end_date: "",
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
      <Button className="h-fit" onClick={() => setIsopen(!isopen)}>
        Create Examination
      </Button>
      <DialogContent className="p-4">
        <DialogHeader>
          <DialogTitle>Create a New Examination</DialogTitle>
        </DialogHeader>
        <form action="#" className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              onChange={(e) => handleFormUpdate("title", e.target.value)}
              type="text"
              id="title"
              name="title"
              value={form.title}
              placeholder="Web Desgin"
            />
            <span className="text-xs text-red-500">{errors?.title}</span>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              onChange={(e) => handleFormUpdate("description", e.target.value)}
              id="description"
              name="description"
              value={form.description}
              placeholder="Please enter examination description"
            />
            <span className="text-xs text-red-500">{errors?.description}</span>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timelimit">Time Limit</Label>
            <Input
              onChange={(e) => handleFormUpdate("time_limit", e.target.value)}
              type="number"
              id="timelimit"
              name="time_limit"
              value={form.time_limit}
              placeholder="Set a time limit (eg: 16 or 30)"
            />
            <span className="text-xs text-red-500">{errors?.time_limit}</span>
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              onChange={(e) => handleFormUpdate("start_date", e.target.value)}
              type="date"
              id="startDate"
              value={form.start_date}
              name="start_date"
            />
            <span className="text-xs text-red-500">{errors?.start_date}</span>
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              onChange={(e) => handleFormUpdate("end_date", e.target.value)}
              type="date"
              id="endDate"
              value={form.end_date}
              name="end_date"
            />
            <span className="text-xs text-red-500">{errors?.end_date}</span>
          </div>
        </form>
        <DialogFooter className="mt-4">
          <Button onClick={() => createExam} className="w-full">
            Create Examination
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExaminatioForm;
