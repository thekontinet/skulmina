"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import notify from "@/lib/notify";
import { deleteQuestion } from "./action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@radix-ui/react-checkbox";
import ConfirmButton from "@/components/widget/confirm-button";
import { Edit3, Trash2 } from "lucide-react";
import { TCourse } from "@/model/course";

type Props = {
  courses: TCourse[];
};

function CourseList({ courses }: Props) {
  const handleDelete = async (id: number | string) => {
    await notify.withPromise(deleteQuestion(id));
  };

  return (
    <Card>
      <CardContent className="w-full py-4">
        <Card>
          <CardContent className="relative">
            <Table className="mt-5">
              <TableHeader className="font-bold uppercase tracking-widest">
                <TableRow>
                  <TableHead className="flex items-center justify-start gap-3">
                    <Checkbox />
                  </TableHead>

                  <TableHead>
                    <span className="text-xs">Course</span>
                  </TableHead>
                  <TableHead className="text-right">
                    <span className="text-xs">Action</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses?.map(({ id, title }, index) => (
                  <TableRow key={id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>{title}</TableCell>
                    <TableCell className="flex items-center justify-end gap-1">
                      <ConfirmButton
                        onConfirm={() => handleDelete(id!)}
                        variant="destructive"
                        size={"sm"}
                      >
                        <Trash2 size={14} />
                      </ConfirmButton>

                      <Button variant="default" size={"sm"}>
                        <Link href={`questions/${id}`}>
                          <Edit3 size={14} />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}

export default CourseList;
