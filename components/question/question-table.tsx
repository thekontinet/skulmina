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

function QuestionTable() {
  const Questions = [
    {
      id: 1,
      question: "what is HTML?",
    },
    {
      id: 2,
      question: "what is CSS?",
    },
    {
      id: 3,
      question: "what is 2 + 2?",
    },
    {
      id: 4,
      question: "what is JS?",
    },
  ];
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
            {Questions.map(({ id, question }) => (
              <>
                <TableRow>
                  <TableCell className="flex items-center gap-1">
                    <Checkbox /> {id}
                  </TableCell>

                  <TableCell>{question}</TableCell>
                  <TableCell className="flex items-center justify-end gap-2">
                    <ConfirmButton variant="destructive">
                      <Trash2 size={14} />
                    </ConfirmButton>

                    <Button variant="default">
                      <Edit3 size={14} />
                    </Button>
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
