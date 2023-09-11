import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardContent } from "../ui/card";
import { Edit3, PlusIcon, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import ConfirmButton from "../widget/confirm-button";
import Question from "@/app/questions/page";
import { Checkbox } from "../ui/checkbox";
import { QuestionType } from "@/types";
import { useRouter } from "next/navigation";
import { deleteQuestion } from "@/src/api/question";
import Link from "next/link";




function QuestionTable({questions}: {questions:QuestionType[]}) {

  const router = useRouter();

  const handleDelete = (id: number | string) => {
    deleteQuestion(id).then((res) => router.push("/questions"))
}

  return (
    <Card>
      <CardContent>
        <Table className="mt-5">
          <TableCaption>A list of questions.</TableCaption>
          <TableHeader className="font-bold uppercase tracking-widest">
            <TableRow>
              <TableHead  className="flex items-center justify-start gap-3">
                ID <ConfirmButton>
                  <PlusIcon size={14}/> bulk action
                </ConfirmButton>
              </TableHead>

              <TableHead>Question</TableHead>
              <TableHead className="text-right">Delete | Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions && questions.map(({ id, description }) => (
              <>
                <TableRow>
                  <TableCell className="flex items-center gap-1">
                    <Checkbox /> {id}
                  </TableCell>

                  <TableCell>{description}</TableCell>
                  <TableCell className="flex items-center justify-end gap-2">
                    <ConfirmButton onConfirm={() => handleDelete(id)} variant="destructive">
                      <Trash2 size={14} />
                    </ConfirmButton>

                    <Link href={`/questions/${id}`}>
                      <Edit3 size={14} />
                    </Link>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default QuestionTable;
