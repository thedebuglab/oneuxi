import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { renderToString } from "react-dom/server";
import { Accordion } from "../Accordion";

const ITEMS = [
  { id: "seo", title: "What is SEO?", content: "SEO improves visibility." },
  { id: "next", title: "Why Next.js?", content: "Next.js supports React." },
  { id: "ts", title: "Why TypeScript?", content: "TypeScript adds types." },
];

describe("Accordion", () => {
  // ── Data-driven API ─────────────────────────────────────────────

  describe("data-driven API", () => {
    it("renders all items from the items prop", () => {
      render(<Accordion items={ITEMS} />);
      expect(screen.getByText("What is SEO?")).toBeInTheDocument();
      expect(screen.getByText("Why Next.js?")).toBeInTheDocument();
      expect(screen.getByText("Why TypeScript?")).toBeInTheDocument();
    });

    it("renders content in the DOM (SEO requirement)", () => {
      render(<Accordion items={ITEMS} />);
      expect(screen.getByText("SEO improves visibility.")).toBeInTheDocument();
      expect(screen.getByText("Next.js supports React.")).toBeInTheDocument();
    });

    it("supports custom keyBy, titleBy, contentBy", () => {
      const faqData = [
        { faqId: "q1", question: "What?", answer: "This." },
      ];
      render(
        <Accordion
          items={faqData}
          keyBy="faqId"
          titleBy="question"
          contentBy="answer"
        />
      );
      expect(screen.getByText("What?")).toBeInTheDocument();
      expect(screen.getByText("This.")).toBeInTheDocument();
    });

    it("renders correct data-ui attributes on root", () => {
      const { container } = render(<Accordion items={ITEMS} />);
      expect(container.querySelector('[data-ui="accordion"]')).not.toBeNull();
    });
  });

  // ── Composable API ──────────────────────────────────────────────

  describe("composable API", () => {
    it("renders compound components correctly", () => {
      render(
        <Accordion type="single">
          <Accordion.Item value="item1">
            <Accordion.Trigger>Title One</Accordion.Trigger>
            <Accordion.Content>Content One</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item2">
            <Accordion.Trigger>Title Two</Accordion.Trigger>
            <Accordion.Content>Content Two</Accordion.Content>
          </Accordion.Item>
        </Accordion>
      );
      expect(screen.getByText("Title One")).toBeInTheDocument();
      expect(screen.getByText("Title Two")).toBeInTheDocument();
      expect(screen.getByText("Content One")).toBeInTheDocument();
      expect(screen.getByText("Content Two")).toBeInTheDocument();
    });

    it("content is always in the DOM (never conditionally rendered)", async () => {
      const user = userEvent.setup();
      render(
        <Accordion type="single">
          <Accordion.Item value="item1">
            <Accordion.Trigger>Title</Accordion.Trigger>
            <Accordion.Content>Hidden content</Accordion.Content>
          </Accordion.Item>
        </Accordion>
      );
      // Content present before any click
      expect(screen.getByText("Hidden content")).toBeInTheDocument();
      // Still present after clicking (just state change)
      await user.click(screen.getByRole("button", { name: /title/i }));
      expect(screen.getByText("Hidden content")).toBeInTheDocument();
    });
  });

  // ── Single mode ─────────────────────────────────────────────────

  describe("type=single", () => {
    it("opens an item when its trigger is clicked", async () => {
      const user = userEvent.setup();
      render(<Accordion items={ITEMS} type="single" />);
      const trigger = screen.getByRole("button", { name: /What is SEO/i });
      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    it("closes one item when another is opened (exclusive)", async () => {
      const user = userEvent.setup();
      render(<Accordion items={ITEMS} type="single" />);

      const [t1, t2] = screen.getAllByRole("button");
      await user.click(t1!);
      expect(t1).toHaveAttribute("aria-expanded", "true");

      await user.click(t2!);
      expect(t1).toHaveAttribute("aria-expanded", "false");
      expect(t2).toHaveAttribute("aria-expanded", "true");
    });

    it("collapses an open item when clicked again (collapsible=true)", async () => {
      const user = userEvent.setup();
      render(<Accordion items={ITEMS} type="single" collapsible />);
      const trigger = screen.getByRole("button", { name: /What is SEO/i });
      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("does not collapse when collapsible=false", async () => {
      const user = userEvent.setup();
      render(<Accordion items={ITEMS} type="single" collapsible={false} />);
      const trigger = screen.getByRole("button", { name: /What is SEO/i });
      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });
  });

  // ── Multiple mode ───────────────────────────────────────────────

  describe("type=multiple", () => {
    it("allows multiple items to be open simultaneously", async () => {
      const user = userEvent.setup();
      render(<Accordion items={ITEMS} type="multiple" />);
      const buttons = screen.getAllByRole("button");

      await user.click(buttons[0]!);
      await user.click(buttons[1]!);

      expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
      expect(buttons[1]).toHaveAttribute("aria-expanded", "true");
    });

    it("closes an open item independently", async () => {
      const user = userEvent.setup();
      render(<Accordion items={ITEMS} type="multiple" />);
      const buttons = screen.getAllByRole("button");

      await user.click(buttons[0]!);
      await user.click(buttons[1]!);
      await user.click(buttons[0]!);

      expect(buttons[0]).toHaveAttribute("aria-expanded", "false");
      expect(buttons[1]).toHaveAttribute("aria-expanded", "true");
    });
  });

  // ── Controlled mode ─────────────────────────────────────────────

  describe("controlled mode", () => {
    it("respects the value prop", () => {
      render(<Accordion items={ITEMS} value="seo" />);
      const trigger = screen.getByRole("button", { name: /What is SEO/i });
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    it("calls onValueChange when an item is clicked", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(
        <Accordion items={ITEMS} value="" onValueChange={onValueChange} />
      );
      await user.click(screen.getByRole("button", { name: /What is SEO/i }));
      expect(onValueChange).toHaveBeenCalledWith("seo");
    });

    it("does not change internally when controlled (value stays fixed)", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(
        <Accordion items={ITEMS} value="next" onValueChange={onValueChange} />
      );

      await user.click(screen.getByRole("button", { name: /What is SEO/i }));
      // Trigger still reports next as open because value is controlled
      const nextTrigger = screen.getByRole("button", { name: /Why Next/i });
      expect(nextTrigger).toHaveAttribute("aria-expanded", "true");
    });

    it("supports controlled multiple mode with string[]", () => {
      render(
        <Accordion
          items={ITEMS}
          type="multiple"
          value={["seo", "ts"]}
        />
      );
      expect(
        screen.getByRole("button", { name: /What is SEO/i })
      ).toHaveAttribute("aria-expanded", "true");
      expect(
        screen.getByRole("button", { name: /Why TypeScript/i })
      ).toHaveAttribute("aria-expanded", "true");
      expect(
        screen.getByRole("button", { name: /Why Next/i })
      ).toHaveAttribute("aria-expanded", "false");
    });
  });

  // ── Uncontrolled mode ───────────────────────────────────────────

  describe("uncontrolled mode (defaultValue)", () => {
    it("opens the defaultValue item on initial render", () => {
      render(<Accordion items={ITEMS} defaultValue="next" />);
      expect(
        screen.getByRole("button", { name: /Why Next/i })
      ).toHaveAttribute("aria-expanded", "true");
    });

    it("manages open state internally after initial render", async () => {
      const user = userEvent.setup();
      render(<Accordion items={ITEMS} defaultValue="seo" />);
      const trigger = screen.getByRole("button", { name: /What is SEO/i });
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });
  });

  // ── Disabled items ──────────────────────────────────────────────

  describe("disabled items", () => {
    it("renders disabled items with data-disabled", () => {
      const items = [
        { id: "a", title: "Active", content: "Content A" },
        { id: "b", title: "Disabled", content: "Content B", disabled: true },
      ];
      const { container } = render(<Accordion items={items} />);
      const disabledItem = container.querySelector(
        '[data-ui="accordion-item"][data-disabled="true"]'
      );
      expect(disabledItem).not.toBeNull();
    });

    it("disables the trigger button for disabled items", () => {
      const items = [
        { id: "a", title: "Active", content: "Content A" },
        { id: "b", title: "Disabled", content: "Content B", disabled: true },
      ];
      render(<Accordion items={items} />);
      expect(
        screen.getByRole("button", { name: /Disabled/i })
      ).toBeDisabled();
    });

    it("does not toggle disabled items on click", async () => {
      const user = userEvent.setup();
      const items = [
        { id: "a", title: "Active", content: "Content A" },
        { id: "b", title: "Disabled", content: "Content B", disabled: true },
      ];
      render(<Accordion items={items} />);
      const disabledBtn = screen.getByRole("button", { name: /Disabled/i });
      await user.click(disabledBtn);
      expect(disabledBtn).toHaveAttribute("aria-expanded", "false");
    });
  });

  // ── Heading level ───────────────────────────────────────────────

  describe("headingLevel prop", () => {
    it.each([2, 3, 4, 5, 6] as const)(
      "renders heading level h%i",
      (level) => {
        const { container } = render(
          <Accordion items={ITEMS} headingLevel={level} />
        );
        const heading = container.querySelector(`h${level}[data-ui="accordion-header"]`);
        expect(heading).not.toBeNull();
      }
    );

    it("defaults to h3", () => {
      const { container } = render(<Accordion items={ITEMS} />);
      expect(container.querySelector('h3[data-ui="accordion-header"]')).not.toBeNull();
    });
  });

  // ── ARIA attributes ─────────────────────────────────────────────

  describe("ARIA attributes", () => {
    it("sets aria-expanded=false when item is closed", () => {
      render(<Accordion items={ITEMS} />);
      const triggers = screen.getAllByRole("button");
      triggers.forEach((t) => {
        expect(t).toHaveAttribute("aria-expanded", "false");
      });
    });

    it("sets aria-expanded=true when item is open", async () => {
      const user = userEvent.setup();
      render(<Accordion items={ITEMS} />);
      const trigger = screen.getByRole("button", { name: /What is SEO/i });
      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    it("trigger has aria-controls pointing to content id", () => {
      const { container } = render(<Accordion items={ITEMS} />);
      const triggers = container.querySelectorAll('[data-ui="accordion-trigger"]');
      const contents = container.querySelectorAll('[data-ui="accordion-content"]');

      triggers.forEach((trigger, i) => {
        const controlsId = trigger.getAttribute("aria-controls");
        const contentId = contents[i]?.getAttribute("id");
        expect(controlsId).toBe(contentId);
      });
    });

    it("content has role=region", () => {
      render(<Accordion items={ITEMS} />);
      const regions = screen.getAllByRole("region");
      expect(regions).toHaveLength(ITEMS.length);
    });

    it("content has aria-labelledby pointing to trigger id", () => {
      const { container } = render(<Accordion items={ITEMS} />);
      const triggers = container.querySelectorAll('[data-ui="accordion-trigger"]');
      const contents = container.querySelectorAll('[data-ui="accordion-content"]');

      triggers.forEach((trigger, i) => {
        const triggerId = trigger.getAttribute("id");
        const labelledBy = contents[i]?.getAttribute("aria-labelledby");
        expect(triggerId).toBe(labelledBy);
      });
    });

    it("trigger data-state reflects open/closed", async () => {
      const user = userEvent.setup();
      render(<Accordion items={ITEMS} />);
      const trigger = screen.getByRole("button", { name: /What is SEO/i });
      expect(trigger).toHaveAttribute("data-state", "closed");
      await user.click(trigger);
      expect(trigger).toHaveAttribute("data-state", "open");
    });

    it("item data-state reflects open/closed", async () => {
      const user = userEvent.setup();
      const { container } = render(<Accordion items={ITEMS} />);
      const trigger = screen.getByRole("button", { name: /What is SEO/i });
      const item = container.querySelector('[data-ui="accordion-item"]');

      expect(item).toHaveAttribute("data-state", "closed");
      await user.click(trigger);
      expect(item).toHaveAttribute("data-state", "open");
    });
  });

  // ── Keyboard navigation ─────────────────────────────────────────

  describe("keyboard navigation", () => {
    it("moves focus to next trigger on ArrowDown", async () => {
      const user = userEvent.setup();
      render(<Accordion items={ITEMS} />);
      const [t1, t2] = screen.getAllByRole("button");
      t1?.focus();
      await user.keyboard("{ArrowDown}");
      expect(t2).toHaveFocus();
    });

    it("moves focus to previous trigger on ArrowUp", async () => {
      const user = userEvent.setup();
      render(<Accordion items={ITEMS} />);
      const [t1, t2] = screen.getAllByRole("button");
      t2?.focus();
      await user.keyboard("{ArrowUp}");
      expect(t1).toHaveFocus();
    });

    it("wraps to last on ArrowUp from first", async () => {
      const user = userEvent.setup();
      render(<Accordion items={ITEMS} />);
      const triggers = screen.getAllByRole("button");
      triggers[0]?.focus();
      await user.keyboard("{ArrowUp}");
      expect(triggers[triggers.length - 1]).toHaveFocus();
    });

    it("wraps to first on ArrowDown from last", async () => {
      const user = userEvent.setup();
      render(<Accordion items={ITEMS} />);
      const triggers = screen.getAllByRole("button");
      triggers[triggers.length - 1]?.focus();
      await user.keyboard("{ArrowDown}");
      expect(triggers[0]).toHaveFocus();
    });

    it("moves focus to first trigger on Home", async () => {
      const user = userEvent.setup();
      render(<Accordion items={ITEMS} />);
      const triggers = screen.getAllByRole("button");
      triggers[2]?.focus();
      await user.keyboard("{Home}");
      expect(triggers[0]).toHaveFocus();
    });

    it("moves focus to last trigger on End", async () => {
      const user = userEvent.setup();
      render(<Accordion items={ITEMS} />);
      const triggers = screen.getAllByRole("button");
      triggers[0]?.focus();
      await user.keyboard("{End}");
      expect(triggers[triggers.length - 1]).toHaveFocus();
    });

    it("toggles item on Enter", async () => {
      const user = userEvent.setup();
      render(<Accordion items={ITEMS} />);
      const trigger = screen.getByRole("button", { name: /What is SEO/i });
      trigger.focus();
      await user.keyboard("{Enter}");
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    it("toggles item on Space", async () => {
      const user = userEvent.setup();
      render(<Accordion items={ITEMS} />);
      const trigger = screen.getByRole("button", { name: /What is SEO/i });
      trigger.focus();
      await user.keyboard(" ");
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });
  });

  // ── Controlled component integration ────────────────────────────

  describe("controlled integration", () => {
    function ControlledAccordion() {
      const [open, setOpen] = useState("");
      return (
        <div>
          <Accordion items={ITEMS} value={open} onValueChange={(v) => setOpen(v as string)} />
          <span data-testid="current">{open}</span>
        </div>
      );
    }

    it("updates external state on toggle", async () => {
      const user = userEvent.setup();
      render(<ControlledAccordion />);
      await user.click(screen.getByRole("button", { name: /What is SEO/i }));
      expect(screen.getByTestId("current")).toHaveTextContent("seo");
    });
  });

  // ── SSR output ──────────────────────────────────────────────────

  describe("SSR", () => {
    it("renders all titles in server HTML", () => {
      const html = renderToString(<Accordion items={ITEMS} />);
      expect(html).toContain("What is SEO?");
      expect(html).toContain("Why Next.js?");
    });

    it("renders all content in server HTML (SEO requirement)", () => {
      const html = renderToString(<Accordion items={ITEMS} />);
      expect(html).toContain("SEO improves visibility.");
      expect(html).toContain("Next.js supports React.");
    });

    it("renders correct data-ui attributes in server HTML", () => {
      const html = renderToString(<Accordion items={ITEMS} />);
      expect(html).toContain('data-ui="accordion"');
      expect(html).toContain('data-ui="accordion-item"');
      expect(html).toContain('data-ui="accordion-trigger"');
      expect(html).toContain('data-ui="accordion-content"');
    });

    it("renders aria-expanded=false in initial server HTML", () => {
      const html = renderToString(<Accordion items={ITEMS} />);
      expect(html).toContain('aria-expanded="false"');
      expect(html).not.toContain('aria-expanded="true"');
    });

    it("renders aria-expanded=true for defaultValue item in server HTML", () => {
      const html = renderToString(
        <Accordion items={ITEMS} defaultValue="seo" />
      );
      expect(html).toContain('aria-expanded="true"');
    });

    it("renders h3 headings by default in server HTML", () => {
      const html = renderToString(<Accordion items={ITEMS} />);
      expect(html).toContain("<h3");
    });

    it("renders correct heading level in server HTML", () => {
      const html = renderToString(<Accordion items={ITEMS} headingLevel={2} />);
      expect(html).toContain("<h2");
      expect(html).not.toContain("<h3");
    });
  });
});
