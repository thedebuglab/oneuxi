"use client";

import type { KeyboardEvent } from "react";
import { useAccordionContext, useAccordionItemContext } from "./AccordionContext";
import type { AccordionTriggerProps } from "./accordion.types";

function ChevronIcon() {
  return (
    <svg
      data-ui="accordion-chevron"
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

export function AccordionTrigger({
  children,
  className,
  headingLevel,
  ...rest
}: AccordionTriggerProps) {
  const { onValueChange, headingLevel: contextHeadingLevel } =
    useAccordionContext();
  const { value, isOpen, isDisabled, triggerId, contentId } =
    useAccordionItemContext();

  const level = headingLevel ?? contextHeadingLevel;
  const HeadingTag = `h${level}` as "h2" | "h3" | "h4" | "h5" | "h6";

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const key = event.key;
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(key)) return;

    event.preventDefault();

    const section = event.currentTarget.closest<HTMLElement>(
      '[data-ui="accordion"]'
    );
    if (!section) return;

    const triggers = Array.from(
      section.querySelectorAll<HTMLButtonElement>(
        '[data-ui="accordion-trigger"]:not([disabled])'
      )
    );
    const currentIndex = triggers.indexOf(event.currentTarget);

    let nextIndex: number;
    if (key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % triggers.length;
    } else if (key === "ArrowUp") {
      nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
    } else if (key === "Home") {
      nextIndex = 0;
    } else {
      nextIndex = triggers.length - 1;
    }

    triggers[nextIndex]?.focus();
  }

  return (
    <HeadingTag data-ui="accordion-header">
      <button
        id={triggerId}
        type="button"
        data-ui="accordion-trigger"
        data-state={isOpen ? "open" : "closed"}
        aria-expanded={isOpen}
        aria-controls={contentId}
        aria-disabled={isDisabled ? true : undefined}
        disabled={isDisabled}
        onClick={() => onValueChange(value)}
        onKeyDown={handleKeyDown}
        className={className}
        {...rest}
      >
        <span data-ui="accordion-trigger-label">{children}</span>
        <ChevronIcon />
      </button>
    </HeadingTag>
  );
}

AccordionTrigger.displayName = "AccordionTrigger";
