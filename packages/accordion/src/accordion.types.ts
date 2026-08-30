import type { HTMLAttributes, ReactNode } from "react";

export type AccordionVariant = "minimal" | "bordered" | "separated";
export type AccordionSize = "sm" | "md" | "lg";
export type AccordionHeadingLevel = 2 | 3 | 4 | 5 | 6;

/** Shape of a single item for the data-driven API. */
export interface AccordionItemData {
  id?: string;
  title?: ReactNode;
  content?: ReactNode;
  disabled?: boolean;
  [key: string]: unknown;
}

/** Props for the Accordion root component. */
export interface AccordionProps
  extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  /**
   * Whether only one item can be open at a time ("single")
   * or multiple items can be open ("multiple").
   * @default "single"
   */
  type?: "single" | "multiple";

  /**
   * Whether the open item can be collapsed (closed) by clicking it again.
   * Only applies when type="single".
   * @default true
   */
  collapsible?: boolean;

  /**
   * The open item(s). Use for controlled mode.
   * Pass a string for type="single", string[] for type="multiple".
   */
  value?: string | string[];

  /**
   * The item(s) open by default. Use for uncontrolled mode.
   * Pass a string for type="single", string[] for type="multiple".
   */
  defaultValue?: string | string[];

  /** Called when the open state changes. */
  onValueChange?: (value: string | string[]) => void;

  /** Visual variant of the accordion. @default "minimal" */
  variant?: AccordionVariant;

  /** Size of the accordion. @default "md" */
  size?: AccordionSize;

  /**
   * The HTML heading level used for each trigger header.
   * Important for semantic document outline.
   * @default 3
   */
  headingLevel?: AccordionHeadingLevel;

  /** Removes all default styles. */
  unstyled?: boolean;

  /**
   * Data-driven API — pass an array of items to render.
   * Each item must have `id`, `title`, and `content` fields by default.
   * Use `keyBy`, `titleBy`, `contentBy` to map custom field names.
   */
  items?: AccordionItemData[];

  /**
   * The field name to use as the unique key in data-driven mode.
   * @default "id"
   */
  keyBy?: string;

  /**
   * The field name to use as the trigger title in data-driven mode.
   * @default "title"
   */
  titleBy?: string;

  /**
   * The field name to use as the content in data-driven mode.
   * @default "content"
   */
  contentBy?: string;

  children?: ReactNode;
}

/** Props for AccordionItem. */
export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Unique value identifying this item. Used for open/close state. */
  value: string;
  /** Disables this accordion item. */
  disabled?: boolean;
  children?: ReactNode;
}

/** Props for AccordionTrigger. */
export interface AccordionTriggerProps
  extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  /** Override heading level for this specific trigger. */
  headingLevel?: AccordionHeadingLevel;
}

/** Props for AccordionContent. */
export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
