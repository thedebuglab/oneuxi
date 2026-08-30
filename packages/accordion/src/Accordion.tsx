"use client";

import { type ReactNode, forwardRef, useCallback, useState } from "react";
import { AccordionContext } from "./AccordionContext";
import { AccordionItem } from "./AccordionItem";
import { AccordionTrigger } from "./AccordionTrigger";
import { AccordionContent } from "./AccordionContent";
import type {
  AccordionProps,
  AccordionItemData,
} from "./accordion.types";
import "./accordion.css";

function DataDrivenItem({
  item,
  keyBy,
  titleBy,
  contentBy,
}: {
  item: AccordionItemData;
  keyBy: string;
  titleBy: string;
  contentBy: string;
}) {
  const itemValue = String(item[keyBy] ?? "");
  const title = item[titleBy];
  const content = item[contentBy];
  const disabled = Boolean(item.disabled);

  return (
    <AccordionItem value={itemValue} disabled={disabled}>
      <AccordionTrigger>
        {title != null ? String(title) : itemValue}
      </AccordionTrigger>
      <AccordionContent>
        {content != null && typeof content !== "object"
          ? String(content)
          : (content as ReactNode)}
      </AccordionContent>
    </AccordionItem>
  );
}

const AccordionRoot = forwardRef<HTMLElement, AccordionProps>(
  function AccordionRoot(
    {
      type = "single",
      collapsible = true,
      value: controlledValue,
      defaultValue,
      onValueChange,
      headingLevel = 3,
      variant = "minimal",
      size = "md",
      items,
      keyBy = "id",
      titleBy = "title",
      contentBy = "content",
      unstyled = false,
      className,
      children,
      ...rest
    },
    ref
  ) {
    const [uncontrolledValue, setUncontrolledValue] = useState<
      string | string[]
    >(() => {
      if (type === "multiple") {
        if (!defaultValue) return [];
        return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
      }
      return typeof defaultValue === "string" ? defaultValue : "";
    });

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : uncontrolledValue;

    const handleValueChange = useCallback(
      (itemValue: string) => {
        let next: string | string[];

        if (type === "multiple") {
          const current = Array.isArray(currentValue) ? currentValue : [];
          next = current.includes(itemValue)
            ? current.filter((v) => v !== itemValue)
            : [...current, itemValue];
        } else {
          const current = Array.isArray(currentValue) ? "" : currentValue;
          if (current === itemValue) {
            next = collapsible ? "" : itemValue;
          } else {
            next = itemValue;
          }
        }

        if (!isControlled) {
          setUncontrolledValue(next);
        }
        onValueChange?.(next);
      },
      [type, currentValue, collapsible, isControlled, onValueChange]
    );

    return (
      <AccordionContext.Provider
        value={{
          type,
          value: currentValue,
          onValueChange: handleValueChange,
          collapsible,
          headingLevel,
        }}
      >
        <section
          ref={ref}
          data-ui="accordion"
          data-variant={unstyled ? undefined : variant}
          data-size={unstyled ? undefined : size}
          className={className}
          {...rest}
        >
          {items != null
            ? items.map((item) => (
                <DataDrivenItem
                  key={String(item[keyBy] ?? "")}
                  item={item}
                  keyBy={keyBy}
                  titleBy={titleBy}
                  contentBy={contentBy}
                />
              ))
            : children}
        </section>
      </AccordionContext.Provider>
    );
  }
);

/**
 * OneUXI Accordion — accessible, SEO-first disclosure component.
 *
 * @example Simple data-driven usage (recommended):
 * ```tsx
 * <Accordion
 *   items={[
 *     { id: "q1", title: "What is SEO?", content: "SEO improves visibility." },
 *   ]}
 * />
 * ```
 *
 * @example Custom field mapping:
 * ```tsx
 * <Accordion items={faqData} keyBy="faqId" titleBy="question" contentBy="answer" />
 * ```
 *
 * @example Composable API (full control):
 * ```tsx
 * <Accordion type="single">
 *   <Accordion.Item value="item1">
 *     <Accordion.Trigger>Title</Accordion.Trigger>
 *     <Accordion.Content>Body</Accordion.Content>
 *   </Accordion.Item>
 * </Accordion>
 * ```
 */
export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});

Accordion.displayName = "Accordion";
