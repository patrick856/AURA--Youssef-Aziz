# AURA — Mobile Fix Rules

**Scope:** Mobile only. Do not change desktop layout, styles, or breakpoints above 768px.
**Stack:** React 18 + TypeScript + Vite + CSS Modules (no Tailwind, no animation library).
**Method:** Fix one section at a time, in the order listed below. Re-test on mobile viewport (375px–390px) after each section before moving to the next. Do not touch a section marked FINAL without explicit instruction.

## Global rules (apply everywhere)

- Breakpoints: mobile = max-width 480px, small tablet = max-width 768px. Use `max-width` media queries added to existing CSS Modules — do not rewrite component structure to achieve responsiveness.
- Typography: all font-sizes on mobile should scale down using `clamp()` or a mobile-specific rem value — never keep desktop font-size on a narrow viewport.
- Touch targets: minimum 44x44px for any tappable element (buttons, nav icons, links).
- Color palette (do not introduce new colors): `#F7F3EE`, `#E8DCCF`, `#C4A882`, `#9C7B5C`, `#8A9E8C`, `#2E2520`.
- Images: use `object-fit: cover` inside a fixed-aspect-ratio container rather than distorting or stretching source images to fit a new orientation.

---

## 1. Navbar (global component — fix first)

- Reduce logo size for mobile.
- Add a hamburger menu:
  - Three horizontal lines, 1.5px stroke, color `#2E2520`.
  - Animates into an X on open — no circular background, no drop shadow, no bold filled icon.
  - Opens a full-screen or slide-in menu containing existing nav links + the "Selection" button.
- Add separation between navbar and page content:
  - At rest (top of page): no border, transparent/matches hero background.
  - On scroll (once content scrolls beneath it): fade in a 1px bottom border, color `#9C7B5C` at ~20–30% opacity. Alternatively a very subtle `box-shadow` instead of a hard line.
  - Do not use a solid fill or heavy border — should stay quiet and editorial.

## 2. Homepage — Hero section

- Flip vertical order on mobile: **image first, then h1 + p below it.**
- Reason: text sitting directly under the nav reads as crowded; leading with the image gives breathing room and matches the "text flows around imagery" brand direction already in place.
- Adjust spacing so text below the image isn't cramped against it either — needs its own top padding.

## 3. Homepage — Featured section

- "Add to selection" button: convert from plain uppercase text to a **secondary button style** — thin 1px border in `#9C7B5C`, no fill, keep uppercase label. Do NOT use underline (reads as a hyperlink on mobile and will confuse users).
- "The Full Collection" CTA: convert to a **primary button** — solid fill using accent color, light text. This should be the most visually clickable element on the section since it's the main action.

## 4. Font-size pass (batch these — same type of fix)

- About the Studio section: reduce body text size for mobile.
- Selection section: reduce header size for mobile.
- Contact page: reduce header size for mobile.
- Use one consistent mobile type scale across all three rather than separate one-off values.

## 5. Individual product page

- Product name: reduce font size so it doesn't compete with the product image above it.
- "Also in the room": convert from running body text to a small eyebrow-style label — uppercase, small font-size, letter-spacing added, positioned like a section tag rather than a sentence.

## 6. Studio page — Hero

- Reduce hero header size first, test alone before touching the image below.
- Keep existing order (text first, then image) — this page is fine as-is structurally, only needs the header size fixed.
- Image is horizontal on desktop: on mobile, do not stretch/distort into vertical. Place it inside a portrait-ish container (~4:5 aspect ratio) using `object-fit: cover` so the agent can focus-crop on the subject instead of squeezing the full horizontal frame into a narrow box.

---

## Sign-off tracking

As each section is confirmed working on mobile, mark it here so future prompts don't touch it without explicit instruction:

- [x] Navbar
- [x] Homepage hero
- [x] Homepage featured section
- [x] About the Studio
- [x] Selection section
- [x] Individual product page
- [ ] Studio page hero
- [x] Contact page
