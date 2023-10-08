"use client";

import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AccountType } from "@/types";
import { Button } from "@/components/ui/button";
import { Loader, Trash2 } from "lucide-react";
import { deleteUser } from "./actions";
import notify from "@/lib/notify";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/datatable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useLoading from "@/hooks/useLoading";
import { revalidatePath } from "next/cache";

type Props = { users: AccountType[] };

function UserList({ users }: Props) {
  const handleDelete = async (id: string | number) => {
    await deleteUser(id);
    notify.success("Deleted");
  };

  const columns: ColumnDef<AccountType>[] = [
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
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => row.original?.role?.toUpperCase(),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const [deleting, startDeleting] = useLoading();
        return (
          <Button
            onClick={async () => {
              const endDeleting = startDeleting();
              await handleDelete(row.original.id);
              endDeleting();
            }}
            variant={"destructive"}
            size={"sm"}
            disabled={deleting}
          >
            {deleting ? (
              <Loader size={14} className="animate-spin" />
            ) : (
              <Trash2 size={14} className="mr-2" />
            )}
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent>
        <DataTable data={users} columns={columns} />
      </CardContent>
    </Card>
  );
}

export default UserList;
