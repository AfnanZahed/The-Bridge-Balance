# Images and diagrams

**Load only when the user explicitly asks for an image prompt or a diagram. Never by default.**

Two different jobs live in this file, for two different tools, because they solve different problems:

- **An atmospheric or photographic image** — a mood, a scene, a texture — is generated externally, by the project owner, from a *prompt* this skill writes on request. **Images are still the project owner's**, made in ChatGPT or MiniMax. Claude Code's contribution here is the prompt, not the picture.
- **A structural or conceptual diagram** — boxes, arrows, a labelled sequence, an architecture map — is built by Claude Code directly, on request, via a diagramming connector (Eraser, Excalidraw, draw.io, or Mermaid rendered to a static image), reopened 2026-09-16 (Constitution Principle III, step 3). The reasons these stay two different tools are below.

Two things follow for both, and both matter regardless of which one applies:

- **Unasked, produce neither.** No prompt blocks appended to a chapter "in case they're useful," no diagrams built speculatively, no "here's where an image would go" sections, no placeholder image references in the MDX. Unrequested output of either kind is noise in the deliverable.
- **Never reference an image that does not exist.** A chapter ships with the images it actually has. Do not write `![…](/img/…)` pointing at a file nobody has made, and do not leave a TODO in prose.

## Why these are two different tools, not one

This is the fact that makes the whole split make sense, so it belongs first.

Diffusion image models (ChatGPT, MiniMax) render text as convincing-looking gibberish. A prompt asking for "a flowchart with four boxes labelled Specify, Design, Implement, Verify" returns a handsome picture containing `Speclfy`, `Desgin`, `lmplcment`. This does not improve with better prompting — it is what the tool is, and it is why the earlier version of this rule banned diagrams outright: the only image-making tool available was a generator, and generators cannot spell.

A diagramming connector (Eraser, Excalidraw, draw.io, Mermaid) is a structurally different tool — it renders actual typed labels, actual boxes, actual arrows, because it is laying out real text and shapes rather than generating pixels from a description. That is the tool for anything a labelled diagram would teach. It was never available to this skill before 2026-09-16; now it is.

**The rule this produces:** if the image's meaning depends on legible text — a flowchart, an annotated architecture map, a labelled sequence, axis labels on a chart — it is a diagram job, built via a connector, not a prompt job. If its meaning survives having no text at all — a scene, an object, a metaphor, an atmosphere — it is a prompt job, for the owner's generator.

## Diagrams — built via a connector, delivered as a static image

On explicit request:

1. Build the diagram in whichever connector fits the content (a flowchart or sequence → Mermaid or Eraser; a freeform architecture sketch → Excalidraw or draw.io).
2. Export it as a static image file (PNG, or SVG treated as a static image asset — not inline SVG markup).
3. Save it under `edu-site/static/img/<chapter-slug>/`, matching how an owner-supplied image is already stored.
4. Reference it in the MDX as a plain markdown image, `![alt text](/img/<chapter-slug>/<name>.png)` — write real, descriptive alt text; the gate checks it.

**Never deliver a diagram as inline Mermaid, raw SVG, or a `.fig.mjs`/JSX module inside the chapter body.** `src/theme/MDXComponents.tsx` registers only `Callout`, `StageBanner`, and the `ChapterState` badge — anything else fails the build, and this has not changed. A diagram is always a file on disk, referenced the same way any other image is, never live code in the MDX.

Hold every diagram to real scrutiny before it ships: the 2026-09-06 restriction this reopens existed because earlier Claude-authored imagery, via a now-deleted compiled pipeline, did not reach a usable bar. A connector-rendered diagram with legible labels solves the specific problem that broke last time (generators can't spell) — it does not automatically clear every other quality bar a diagram has to meet (clarity, correct proportions, actually matching what the prose says). Look at the rendered result before shipping it, the same way any other claim in a chapter gets checked before it ships.

## Prompts — for the owner's generator, when a diagram isn't the right tool

The one image-adjacent thing this skill writes for the owner to run themselves is the **prompt**: a precise, self-contained brief pasted into ChatGPT or MiniMax, for the atmospheric or photographic half of the split above.

### What a good prompt contains

Six parts, in this order. Write it as flowing instruction, not a labelled form — generators respond better to a coherent description than to a spec sheet.

1. **Subject** — the single concrete thing depicted, stated first and unambiguously.
2. **Composition** — framing, viewpoint, where the subject sits, what surrounds it, depth. "Centred, shot slightly from above, generous empty space around it."
3. **Light and mood** — the emotional register, which is what the image is actually for.
4. **Style and medium** — the rendering approach. Be specific; "digital art" means nothing.
5. **Palette** — see the house identity below.
6. **Exclusions** — what must not appear. Always include "no text, no lettering, no numbers, no watermarks, no logos."

Then, separately from the prompt: **the aspect ratio** and **the alt text you'd write for it** — alt text is prose, so it is yours to draft even though the picture is not.

## The house visual identity

Applies to both a generated image and a connector-built diagram — a diagram that ignores it looks imported the same way a mismatched image would.

- **A near-monochrome base.** Cool greys and silvers, soft neutral whites, deep near-blacks. The site's own ramp is almost entirely desaturated.
- **One accent, used sparingly.** A single colour carrying meaning, on a small fraction of the frame — never a multi-colour palette competing for attention.
- **Soft, diffuse, directional light.** Blur and elevation over hard borders. Shallow depth of field reads correctly here; harsh flat lighting does not.
- **Restraint over spectacle.** No lens flare, no glow, no neon, no "epic", no chrome, no circuit-board-brain clichés, no glowing blue holograms. The visual register is a well-shot editorial photograph or a quiet, precise illustration — not tech-marketing art.
- **Works in light and dark.** The site is theme-aware. A hard white background lands badly in dark mode. Prefer a subject on a soft, mid-tone, or transparent-feeling ground.

## Shape of the deliverable

When asked for prompts, produce one block per image, and nothing else:

```
IMAGE 1 — <what it is for, in five words>
Placement:  after the section "<heading>"
Purpose:    <the one thing this image does that the prose cannot>
Aspect:     16:9  (or 4:3, 1:1 — say which and why)

Prompt:
<the prompt itself, 40–120 words, flowing prose, ending with the exclusions>

Negative:   no text, no lettering, no numbers, no watermark, no logo, <topic-specific exclusions>
Alt text:   <the sentence that will ship in the MDX once the image exists>
Filename:   <lesson-slug>/<image-slug>.png
```

Keep prompts to 40–120 words. Shorter loses control of the composition; longer starts contradicting itself, and generators weight early words most heavily — so the subject goes first.

When asked for a diagram, the equivalent deliverable is the connector file's exported image plus the same `Placement` / `Alt text` / `Filename` information — there is no prompt to hand over, since the diagram is built directly rather than requested from a generator.

## Per-tool notes

**ChatGPT image generation** follows long natural-language prompts closely and handles compositional instructions ("shot from above", "generous negative space") well. Conversational refinement works: it is reasonable to write a prompt expecting one follow-up adjustment. It is also the more literal of the two — if the prompt says a specific object, expect that object.

**MiniMax** responds well to style and mood keywords and to explicit aspect-ratio direction. Front-load the style register.

Where a prompt would differ meaningfully between the two, write the ChatGPT version and note the one change for MiniMax. Do not write two full prompts for the same image.

## Anti-patterns

**Producing an image, prompt, or diagram nobody asked for.** The default is still none of the three. Wait to be asked.

**Reaching for a generator prompt when the content needs legible text.** Generators cannot spell — that is a diagram job via a connector, not a prompt job. Say so and build the diagram instead of forcing a prompt that will misspell every label.

**Delivering a diagram as inline Mermaid, raw SVG, or a `.fig.mjs`/JSX module in the chapter body.** A diagram is a static image file, exported from a connector and referenced by a plain markdown image — always, no exceptions, regardless of how small or convenient the inline version would be.

**A prompt or diagram that would suit any chapter on this topic.** The same test the prose gets: if it could illustrate a different lesson unchanged, it is decoration. An image or diagram earns its place by doing something the paragraph beside it cannot.

**Tech-marketing clichés.** Glowing brains, circuit boards, blue holograms, humanoid robots at keyboards, floating binary. They signal the opposite of the credibility this book is built on.

**Ignoring the house identity** and producing a saturated, high-contrast image or diagram that cannot sit on the site.

**Referencing an image or diagram that does not exist yet.** A prompt is a prompt, and a diagram spec is not a diagram. The MDX gets a reference only once there is a file behind it.
