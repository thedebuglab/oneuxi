"use client";

import { useAccordionItemContext } from "./AccordionContext";
import type { AccordionContentProps } from "./accordion.types";

export function AccordionContent({
  children,
  className,
  ...rest
}: AccordionContentProps) {
  const { isOpen, triggerId, contentId } = useAccordionItemContext();

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      data-ui="accordion-content"
      data-state={isOpen ? "open" : "closed"}
      className={className}
      {...rest}
    >
      <div data-ui="accordion-content-inner">{children}</div>
    </div>
  );
}

AccordionContent.displayName = "AccordionContent";
