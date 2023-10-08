import clsx from "clsx";
import React, { PropsWithChildren } from "react";

function ValidationError({
  message,
  className,
}: PropsWithChildren<{
  message: string | string[] | undefined;
  className?: React.ClassAttributes<HTMLSpanElement>;
}>) {
  return (
    <span className={clsx(className, "text-destructive font-bold text-sm")}>
      {message}
    </span>
  );
}

export default ValidationError;
