"use client";

import { forwardRef } from "react";
import type { ButtonProps } from "./button.types";
import "./button.css";

function ButtonSpinner() {
  return (
    <span data-ui="button-spinner" aria-hidden="true">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <path d="M14 8A6 6 0 1 1 8 2" />
      </svg>
    </span>
  );
}

/**
 * OneUXI Button — a semantic, accessible `<button>` element.
 *
 * @example
 * ```tsx
 * <Button variant="solid" tone="primary" size="md">Save</Button>
 * <Button variant="outline" tone="danger" loading={isDeleting}>Delete</Button>
 * <Button startIcon={<PlusIcon />}>New item</Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "solid",
      size = "md",
      tone = "primary",
      loading = false,
      fullWidth = false,
      startIcon,
      endIcon,
      unstyled = false,
      disabled,
      className,
      children,
      type = "button",
      ...rest
    },
    ref
  ) {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading ? true : undefined}
        aria-disabled={isDisabled ? true : undefined}
        data-ui="button"
        data-variant={unstyled ? undefined : variant}
        data-size={unstyled ? undefined : size}
        data-tone={unstyled ? undefined : tone}
        data-disabled={isDisabled ? "true" : undefined}
        data-loading={loading ? "true" : undefined}
        data-full-width={fullWidth ? "true" : undefined}
        className={className}
        {...rest}
      >
        <ButtonSpinner />
        {startIcon != null && (
          <span data-ui="button-icon" data-position="start" aria-hidden="true">
            {startIcon}
          </span>
        )}
        <span data-ui="button-label">{children}</span>
        {endIcon != null && (
          <span data-ui="button-icon" data-position="end" aria-hidden="true">
            {endIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
