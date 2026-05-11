import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type HoverEffectProps = {
  children: ReactNode;
  className?: string;
};

export function HoverEffect({ children, className }: HoverEffectProps) {
  return <div className={cn("card-hover-effect", className)}>{children}</div>;
}
