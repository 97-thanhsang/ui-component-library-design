# ASC.EMS Design System Contract

Status: maintained contract for the existing catalogue application. Runtime authority remains `src/index.css`. This document records the contract and source mapping. It does not create a token generator, component library, router, or new dependency.

## 1. Identity and ownership

ASC.EMS uses a navy and blue enterprise visual identity with white surfaces, cool blue-gray backgrounds, compact controls, and restrained elevation. `src/index.css` owns runtime tokens and `.ems-*` primitives. `src/App.tsx` owns the application shell, page navigation, header actions, notification and user menus, and command palette. Pages own catalogue demos for Foundations, Icons, Components, Tables & Data, Patterns, Templates, Prototype Flows, and Documentation, as registered in `NAV_GROUPS` (`src/App.tsx:12-47`).

The catalogue is private and no-index. Demo actions stay client-local. The project has no new runtime dependencies. Distribution uses the approved MIT posture.

## 2. Tokens and source mapping

All values below are mapped to `src/index.css:4-71`, unless another source range is shown.

| Role | Runtime token or value | Use |
| --- | --- | --- |
| Navy scale | `--color-navy-50` through `--color-navy-950`, `#e8edf4` through `#080f1a` | Shell, text, muted blue surfaces |
| Primary blue | `--color-blue-500: #1677ff` | Primary actions, links, active states, focus ring |
| Primary blue dark | `--color-blue-600: #0958d9`, `--color-blue-700: #003eb3` | Hover and active action states |
| Surfaces | `--color-surface: #ffffff`, `--color-bg: #f0f4f8`, `--color-bg-alt: #e8eef5` | Cards, page background, alternate regions |
| Lines | `--color-border: #d1dbe8`, `--color-border-light: #e8eef5` | Borders and separators |
| Text | `--color-text-primary: #0f1b2d`, secondary `#4a5e78`, tertiary `#7a90a8`, disabled `#b0bec8`, inverse `#ffffff` | Text hierarchy |
| Feedback | Success `#52c41a`, warning `#fa8c16`, error `#ff4d4f`, info `#1677ff`, plus matching `*-bg` and `*-border` tokens | Status, alerts, validation |
| Type | `--font-sans: 'Be Vietnam Pro', 'Inter', system-ui, sans-serif`; `--font-mono: 'JetBrains Mono', monospace` | UI and code tokens |
| Radius | `4px`, `6px`, `8px`, `12px`, `16px`, `9999px` for `sm` through `full` | Controls, cards, overlays, pills |
| Shadow | `xs`, `sm`, `md`, `lg`, `xl`, from `0 1px 2px` to `0 8px 24px` | Layer separation |

The body repeats the sans font, `#f0f4f8` background, and `#0f1b2d` text at `src/index.css:77-84`. New values require a source update and a corresponding contract update. Do not create a parallel runtime token source.

## 3. Layout and responsive behavior

The desktop shell is a flex layout with a collapsible sidebar, fixed header height `52px`, scrollable navigation and main content, and sidebar widths `228px` expanded or `56px` collapsed (`src/App.tsx:106-118, 224-231, 381-383`). Desktop navigation preserves the existing page IDs `00` through `08`.

Responsive contract:

- At `320px` and below, main content remains reachable without document horizontal overflow. Navigation becomes an off-canvas drawer, opened by a labelled menu button, with a backdrop and close behavior. Closing restores focus to the trigger.
- At `768px`, tablet layouts may reflow controls, tabs, tables, forms, dialogs, and drawers. Do not remove catalogue content solely to fit the viewport.
- At `1024px`, desktop shell behavior may resume where content fits. Use CSS media queries, not JavaScript viewport state, for layout changes.
- Existing catalogue grid guidance also records mobile `<768px`, tablet `768-1199px`, desktop `>=1200px`, and wide `>=1600px` (`src/pages/Page01Foundations.tsx:248-251`).
- The command palette and overlays fit the viewport. The current desktop palette is `560px` wide with `20%` top offset (`src/App.tsx:389-394`); responsive behavior must cap width with viewport gutters.

## 4. Primitives and component anatomy

The existing `.ems-*` primitives are the implementation vocabulary (`src/index.css:123-675`):

- Buttons: `.ems-btn` with `xs`, `sm`, `md`, `lg` sizes and `primary`, `secondary`, `danger`, `ghost`, `success` variants (`:124-164`).
- Badges and tags: status-colored `.ems-badge-*` variants and `.ems-tag` (`:166-193`).
- Containers: `.ems-card`, header, body, and `.ems-stat-card` (`:195-213`, `:536-543`).
- Forms: `.ems-input`, `.ems-select`, `.ems-label`, `.ems-helper`, checkbox, radio, and switch (`:215-370`). Labels, helper text, and errors remain programmatically associated in owning page markup.
- Data and navigation: `.ems-table`, `.ems-tabs-nav`, `.ems-tab-item`, `.ems-breadcrumb`, and `.ems-step` (`:272-296`, `:372-390`, `:468-500`). Tabs use semantic buttons or tab semantics, never click-only interactive `div` elements.
- Feedback and progress: `.ems-progress-bar`, `.ems-alert-*`, `.ems-toast`, `.ems-skeleton` (`:405-466`, `:594-614`).
- Overlays: `.ems-modal-overlay`, `.ems-modal`, header, body, footer, and `.ems-drawer` (`:502-534`, `:616-631`).
- Supporting primitives: `.ems-avatar`, `.ems-tooltip`, token rows, page sections, and compact scrollbar rules (`:392-403`, `:433-454`, `:633-675`).

Each primitive exposes at least default, hover, active or selected, focus, disabled where applicable, loading where applicable, empty where applicable, and error where applicable states. State must be conveyed by text, structure, or an accessible name, not color alone.

## 5. Accessibility and interaction contract

Target: WCAG 2.2 AA for the complete catalogue. Use native `button`, `a`, `input`, `select`, `textarea`, `nav`, `main`, and dialog semantics before adding ARIA. Every interactive control has a visible or programmatic name. Form labels connect to controls, required fields and errors are exposed, and status or toast changes use an appropriate live region.

Focus is always visible. Existing buttons and checkboxes use a `2px` `#1677ff` outline with `2px` offset (`src/index.css:139-142, 324`). Inputs and selects use blue border and a `2px` blue-tinted focus shadow (`:228-250`). Preserve equivalent focus-visible treatment for menus, tabs, pagination, icon buttons, drawers, and dialog controls. Keyboard operation must support Tab, Shift+Tab, Enter or Space where appropriate, and Escape for dismissible overlays.

Interactive targets meet WCAG 2.2 target-size expectations. Use at least `24px` by `24px` for pointer targets, and prefer the existing `36px` header controls and `32px` or larger pagination controls shown in `src/App.tsx:262-267` and `src/pages/Page03Components.tsx:520-527`. Do not rely on hover to reveal essential content. Tooltips supplement, never replace, visible labels or accessible names.

Menus and dialogs:

- Mobile navigation is modal-like off-canvas UI with trigger, backdrop, Escape close, focus containment while open, and trigger-focus return.
- Command palette opens from Ctrl+K or Cmd+K, autofocuses its search field, supports keyboard navigation and activation, has a labelled dialog, fits the viewport, reports the empty result state, and closes on Escape with focus return. Its current result and empty-state structure is at `src/App.tsx:386-432`.
- Notification and user menus close on Escape and outside click, expose menu names and item names, and keep focus within the open surface until dismissal.
- Form modal, confirmation modal, success modal, and drawer follow the same label, initial focus, Escape, focus containment, backdrop, and trigger-return contract. Destructive actions are explicit and distinguishable.

## 6. Motion and visual states

Motion is short and functional. Existing transitions are `0.13s` to `0.2s` for controls and shell, progress uses `0.4s`, skeleton shimmer uses `1.4s`, toast and drawer entry use `0.2s` (`src/index.css:99, 133, 225, 306, 357, 386, 415, 460, 609, 626`). Animate opacity, transform, filter, or progress width only. Never use motion to hide content or block keyboard access.

Provide a `prefers-reduced-motion: reduce` mode that disables nonessential shimmer, toast, drawer, and shell transitions while retaining state changes and readable content. Focus, hover, active, selected, disabled, loading, empty, success, warning, and error states must remain understandable without motion. Disabled controls retain their disabled semantics and do not act as links.

## 7. Change and verification rules

Preserve the navy and blue identity, existing `.ems-*` names, page IDs, desktop catalogue content, and local demo posture. Prefer native browser behavior and CSS media queries. Do not add dependencies, analytics, backend behavior, custom script injection, Storybook, CSS-in-JS, a router, a token build pipeline, or a broad visual rebrand.

A change is contract-complete when the runtime rule in `src/index.css` and this document agree, all affected primitives retain the states above, and browser checks cover `320px`, `768px`, and `1440px`. Verify keyboard navigation, focus visibility and return, Escape dismissal, dialog and menu naming, target sizes, reduced motion, no horizontal overflow, and truthful local demo feedback. Claims belong here only when backed by the cited source or a recorded browser check.
