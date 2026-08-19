---
sidebar_label: "3. Frontend"
sidebar_position: 4
title: "03 — Frontend"
description: "Next.js, page structure, layouts, responsiveness, components, ShadCN / Material UI / DaisyUI."
keywords: [frontend, nextjs, react, components, ui]
chapter_state: "placeholder"
video_url: ""
---

# 03 — Frontend

> **Core idea:** the user sees only this layer. Everything else exists to feed it.

## Lecture outline

<!-- Placeholder shell. Paste the lecture outline here. -->

- [ ] Page structure: route → layout → component → element
- [ ] Next.js: pages, app router, server vs client components
- [ ] Layouts and responsiveness (mobile-first, breakpoints)
- [ ] Components: props, state, events
- [ ] UI kits: when to use ShadCN, Material UI, or DaisyUI
- [ ] Reading a frontend: start at the URL, follow the props down

## Lecture content

> _Awaiting video lecture._

```text
[Lecture transcript goes here.]
```

## Worked example

```tsx
// A simple responsive card component (React)
export function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border p-4 sm:p-6 md:p-8">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">{title}</h2>
      <div className="mt-2 text-sm sm:text-base">{children}</div>
    </div>
  );
}
```

## Check your understanding

1. What's the difference between a server component and a client component in Next.js?
2. When would you reach for a UI kit instead of writing CSS by hand?
3. Open any website. Identify the layout, the components, and the responsive breakpoints.

## Further reading

- _To be added._
