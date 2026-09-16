# figma-make-app

React 19, Vite 8, and Tailwind CSS v4 app running inside Figma Make. Keep this file as the root project knowledge base. No application-source child `AGENTS.md` files exist under `src/**`; nested files under `.agents/skills/**` and `.claude/skills/**` are skill-local tooling guidance.

## Runtime and development

A Vite development server is already running on `$PORT`, default `8443`. Use the preview panel for the app and rely on hot reload while editing. Do not start a second server unless the existing one is unavailable.

Toolchain versions are Node 22 and pnpm 10.34.3, recorded in `.mise.toml`. Install dependencies with `pnpm install`. Existing `package.json` scripts are:

- `pnpm dev`, start Vite development mode.
- `pnpm build`, create the production build.
- `pnpm preview`, serve the production build locally.
- `pnpm format`, run `oxfmt`.

There are no test scripts, test files, or CI configuration in this repository. Do not report tests or CI checks as available validation. The practical checks are formatting, `pnpm build`, and the running preview.

## Application structure

The browser entry path is `index.html` → `src/main.tsx` → `src/App.tsx` → the selected `src/pages/Page00` through `src/pages/Page08` module.

- `index.html` contains the `#root` mount and loads `src/main.tsx`.
- `src/main.tsx` imports `src/index.css` and mounts `src/App.tsx` into `#root`.
- `src/App.tsx` owns `NAV_GROUPS`, page navigation, and `renderPage`. Add or change page navigation there, then map the selected page to its page module.
- `src/pages/` contains the page boundary. Page-specific UI belongs in the matching `Page00` to `Page08` module, not in the entrypoint.
- `src/index.css` is the design-system layer. It imports Tailwind v4, defines the Tailwind v4 theme, and owns reusable `ems` primitives. Put shared tokens, fonts, and global primitives there.
- `vite.config.ts` configures React, Tailwind CSS v4, the `@` alias for `src`, and the Figma Make plugin. The plugin consumes `.figma/make/site.json`, so changes to Figma site metadata can affect the build and preview.

Runtime dependencies include React and React DOM 19. Styling uses Tailwind CSS v4 through `@tailwindcss/vite`. Do not add a Tailwind config or PostCSS config unless the repository structure changes.

## Editing rules

- Start with the task-relevant page module, then follow imports only when required.
- Keep navigation registration in `src/App.tsx` and shared visual primitives in `src/index.css`.
- Export components as default exports.
- Keep CSS `@import` statements first. Global font wiring belongs in `src/index.css`.
- Use double quotes for strings containing apostrophes, or escape apostrophes in single-quoted strings.
- Ensure JSX tags are closed and braces are balanced.

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **ui-component-library-design** (192 symbols, 386 relationships, 16 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> Index stale? Run `node .gitnexus/run.cjs analyze` from the project root — it auto-selects an available runner. No `.gitnexus/run.cjs` yet? `npx gitnexus analyze` (npm 11 crash → `npm i -g gitnexus`; #1939).

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows. For regression review, compare against the default branch: `detect_changes({scope: "compare", base_ref: "main"})`.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `context({name: "symbolName"})`.

## Never Do

- NEVER edit a function, class, or method without first running `impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `rename` which understands the call graph.
- NEVER commit changes without running `detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/ui-component-library-design/context` | Codebase overview, check index freshness |
| `gitnexus://repo/ui-component-library-design/clusters` | All functional areas |
| `gitnexus://repo/ui-component-library-design/processes` | All execution flows |
| `gitnexus://repo/ui-component-library-design/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
