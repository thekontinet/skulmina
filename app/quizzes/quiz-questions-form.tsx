"use client";

import QuestionForm from "@/components/question/question-form";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import notify from "@/lib/notify";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createQuizQuestions, deleteQuizQuestion } from "./actions";
import { useRouter } from "next/navigation";
import { TQuiz } from "@/model/quiz";
import { QuestionFormSchema, TQuestion, TQuestionForm } from "@/model/question";

const initialData = {
  questions: [
    {
      description: "",
      options: [],
    },
  ],
};

type QuizQuestionForm = {
  quiz: TQuiz;
};

function QuizQuestionForm({ quiz }: QuizQuestionForm) {
  const router = useRouter();

  const {
    storedValue: localStorageQuestion,
    setValue: setLocalStorageQuestion,
    removeValue: removeLocalStorageQuestion,
  } = useLocalStorage<TQuestion[]>(`question-${quiz.id}`);

  const form = useForm<TQuestionForm>({
    resolver: zodResolver(QuestionFormSchema),
    defaultValues: async () => {
      const initialQuestions: TQuestionForm = {
        questions: [
          ...quiz.questions,
          ...Array.from(localStorageQuestion || []),
        ],
      };

      return initialQuestions;
    },
  });

  // Autosave form state while form is changing
  useEffect(() => {
    const subscription = form.watch((value) => {
      const saveValue = value?.questions?.filter((q) => !q?.id);
      setLocalStorageQuestion(saveValue as TQuestion[]);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const onSubmit = async (data: TQuestionForm) => {
    await notify.withPromise(createQuizQuestions(quiz.id, data));
    removeLocalStorageQuestion();
    router.replace("/quizzes");
  };

  const deleteQuestion = async (id: number | string) => {
    await notify.withPromise(deleteQuizQuestion(id));
  };
  return (
    <div>
      <div className="flex items-center">
        <Button
          disabled={form.formState.isSubmitting}
          onClick={form.handleSubmit(onSubmit)}
          className="ml-auto"
          size={"sm"}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader size={14} className="animate-spin" />
              <span>Please Wait</span>
            </>
          ) : (
            <>
              <Save size={14} className="mr-2" />
              <span>Save</span>
            </>
          )}
        </Button>
      </div>

      <QuestionForm form={form} onDelete={deleteQuestion} />
    </div>
  );
}

export default QuizQuestionForm;
