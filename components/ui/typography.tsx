import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface TypographyProps {
  as?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "p"
    | "blockquote"
    | "small"
    | "div"
    | "strong"
    | "span";
  variant?: "h1" | "h2" | "h3" | "h4" | "p" | "blockquote" | "small" | "strong";
  children: ReactNode;
  className?: string;
}

const Typography: React.FC<TypographyProps> = ({
  as,
  variant,
  children,
  className,
}) => {
  let classNames = "";

  const Tag = as || variant || "p";

  switch (variant) {
    case "h1":
      classNames =
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl";
      break;
    case "h2":
      classNames =
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0";
      break;
    case "h3":
      classNames = "scroll-m-20 text-2xl font-semibold tracking-tight";
      break;
    case "h4":
      classNames = "scroll-m-20 text-xl font-semibold tracking-tight";
      break;
    case "p":
      classNames = "leading-7 [&:not(:first-child)]:mt-4";
      break;
    case "blockquote":
      classNames = "mt-6 border-l-2 pl-6 italic";
      break;
    case "small":
      classNames = "text-sm font-medium leading-none";
      break;
    case "strong":
      classNames = "leading-7 font-bold";
    default:
      classNames = "leading-7";
  }

  return React.createElement(
    Tag,
    { className: cn(classNames, className) },
    children
  );
};

export default Typography;
