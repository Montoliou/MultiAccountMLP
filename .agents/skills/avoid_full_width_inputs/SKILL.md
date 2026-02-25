---
name: avoid_full_width_inputs
description: A strict rule to prevent inputs and action buttons in modals from stretching to full width (w-full).
---

# Avoid Full-Width Inputs and Buttons in Modals

The USER **explicitly and vehemently dislikes** when input fields (`<input>`, `<select>`, etc.) and action buttons (`<button>`) inside modals, sidebars, or generic forms expand to the full width of their container (e.g. via `w-full` logic out of the box). It looks bloated and unpolished.

## Guidelines

1. **NEVER use `w-full` directly on standalone input containers or action buttons** in new UI elements unless the user explicitly requests it for that specific component.
2. **Constrain Input Wrappers:** When building forms, use fixed widths for the input wrappers like `w-48`, `w-56`, or `w-64` (e.g., `<div class="relative w-56">`). You can then use `w-full` purely *inside* that already-constrained wrapper so the input fills exactly 56 Tailwind units.
3. **Pill Buttons:** For buttons, use `w-fit` with generous horizontal padding (e.g., `w-fit px-8 py-3`) instead of `w-full`, so the button takes exactly as much space as the text requires and looks like a classic, well-proportioned dashboard button.
4. If elements are in a flexbox container, do not blindly scatter `flex-1` across all elements if it causes buttons and inputs to stretch unnaturally. Keep forms compact and left-aligned or purposefully structured.

### ❌ Bad Example (Bloated Full Width)
```html
<div class="relative"> <!-- Missing constraint -->
    <input class="w-full border p-2">
</div>
<button class="w-full bg-blue-600 text-white p-3">Neu berechnen</button>
```

### ✅ Good Example (Compact, Fixed Width)
```html
```html
<div class="relative w-56"> <!-- Wrapper is constrained -->
    <input class="w-full border p-2"> <!-- Input fills the 56 units -->
</div>
<button class="w-fit px-8 bg-blue-600 text-white p-3">Neu berechnen</button>
```

## Critical Debugging Step: The CSS Cascade

If you have applied width constraints (e.g., `w-64`, `md:w-1/3`) in the HTML but elements *still* stretch to full width, the issue is almost certainly a **CSS Cascade Conflict** in your Vite setup.

1. **Verify Import Order:** In your main entry file (e.g., `main.js`), ensure that `tailwind-utils.css` is imported **LAST**, after any legacy global CSS files (like `tokens.css` or `main.css`). If legacy files are imported after Tailwind, their generic declarations (like `.w-full`) will override Tailwind's responsive or specific utilities.
2. **Purge Conflicting Utilities:** Search your legacy CSS files for rules like `.flex-col { flex-direction: column; }` or `.w-full { width: 100%; }`. These hardcoded utilities must be deleted, as they will override Tailwind's responsive classes (like `md:flex-row`) if they appear later in the cascade.
