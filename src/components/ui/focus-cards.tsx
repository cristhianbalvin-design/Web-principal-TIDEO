import { ReactNode, useState } from "react";

import { cn } from "@/lib/utils";

type FocusCardsProps = {
  children: (args: { focusedIndex: number | null; setFocusedIndex: (index: number | null) => void }) => ReactNode;
  className?: string;
};

export function FocusCards({ children, className }: FocusCardsProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  return (
    <div className={cn("focus-cards", className)} onMouseLeave={() => setFocusedIndex(null)}>
      {children({ focusedIndex, setFocusedIndex })}
    </div>
  );
}
