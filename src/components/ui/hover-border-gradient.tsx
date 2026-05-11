import { ElementType, ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type HoverBorderGradientProps<T extends ElementType> = {
  as?: T;
  containerClassName?: string;
  className?: string;
} & ComponentPropsWithoutRef<T>;

export function HoverBorderGradient<T extends ElementType = "button">({
  as,
  containerClassName,
  className,
  children,
  ...props
}: HoverBorderGradientProps<T>) {
  const Component = as ?? "button";

  return (
    <span className={cn("hover-border-gradient", containerClassName)}>
      <Component className={cn("hover-border-gradient-content", className)} {...props}>
        {children}
      </Component>
    </span>
  );
}
