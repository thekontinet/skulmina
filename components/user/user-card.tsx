"use client";

import { AccountType } from "@/types";
import ConfirmButton from "../widget/confirm-button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { deleteUser } from "@/app/accounts/actions";

type CardProps = {
  user: AccountType;
};

const UserCard = ({ user }: CardProps) => {
  const handleDelete = async () => {
    deleteUser(user.id);
  };
  return (
    <div className="flex flex-col text-center rounded-md bg-card py-8 px-4">
      <Avatar className="rounded-full w-14 h-14 mx-auto flex overflow-hidden mb-4">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <h4 className="text-lg">{user.name}</h4>
        <p className="text-sm">{user.email}</p>
        <p className="text-sm">{user.role}</p>
      </div>
      <ConfirmButton
        className="w-full"
        variant="destructive"
        title="Are you sure ?"
        description="Please note that this action is not reversable"
        onConfirm={handleDelete}
      >
        Delete
      </ConfirmButton>
    </div>
  );
};

export default UserCard;
