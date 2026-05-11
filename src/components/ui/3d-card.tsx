import {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  MouseEvent,
  useRef,
} from "react";

import { cn } from "@/lib/utils";

type CardContainerProps = ComponentPropsWithoutRef<"div">;

export function CardContainer({ className, children, ...props }: CardContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;

    element.style.setProperty("--card-rotate-x", `${rotateX}deg`);
    element.style.setProperty("--card-rotate-y", `${rotateY}deg`);
  }

  function handleMouseLeave() {
    const element = ref.current;
    if (!element) return;

    element.style.setProperty("--card-rotate-x", "0deg");
    element.style.setProperty("--card-rotate-y", "0deg");
  }

  return (
    <div
      ref={ref}
      className={cn("card-3d-container", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
}

type CardBodyProps = ComponentPropsWithoutRef<"div">;

export function CardBody({ className, children, ...props }: CardBodyProps) {
  return (
    <div className={cn("card-3d-body", className)} {...props}>
      {children}
    </div>
  );
}

type CardItemProps<T extends ElementType> = {
  as?: T;
  translateZ?: number | string;
  className?: string;
  style?: CSSProperties;
} & ComponentPropsWithoutRef<T>;

export function CardItem<T extends ElementType = "div">({
  as,
  translateZ = 0,
  className,
  style,
  children,
  ...props
}: CardItemProps<T>) {
  const Component = as ?? "div";
  const z = typeof translateZ === "number" ? `${translateZ}px` : translateZ;

  return (
    <Component
      className={cn("card-3d-item", className)}
      style={{ "--card-item-z": z, ...style } as CSSProperties}
      {...props}
    >
      {children}
    </Component>
  );
}
