---
name: verify_tailwind_vite_css_cascade
description: Ensure Tailwind CSS utility classes are not overridden by global or legacy CSS rules when migrating a project to Vite and Tailwind. This prevents hours of debugging responsive layouts that fail to render correctly.
---

# Verify Tailwind & Vite CSS Cascade

When migrating a legacy project to Tailwind CSS using Vite, it is critical to ensure that explicitly defined legacy utility classes do not override Tailwind's responsive utilities.

## The Problem
If a legacy CSS file (e.g., `tokens.css`, `main.css`) contains hardcoded utility classes that share names with Tailwind classes (e.g., `.w-full`, `.flex-col`), they will **always** override Tailwind's responsive variants (e.g., `md:flex-row`, `md:w-1/3`) if the legacy CSS is imported *after* the Tailwind CSS, or if the legacy CSS lacks media queries and simply sits at the end of the stylesheet cascade.

This leads to a confusing development experience where the HTML classes look correct (e.g., `<div class="flex-col md:flex-row w-full md:w-1/3">`), but the browser renders the mobile layout (`flex-col`, `w-full`) even on desktop screens because the legacy `.flex-col` rule takes highest precedence due to CSS specificity and order.

## How to Prevent/Fix This

Follow these mandatory steps when debugging broken Tailwind layouts in a Vite project:

### 1. Enforce Correct CSS Import Order
In your main JavaScript entry file (e.g., `src/main.js`), the order of CSS imports dictates the cascade. **Tailwind utilities MUST be imported LAST** to ensure they override legacy base styles, not the other way around.

```javascript
// BAD IMPORT ORDER:
import './styles/tailwind-utils.css'; // Tailwind loads first
import './styles/tokens.css';         // Legacy overrides Tailwind
import './styles/main.css';           // Legacy overrides Tailwind

// GODO IMPORT ORDER:
import './styles/tokens.css';         // Legacy variables/base load first
import './styles/main.css';           // Local components load second
import './styles/tailwind-utils.css'; // Tailwind utilities load LAST (highest priority)
```

### 2. Purge Legacy Utility Conflicts
Actively search legacy CSS files for rules that replicate Tailwind's functionality. If you are using Tailwind, you do not need custom implementations of standard utilities.

**Search for and remove blocks like this in your legacy CSS:**
```css
/* DELETE THESE CONFLICTING RULES */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.w-full { width: 100%; }
.m-0 { margin: 0; }
.text-center { text-align: center; }
```

Use `grep_search` to find these conflicts:
`grep -r "flex-col" src/*.css src/**/*.css`
`grep -r "w-full" src/*.css src/**/*.css`

### 3. Verify Tailwind Configuration
Ensure that Tailwind is actually compiling the responsive classes.
1. Check that a `postcss.config.js` or `postcss.config.mjs` exists and includes `tailwindcss` and `autoprefixer`.
2. Check `tailwind.config.js` to ensure the `content` array includes all HTML and JS files where Tailwind classes are used.

### 4. Hard-Rebuild and Verification
If the layout is still failing after correcting imports and deleting conflicts:
1. Stop the Vite dev server.
2. Run a hard Tailwind compilation: `npx tailwindcss -i ./src/styles/tailwind-input.css -o ./src/styles/tailwind-utils.css`
3. Restart the dev server: `npm run dev`

### 5. Browser Subagent Debugging
If visual verification is necessary, use the `browser_subagent` to query the computed styles of the failing element.
**Task Prompt Example:**
`Navigate to the page. Run javscript: return window.getComputedStyle(document.querySelector('.md\\:flex-row')).flexDirection. Explain why it is not 'row'.`
