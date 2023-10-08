"use client";

import { deleteQuiz } from "./actions";
import notify from "@/lib/notify";
import { Loader, MoreHorizontal, Pencil, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import useLoading from "@/hooks/useLoading";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/datatable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import ConfirmButton from "@/components/widget/confirm-button";
import { Checkbox } from "@/components/ui/checkbox";
import { TQuiz } from "@/model/quiz";
import { TUser } from "@/model/user";
import { ROLES } from "@/src/constant";

function QuizList({ quizzes, user }: { quizzes: TQuiz[]; user: TUser }) {
  const handleDelete = async (id: string | number) => {
    notify.withPromise(deleteQuiz(id));
  };

  const columns: ColumnDef<TQuiz>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "time_limit",
      header: "Time",
    },
    {
      accessorKey: "code",
      header: "Code",
    },
    {
      header: "Questions",
      cell: ({ row }) => row.original.questions.length,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const [deleting, startDeleting] = useLoading();

        return (
          <>
            {user.role === ROLES.student && (
              <Button size={"sm"}>Take Exam</Button>
            )}
            {user.role === ROLES.teacher && (
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size={"sm"} variant={"ghost"}>
                      <MoreHorizontal size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup>
                      <DropdownMenuItem>
                        <Link
                          className="flex items-center text-sm p-2"
                          href={`quizzes/${row.original.id}`}
                        >
                          <Plus size={14} className="mr-2" />
                          Add Question
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link
                          className="flex items-center text-sm p-2"
                          href={`quizzes/${row.original.id}`}
                        >
                          <Pencil size={14} className="mr-2" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <ConfirmButton
                  description="When this quiz is deleted, all questions associated to it will be automatically removed."
                  onConfirm={async () => {
                    const endDeleting = startDeleting();
                    await handleDelete(row.original.id);
                    endDeleting();
                  }}
                  variant={"ghost"}
                  size={"sm"}
                  disabled={deleting}
                  className="text-destructive hover:text-destructive"
                >
                  {deleting ? (
                    <Loader size={14} className="animate-spin" />
                  ) : (
                    <X size={14} />
                  )}
                </ConfirmButton>
              </div>
            )}{" "}
          </>
        );
      },
    },
  ];

  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent>
        <DataTable data={quizzes} columns={columns} />
      </CardContent>
    </Card>
  );
}

export default QuizList;
