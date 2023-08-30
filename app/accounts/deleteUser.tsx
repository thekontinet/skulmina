"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const DeleteUser = () => {
  const [isopen, setIsopen] = useState<boolean>(false);
  return (
    <Dialog open={isopen} onOpenChange={() => setIsopen(!isopen)}>
      <DialogTrigger>
        <Button variant="destructive" className="w-full">
          Delete User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-center">
            Are you sure you want to Delete this user
          </DialogTitle>
          <DialogDescription className="text-center">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full justify-center">
          <Button variant="destructive" className="mr-4">
            Yes
          </Button>
          <Button variant="secondary" onClick={() => setIsopen(!isopen)}>
            No
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUser;
