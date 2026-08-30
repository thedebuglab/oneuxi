import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "solid" | "outline" | "ghost" | "soft" | "link";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonTone = "primary" | "neutral" | "danger";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button. @default "solid" */
  variant?: ButtonVariant;
  /** Size of the button. @default "md" */
  size?: ButtonSize;
  /** Color tone of the button. @default "primary" */
  tone?: ButtonTone;
  /** Shows a loading spinner and disables the button. */
  loading?: boolean;
  /** Stretches the button to fill its container width. */
  fullWidth?: boolean;
  /** Icon rendered before the label. */
  startIcon?: ReactNode;
  /** Icon rendered after the label. */
  endIcon?: ReactNode;
  /** Removes all default styles. Useful for custom styling. */
  unstyled?: boolean;
}
