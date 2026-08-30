#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SUPPORTED_COMPONENTS = ["button", "accordion"] as const;
type ComponentName = (typeof SUPPORTED_COMPONENTS)[number];

const COMPONENT_FILES: Record<ComponentName, string[]> = {
  button: ["button.tsx", "button.css"],
  accordion: ["accordion.tsx", "accordion.css"],
};

function printHelp() {
  console.log(`
  OneUXI CLI — v0.1.0

  Usage:
    npx oneuxi add <component>

  Available components:
    button
    accordion

  Examples:
    npx oneuxi add button
    npx oneuxi add accordion
  `);
}

function addComponent(name: string | undefined): void {
  if (!name) {
    console.error("  ✗  Please specify a component name.\n");
    printHelp();
    process.exit(1);
  }

  if (!SUPPORTED_COMPONENTS.includes(name as ComponentName)) {
    console.error(`  ✗  Unknown component: "${name}"`);
    console.error(
      `     Available components: ${SUPPORTED_COMPONENTS.join(", ")}`
    );
    process.exit(1);
  }

  const component = name as ComponentName;
  const sourceDir = resolve(
    __dirname,
    "..",
    "..",
    "..",
    "packages",
    component,
    "src"
  );
  const targetDir = resolve(process.cwd(), "components", "ui");

  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
    console.log(`  ✓  Created directory: components/ui/`);
  }

  const files = COMPONENT_FILES[component];
  let copied = 0;

  for (const file of files) {
    const sourcePath = join(sourceDir, file);
    const targetPath = join(targetDir, file);

    if (!existsSync(sourcePath)) {
      console.warn(`  ⚠  Source file not found: ${file}`);
      continue;
    }

    const content = readFileSync(sourcePath, "utf-8");
    const targetContent = existsSync(targetPath)
      ? readFileSync(targetPath, "utf-8")
      : null;

    if (targetContent !== null && targetContent === content) {
      console.log(`  –  Unchanged: components/ui/${file}`);
      continue;
    }

    writeFileSync(targetPath, content, "utf-8");
    console.log(`  ✓  ${targetContent !== null ? "Updated" : "Added"}:   components/ui/${file}`);
    copied++;
  }

  if (copied > 0 || files.length > 0) {
    console.log(`\n  Component "${component}" is ready in components/ui/\n`);
    console.log(`  Import it with:`);
    console.log(
      `    import { ${component.charAt(0).toUpperCase() + component.slice(1)} } from "@/components/ui/${component}";\n`
    );
  }
}

const [command, ...args] = process.argv.slice(2);

if (!command || command === "help" || command === "--help" || command === "-h") {
  printHelp();
} else if (command === "add") {
  addComponent(args[0]);
} else {
  console.error(`  ✗  Unknown command: "${command}"`);
  printHelp();
  process.exit(1);
}
