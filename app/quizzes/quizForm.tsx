"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { TQuiz, quizFormSchema } from "@/model/quiz";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { updateQuiz } from "./actions";
import notify from "@/lib/notify";
import { createQuiz } from "@/app/quizzes/actions";
import { redirect, useRouter } from "next/navigation";
import { Select } from "@/components/ui/select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Quiz Form Component
 * TODO: Make each quiz form collapsible
 */

type EditExamProps = {
  quiz?: TQuiz;
  courses?: Record<string, string>[];
};

function QuizForm({ quiz, courses }: EditExamProps) {
  const router = useRouter();
  const defaultValues = !quiz
    ? {}
    : {
        ...quiz,
        published_at: moment(quiz?.published_at).format("yyyy-MM-DD hh:mm:ss"),
      };

  const form = useForm<z.infer<typeof quizFormSchema>>({
    resolver: zodResolver(quizFormSchema),
    defaultValues,
  });

  const saveExam = async (data: z.infer<typeof quizFormSchema>) => {
    const request = quiz ? updateQuiz(quiz.id, data) : createQuiz(data);
    await notify.withPromise(request);
    router.replace("/quizzes");
  };

  return (
    <form onSubmit={form.handleSubmit(saveExam)}>
      <Form {...form}>
        <FormField
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Quiz Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between gap-4">
          {courses && (
            <FormField
              name="course_id"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Course</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="overflow-hidden">
                          <SelectValue placeholder="Select a Course" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {courses.map((course) => (
                            <SelectItem
                              key={course.id}
                              value={course.id.toString()}
                            >
                              {course.title}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            name="time_limit"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Time (in seconds)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Total quiz time in seconds"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="published_at"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Publish Date</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none min-h-[250px]"
                  placeholder="Write your instructions here"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
      <Button className="mt-4" disabled={form.formState.isSubmitting}>
        Save
      </Button>
    </form>
  );
}

export default QuizForm;
