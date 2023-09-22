"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";
import { createPortal } from "react-dom";
import { isPromise } from "util/types";

type ConfirmButtonProps = {
  title?: string;
  description?: string;
  onConfirm?: (done?: () => void) => void | Promise<any>;
  onCancel?: () => void | Promise<any>;
} & ButtonProps;

const ConfirmButton = ({
  title = "Are you sure of this action ?",
  description,
  onConfirm,
  onCancel,
  ...props
}: ConfirmButtonProps) => {
  const [isopen, setIsopen] = useState<boolean>(false);

  const handleConfirmation = () => {
    setIsopen(false);
    if (onConfirm === undefined) return setIsopen(false);
    const result = onConfirm(() => setIsopen(false));
  };

  return (
    <Dialog
      open={isopen}
      onOpenChange={() => {
        if (!isopen === false && onCancel) onCancel();
        setIsopen(!isopen);
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setIsopen(true)} {...props}></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-center">{title}</DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full justify-center">
          <Button
            onClick={handleConfirmation}
            variant={"destructive"}
            className="mr-4"
          >
            Proceed
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              if (!isopen === false && onCancel) onCancel();
              setIsopen(!isopen);
            }}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmButton;
