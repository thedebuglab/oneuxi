import { createContext, useContext } from "react";
import type { AccordionHeadingLevel } from "./accordion.types";

interface AccordionContextValue {
  type: "single" | "multiple";
  value: string | string[];
  onValueChange: (itemValue: string) => void;
  collapsible: boolean;
  headingLevel: AccordionHeadingLevel;
}

export const AccordionContext = createContext<AccordionContextValue | null>(
  null
);

export function useAccordionContext(): AccordionContextValue {
  const ctx = useContext(AccordionContext);
  if (ctx === null) {
    throw new Error(
      "Accordion compound components must be rendered inside <Accordion>."
    );
  }
  return ctx;
}

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
  isDisabled: boolean;
  triggerId: string;
  contentId: string;
}

export const AccordionItemContext =
  createContext<AccordionItemContextValue | null>(null);

export function useAccordionItemContext(): AccordionItemContextValue {
  const ctx = useContext(AccordionItemContext);
  if (ctx === null) {
    throw new Error(
      "AccordionTrigger and AccordionContent must be rendered inside <Accordion.Item>."
    );
  }
  return ctx;
}
