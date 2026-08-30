"use client";

import { useId } from "react";
import { AccordionItemContext, useAccordionContext } from "./AccordionContext";
import type { AccordionItemProps } from "./accordion.types";

export function AccordionItem({
  value,
  disabled = false,
  className,
  children,
  ...rest
}: AccordionItemProps) {
  const { value: openValue, type } = useAccordionContext();
  const uid = useId();
  const triggerId = `accordion-${uid}-trigger`;
  const contentId = `accordion-${uid}-content`;

  const isOpen =
    type === "multiple"
      ? Array.isArray(openValue) && openValue.includes(value)
      : openValue === value;

  return (
    <AccordionItemContext.Provider
      value={{ value, isOpen, isDisabled: disabled, triggerId, contentId }}
    >
      <div
        data-ui="accordion-item"
        data-state={isOpen ? "open" : "closed"}
        data-disabled={disabled ? "true" : undefined}
        className={className}
        {...rest}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

AccordionItem.displayName = "AccordionItem";
