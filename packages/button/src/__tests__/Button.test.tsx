import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { Button } from "../Button";

describe("Button", () => {
  // ── Rendering ───────────────────────────────────────────────────

  describe("default render", () => {
    it("renders a button element", () => {
      render(<Button>Save</Button>);
      expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    });

    it("defaults to type=button", () => {
      render(<Button>Save</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("defaults to solid variant, md size, primary tone", () => {
      render(<Button>Save</Button>);
      const btn = screen.getByRole("button");
      expect(btn).toHaveAttribute("data-variant", "solid");
      expect(btn).toHaveAttribute("data-size", "md");
      expect(btn).toHaveAttribute("data-tone", "primary");
    });

    it("always renders data-ui=button", () => {
      render(<Button>Save</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("data-ui", "button");
    });
  });

  // ── Variants ────────────────────────────────────────────────────

  describe("variant prop", () => {
    const variants = ["solid", "outline", "ghost", "soft", "link"] as const;

    it.each(variants)("renders variant=%s", (variant) => {
      render(<Button variant={variant}>{variant}</Button>);
      expect(screen.getByRole("button")).toHaveAttribute(
        "data-variant",
        variant
      );
    });
  });

  // ── Sizes ───────────────────────────────────────────────────────

  describe("size prop", () => {
    const sizes = ["sm", "md", "lg"] as const;

    it.each(sizes)("renders size=%s", (size) => {
      render(<Button size={size}>{size}</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("data-size", size);
    });
  });

  // ── Tones ───────────────────────────────────────────────────────

  describe("tone prop", () => {
    const tones = ["primary", "neutral", "danger"] as const;

    it.each(tones)("renders tone=%s", (tone) => {
      render(<Button tone={tone}>{tone}</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("data-tone", tone);
    });
  });

  // ── Loading ─────────────────────────────────────────────────────

  describe("loading prop", () => {
    it("sets aria-busy when loading", () => {
      render(<Button loading>Save</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
    });

    it("sets data-loading when loading", () => {
      render(<Button loading>Save</Button>);
      expect(screen.getByRole("button")).toHaveAttribute(
        "data-loading",
        "true"
      );
    });

    it("disables the button when loading", () => {
      render(<Button loading>Save</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("sets aria-disabled when loading", () => {
      render(<Button loading>Save</Button>);
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-disabled",
        "true"
      );
    });

    it("renders the spinner element", () => {
      const { container } = render(<Button loading>Save</Button>);
      expect(container.querySelector('[data-ui="button-spinner"]')).not.toBeNull();
    });

    it("spinner is present in DOM even when not loading", () => {
      const { container } = render(<Button>Save</Button>);
      expect(container.querySelector('[data-ui="button-spinner"]')).not.toBeNull();
    });

    it("keeps label in DOM when loading (no layout shift)", () => {
      const { container } = render(<Button loading>Save</Button>);
      expect(container.querySelector('[data-ui="button-label"]')).not.toBeNull();
      expect(container.querySelector('[data-ui="button-label"]')).toHaveTextContent("Save");
    });
  });

  // ── Disabled ────────────────────────────────────────────────────

  describe("disabled prop", () => {
    it("disables the button", () => {
      render(<Button disabled>Save</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("sets data-disabled attribute", () => {
      render(<Button disabled>Save</Button>);
      expect(screen.getByRole("button")).toHaveAttribute(
        "data-disabled",
        "true"
      );
    });

    it("sets aria-disabled", () => {
      render(<Button disabled>Save</Button>);
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-disabled",
        "true"
      );
    });

    it("does not set data-disabled when enabled", () => {
      render(<Button>Save</Button>);
      expect(screen.getByRole("button")).not.toHaveAttribute("data-disabled");
    });
  });

  // ── Native events ───────────────────────────────────────────────

  describe("native events", () => {
    it("calls onClick when clicked", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Save</Button>);
      await user.click(screen.getByRole("button"));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Button disabled onClick={onClick}>
          Save
        </Button>
      );
      await user.click(screen.getByRole("button"));
      expect(onClick).not.toHaveBeenCalled();
    });

    it("does not call onClick when loading", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Button loading onClick={onClick}>
          Save
        </Button>
      );
      await user.click(screen.getByRole("button"));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  // ── Native attributes ───────────────────────────────────────────

  describe("native attributes", () => {
    it("forwards id attribute", () => {
      render(<Button id="save-btn">Save</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("id", "save-btn");
    });

    it("forwards custom data-* attributes", () => {
      render(<Button data-testid="my-button">Save</Button>);
      expect(screen.getByTestId("my-button")).toBeInTheDocument();
    });

    it("forwards aria-* attributes", () => {
      render(<Button aria-label="Save changes">Save</Button>);
      expect(
        screen.getByRole("button", { name: "Save changes" })
      ).toBeInTheDocument();
    });

    it("forwards className", () => {
      render(<Button className="custom-class">Save</Button>);
      expect(screen.getByRole("button")).toHaveClass("custom-class");
    });

    it("accepts type=submit", () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("accepts type=reset", () => {
      render(<Button type="reset">Reset</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "reset");
    });
  });

  // ── Icons ───────────────────────────────────────────────────────

  describe("icons", () => {
    it("renders startIcon", () => {
      const { container } = render(
        <Button startIcon={<span data-testid="icon">→</span>}>Save</Button>
      );
      expect(screen.getByTestId("icon")).toBeInTheDocument();
      expect(
        container.querySelector('[data-ui="button-icon"][data-position="start"]')
      ).not.toBeNull();
    });

    it("renders endIcon", () => {
      const { container } = render(
        <Button endIcon={<span data-testid="icon">→</span>}>Save</Button>
      );
      expect(screen.getByTestId("icon")).toBeInTheDocument();
      expect(
        container.querySelector('[data-ui="button-icon"][data-position="end"]')
      ).not.toBeNull();
    });

    it("marks icon containers as aria-hidden", () => {
      const { container } = render(
        <Button startIcon={<span>→</span>}>Save</Button>
      );
      const iconSpan = container.querySelector('[data-ui="button-icon"]');
      expect(iconSpan).toHaveAttribute("aria-hidden", "true");
    });
  });

  // ── Full width ──────────────────────────────────────────────────

  describe("fullWidth prop", () => {
    it("sets data-full-width attribute", () => {
      render(<Button fullWidth>Save</Button>);
      expect(screen.getByRole("button")).toHaveAttribute(
        "data-full-width",
        "true"
      );
    });
  });

  // ── Unstyled mode ───────────────────────────────────────────────

  describe("unstyled prop", () => {
    it("removes data-variant, data-size, data-tone when unstyled", () => {
      render(<Button unstyled>Save</Button>);
      const btn = screen.getByRole("button");
      expect(btn).not.toHaveAttribute("data-variant");
      expect(btn).not.toHaveAttribute("data-size");
      expect(btn).not.toHaveAttribute("data-tone");
    });

    it("keeps data-ui=button when unstyled", () => {
      render(<Button unstyled>Save</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("data-ui", "button");
    });
  });

  // ── Ref forwarding ──────────────────────────────────────────────

  describe("ref forwarding", () => {
    it("forwards ref to the button element", () => {
      const ref = createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Save</Button>);
      expect(ref.current).not.toBeNull();
      expect(ref.current?.tagName).toBe("BUTTON");
    });
  });

  // ── SSR ─────────────────────────────────────────────────────────

  describe("SSR", () => {
    it("renders to HTML string without errors", () => {
      const html = renderToString(<Button variant="solid" tone="primary">Save</Button>);
      expect(html).toContain("Save");
      expect(html).toContain('data-ui="button"');
      expect(html).toContain('data-variant="solid"');
      expect(html).toContain('data-tone="primary"');
    });

    it("renders spinner in SSR output", () => {
      const html = renderToString(<Button loading>Saving</Button>);
      expect(html).toContain('data-ui="button-spinner"');
    });

    it("renders label in SSR output even when loading", () => {
      const html = renderToString(<Button loading>Saving</Button>);
      expect(html).toContain('data-ui="button-label"');
      expect(html).toContain("Saving");
    });
  });
});
