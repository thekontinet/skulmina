"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

type ConfirmButtonProps = {
  title?: string;
  description?: string;
  onConfirm?: (done: () => void) => void;
} & ButtonProps;

const ConfirmButton = ({
  title = "Are you sure of this action ?",
  description,
  onConfirm,
  ...props
}: ConfirmButtonProps) => {
  const [isopen, setIsopen] = useState<boolean>(false);

  const handleConfirmation = () => {
    if (onConfirm === undefined) return setIsopen(false);
    onConfirm(() => setIsopen(false));
  };

  return (
    <Dialog open={isopen} onOpenChange={() => setIsopen(!isopen)}>
      <Button onClick={() => setIsopen(true)} {...props}></Button>
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
            variant={props.variant}
            className="mr-4"
          >
            Proceed
          </Button>
          <Button variant="secondary" onClick={() => setIsopen(!isopen)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmButton;
