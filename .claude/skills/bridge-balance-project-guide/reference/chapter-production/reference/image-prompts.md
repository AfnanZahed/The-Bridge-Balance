# Image prompts

**Load only when the user explicitly asks for image prompts. Never by default.**

This skill does not make images. It does not draw diagrams, write `.fig.mjs` modules, generate SVG, or emit Mermaid. That decision is settled: repeated attempts to have Claude Code produce genuinely professional imagery did not reach the bar, and externally generated images did. **Images are the project owner's, made in ChatGPT or MiniMax.** Claude Code's contribution to a chapter is text — all of it, and only it.

The one image-adjacent thing this skill does, *on request*, is write the **prompt**: a precise, self-contained brief the owner can paste into an image generator and get something usable on the first or second try. That is a writing job, which is why it belongs here.

Two things follow, and both matter:

- **Unasked, produce nothing.** No prompt blocks appended to a chapter "in case they're useful", no "here's where an image would go" sections, no placeholder image references in the MDX. The owner generates images from their own prompts most of the time; unrequested prompts are noise in the deliverable.
- **Never reference an image that does not exist.** A chapter ships with the images it actually has. Do not write `![…](/img/…)` pointing at a file nobody has made, and do not leave a TODO in prose.

## The one hard constraint: generators cannot spell

This is the single most important thing on this page, and it determines what you may ask for at all.

Diffusion image models render text as convincing-looking gibberish. A prompt asking for "a flowchart with four boxes labelled Specify, Design, Implement, Verify" returns a handsome picture containing `Speclfy`, `Desgin`, `lmplcment`. This does not improve with better prompting — it is what the tool is.

So:

**Never request an image whose meaning depends on legible text.** No labelled diagrams, no flowcharts, no annotated architecture maps, no charts with axis labels, no UI mockups with readable copy, no code on a screen, no tables.

**Request images whose meaning survives having no text at all.** A scene, an object, a metaphor, a texture, an atmosphere, a moment. Something that sets a tone or anchors a concept emotionally, while the prose carries every precise claim.

If a concept genuinely needs a labelled structural diagram to teach it, **say so plainly and stop** — that is not an image-prompt job, and inventing a prompt for it produces a beautiful, misspelled, unusable picture. Tell the owner it needs a hand-built diagram, and let them decide.

## What a good prompt contains

Six parts, in this order. Write it as flowing instruction, not a labelled form — generators respond better to a coherent description than to a spec sheet.

1. **Subject** — the single concrete thing depicted, stated first and unambiguously.
2. **Composition** — framing, viewpoint, where the subject sits, what surrounds it, depth. "Centred, shot slightly from above, generous empty space around it."
3. **Light and mood** — the emotional register, which is what the image is actually for.
4. **Style and medium** — the rendering approach. Be specific; "digital art" means nothing.
5. **Palette** — see the house identity below.
6. **Exclusions** — what must not appear. Always include "no text, no lettering, no numbers, no watermarks, no logos."

Then, separately from the prompt: **the aspect ratio** and **the alt text you'd write for it** — alt text is prose, so it is yours to draft even though the picture is not.

## The house visual identity

Chapters live on a site built to a strict Apple-design standard, so an image that ignores it looks imported. Encode this into every prompt:

- **A near-monochrome base.** Cool greys and silvers, soft neutral whites, deep near-blacks. The site's own ramp is almost entirely desaturated.
- **One accent, used sparingly.** A single colour carrying meaning, on a small fraction of the frame — never a multi-colour palette competing for attention.
- **Soft, diffuse, directional light.** Blur and elevation over hard borders. Shallow depth of field reads correctly here; harsh flat lighting does not.
- **Restraint over spectacle.** No lens flare, no glow, no neon, no "epic", no chrome, no circuit-board-brain clichés, no glowing blue holograms. The visual register is a well-shot editorial photograph or a quiet, precise illustration — not tech-marketing art.
- **Works in light and dark.** The site is theme-aware. An image with a hard white background lands badly in dark mode. Prefer a subject on a soft, mid-tone, or transparent-feeling ground.

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

## Per-tool notes

**ChatGPT image generation** follows long natural-language prompts closely and handles compositional instructions ("shot from above", "generous negative space") well. Conversational refinement works: it is reasonable to write a prompt expecting one follow-up adjustment. It is also the more literal of the two — if the prompt says a specific object, expect that object.

**MiniMax** responds well to style and mood keywords and to explicit aspect-ratio direction. Front-load the style register.

Where a prompt would differ meaningfully between the two, write the ChatGPT version and note the one change for MiniMax. Do not write two full prompts for the same image.

## Anti-patterns

**Producing image prompts nobody asked for.** The default is no images and no prompts. Wait to be asked.

**Prompting for anything whose meaning depends on legible text.** Generators cannot spell. Say the concept needs a hand-built diagram and stop.

**A prompt that would suit any chapter on this topic.** The same test the prose gets: if it could illustrate a different lesson unchanged, it is decoration. An image earns its place by doing something the paragraph beside it cannot.

**Tech-marketing clichés.** Glowing brains, circuit boards, blue holograms, humanoid robots at keyboards, floating binary. They signal the opposite of the credibility this book is built on.

**Ignoring the house identity** and producing a saturated, high-contrast image that cannot sit on the site.

**Referencing an image that does not exist yet.** A prompt is a prompt. The MDX gets an image reference only once there is a file behind it.

**Drifting back into drawing.** If you find yourself writing SVG, Mermaid, a `.fig.mjs` module, or ASCII art to "show" something — stop. That is not this skill's job any more, in any form.
