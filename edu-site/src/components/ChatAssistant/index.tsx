/**
 * ChatAssistant — the assistant's entry point: a floating trigger in the
 * bottom-right corner that opens into a full-bleed surface.
 *
 * WHAT THIS IS. A designed preview, not a working assistant. There is no API
 * call anywhere in this file, and there must not be one until the phase that
 * owns it opens (`stack.md`'s phased table puts RAG chat in Phase B). Every
 * path that would normally send a message — the send button, Enter — lands on
 * the "under development" reveal instead. That reveal is the only outcome of a
 * real interaction and the only one it is allowed to be: nothing here
 * fabricates an answer, and nothing it says implies a model replied. The
 * `preview build` readout in the header says so from the first frame, so the
 * honesty does not arrive as a surprise at the end.
 *
 * THE COMPOSER. One instrument in two parts, the way the assistant surfaces
 * people already use are built: a field on top, and a control bar under a
 * hairline carrying the mode selector on the left and the send button on the
 * right. The modes are compact pills rather than a wall of cards — six of them
 * sit in a single row that scrolls sideways on a phone instead of wrapping into
 * something taller than the field. The active mode's one-line description is
 * kept as a caption under the bar, so nothing the cards used to explain is
 * lost; it just moves to where the reader is already looking. The caption has
 * to live inside the composer rather than on the panel: the composer's
 * `--tbb-surface` is opaque, while text this small on the panel's 72% glass
 * over the dim cannot clear 4.5:1.
 *
 * WHY IT LOOKS LIKE THIS. The trigger and the panel are built from the house
 * glass recipe (`--tbb-surface-glass` + `--tbb-apple-frost`, a hairline border,
 * the `--tbb-shadow-*` stack) rather than anything new, so the surface reads as
 * the same material as the Spotlight and the SiteMenu drawer. The panel unfolds
 * from the bottom-right corner — the trigger's own corner — because that is
 * what makes opening it read as the button becoming the surface rather than a
 * second thing appearing: scale + rise + a slight `rotateX` under a transform-
 * carried perspective, with the backdrop pulling focus (blur 0 → 18px) behind
 * it. One specular sweep crosses the panel on entry, the way light runs over
 * the metal everywhere else in this system.
 *
 * ACCENT DISCIPLINE (ADR-0003). `--tbb-accent` appears on two things here: the
 * send button and the selected mode pill. Both are interactive, which is the
 * whole of what the accent is for; everything else is the silver ramp. The send
 * button's ink is `--tbb-text-inverse`, which is white in light mode and black
 * in dark mode — so the light-mode accent (L 0.40) and its brighter dark-mode
 * sibling (L 0.75) each hold contrast against their own ink without a second
 * rule.
 *
 * MOTION. Every variant is gated on `useReducedMotion()`; the reduced branch
 * lands instantly rather than ramping, which is what the preference asks for.
 *
 * ACCESSIBILITY. The contract the house overlays carry: a labelled modal
 * dialog, Escape to close, focus into the field on open and back to the trigger
 * on close, Tab cycling inside the overlay, the reveal announced by moving
 * focus to its heading, and touch targets that meet the site's 44px floor on
 * coarse pointers.
 */

import BrandMark from "@site/src/components/BrandMark";
import {
  ArrowUp,
  BookOpen,
  Brain,
  FileText,
  Globe,
  Microscope,
  NotebookPen,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";

import styles from "./styles.module.css";

type Mode = {
  id: string;
  label: string;
  blurb: string;
  Glyph: React.ElementType;
};

/**
 * The six ways in, in the order the owner supplied them. The blurbs are plain
 * language on purpose — they are the only place the assistant explains itself,
 * and a reader who has to decode a mode will not use it.
 */
const MODES: Mode[] = [
  {
    id: "deep-research",
    label: "Deep Research",
    blurb: "Digs through a topic properly before answering.",
    Glyph: Microscope,
  },
  {
    id: "deep-think",
    label: "Deep Think",
    blurb: "Reasons through hard questions instead of guessing.",
    Glyph: Brain,
  },
  {
    id: "document-writer",
    label: "Document Writer",
    blurb: "Drafts real documents and notes for you.",
    Glyph: FileText,
  },
  {
    id: "note-taker",
    label: "Note Taker",
    blurb: "Turns a conversation into organised notes.",
    Glyph: NotebookPen,
  },
  {
    id: "book-aware",
    label: "Book-Aware",
    blurb: "Understands and quotes anything from this book.",
    Glyph: BookOpen,
  },
  {
    id: "world-aware",
    label: "World-Aware",
    blurb: "Understands and explains things outside the book too.",
    Glyph: Globe,
  },
];

/** The house ease-out, as a motion bezier — `--tbb-ease-out`. */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/**
 * The field grows with the draft up to five lines, then scrolls. Measured in px
 * because `scrollHeight` is px; the matching CSS `max-height` is what actually
 * stops it, this only keeps the JS and the CSS from disagreeing.
 */
const FIELD_MAX_PX = 148;

/**
 * The panel's 3D context for its `rotateX` unfold. It rides inside the
 * transform rather than as a `perspective` property on the overlay, because the
 * overlay also carries a `backdrop-filter` — and a filter on the parent
 * flattens the 3D context its children need.
 */
const PANEL_PERSPECTIVE = { transformPerspective: 1600 };

const IDLE_CAPTION = "Choose how it should think — or just ask.";

export type ChatAssistantProps = {
  /** Open on first paint. Only for reviewing the surface. */
  defaultOpen?: boolean;
};

export default function ChatAssistant({
  defaultOpen = false,
}: ChatAssistantProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [revealed, setRevealed] = useState(false);
  const [draft, setDraft] = useState("");
  const [modeId, setModeId] = useState<string | null>(null);
  const reduce = useReducedMotion() ?? false;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLTextAreaElement>(null);
  const revealRef = useRef<HTMLHeadingElement>(null);
  const hasOpenedRef = useRef(defaultOpen);

  const activeMode = MODES.find((mode) => mode.id === modeId) ?? null;

  const open = useCallback(() => {
    // A fresh surface every time. The reveal is a state of this session, not a
    // place to return to.
    setRevealed(false);
    setDraft("");
    setModeId(null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  /**
   * The only outcome a real interaction has. It clears what was typed and sends
   * nothing, because there is nothing to send it to.
   */
  const reveal = useCallback(() => {
    setDraft("");
    setRevealed(true);
  }, []);

  /**
   * Focus the field whenever the compose view mounts — on first open, and again
   * when the reader comes back from the reveal. A callback ref rather than an
   * effect because `AnimatePresence mode="wait"` mounts it only after the other
   * view has finished exiting, which is well after the state change commits.
   */
  const setFieldNode = useCallback((node: HTMLTextAreaElement | null) => {
    fieldRef.current = node;
    node?.focus();
  }, []);

  // Hand focus back to the trigger on close. The trigger unmounts while the
  // panel is up (its exit animation covers the handover), so this runs a commit
  // later — by which point it is back in the tree and the ref is live again.
  useEffect(() => {
    if (isOpen) {
      hasOpenedRef.current = true;
      return;
    }
    if (hasOpenedRef.current) triggerRef.current?.focus();
  }, [isOpen]);

  // Escape closes, and Tab cycles inside the dialog rather than wandering into
  // the page behind it.
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const root = panelRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll<HTMLElement>(
        'button:not([disabled]), textarea, input, [href], [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  // Scroll lock while the surface is up — the same html-attribute pattern the
  // drawer and the Spotlight use, so the rule lives with theirs in custom.css.
  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    root.setAttribute("data-chat-open", "true");
    return () => root.removeAttribute("data-chat-open");
  }, [isOpen]);

  /**
   * Grow the field with its content, then let it scroll. Run from the change
   * handler rather than an effect on `draft`: the textarea is controlled, so by
   * the time `change` fires the element already carries the new text and its
   * `scrollHeight` is current — and an effect would have to depend on a ref,
   * which the linter is right to reject.
   */
  const resizeField = useCallback(() => {
    const field = fieldRef.current;
    if (!field) return;
    field.style.height = "auto";
    field.style.height = `${Math.min(field.scrollHeight, FIELD_MAX_PX)}px`;
  }, []);

  // Land focus on the message itself when the reveal takes over, so a screen
  // reader hears the honest answer rather than staying parked on a field that
  // no longer exists.
  useEffect(() => {
    if (revealed) revealRef.current?.focus();
  }, [revealed]);

  const onFieldKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter submits; Shift+Enter is a new line — the convention every chat
    // surface already taught this reader.
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      reveal();
    }
  };

  const fieldPlaceholder = activeMode
    ? `Ask ${activeMode.label}…`
    : "Ask the book anything…";

  // ── Motion variants ───────────────────────────────────────────────────────
  // Reduced motion still dims and still blurs — those are static appearance,
  // not movement — but both land at once instead of ramping, so the surface
  // simply arrives. `duration: 0` on the transition is what makes it instant.
  const backdrop = reduce
    ? {
        initial: { opacity: 0, backdropFilter: "blur(18px)" },
        animate: { opacity: 1, backdropFilter: "blur(18px)" },
        exit: { opacity: 0, backdropFilter: "blur(18px)" },
      }
    : {
        initial: { opacity: 0, backdropFilter: "blur(0px)" },
        animate: { opacity: 1, backdropFilter: "blur(18px)" },
        exit: { opacity: 0, backdropFilter: "blur(0px)" },
      };

  const panel = reduce
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, scale: 0.9, y: 32, rotateX: 9 },
        animate: { opacity: 1, scale: 1, y: 0, rotateX: 0 },
        exit: { opacity: 0, scale: 0.94, y: 20, rotateX: 4 },
      };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="tbb-chat-trigger"
            ref={triggerRef}
            type="button"
            className={styles.trigger}
            onClick={open}
            aria-label="Ask the book"
            aria-haspopup="dialog"
            aria-expanded={false}
            initial={
              reduce ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: 12 }
            }
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 14 }}
            transition={
              reduce
                ? { duration: 0 }
                : { type: "spring", stiffness: 380, damping: 28, mass: 0.7 }
            }
            whileHover={reduce ? undefined : { y: -2 }}
          >
            <span className={styles.triggerMark} aria-hidden="true">
              <BrandMark variant="glyph" size={22} animated={false} />
            </span>
            <span className={styles.triggerLabel} aria-hidden="true">
              Ask the book
            </span>
            <span className={styles.triggerSweep} aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="tbb-chat-overlay"
            className={styles.overlay}
            variants={backdrop}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={
              reduce ? { duration: 0 } : { duration: 0.42, ease: EASE_OUT }
            }
            onClick={(event) => {
              // Backdrop click closes; clicks inside the panel do not. Checked
              // by target rather than stopPropagation, so the panel needs no
              // handler of its own.
              if (event.target === event.currentTarget) close();
            }}
          >
            <motion.div
              className={styles.panelOuter}
              style={PANEL_PERSPECTIVE}
              variants={panel}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={
                reduce
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 240, damping: 30, mass: 0.9 }
              }
            >
              <div
                className={styles.panel}
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="tbb-chat-title"
              >
                {!reduce && (
                  <motion.span
                    className={styles.sweep}
                    aria-hidden="true"
                    initial={{ opacity: 0, x: "-40%" }}
                    animate={{ opacity: [0, 0.9, 0], x: "40%" }}
                    transition={{
                      duration: 1.15,
                      delay: 0.24,
                      ease: "easeInOut",
                      times: [0, 0.3, 1],
                    }}
                  />
                )}

                <header className={styles.head}>
                  <span className={styles.headBrand} aria-hidden="true">
                    <BrandMark size={24} animated={false} />
                  </span>
                  <p className={styles.readout}>preview build</p>
                  <button
                    type="button"
                    className={styles.close}
                    onClick={close}
                    aria-label="Close the assistant"
                  >
                    <X size={18} strokeWidth={1.75} aria-hidden="true" />
                  </button>
                </header>

                {/* One view at a time, and the composer belongs to the compose
                    view — so it leaves with it rather than being swapped out
                    underneath a field the reader is still typing in. */}
                <div className={styles.body}>
                  <AnimatePresence mode="wait" initial={false}>
                    {revealed ? (
                      <motion.section
                        key="tbb-chat-revealed"
                        className={styles.view}
                        initial={
                          reduce ? { opacity: 0 } : { opacity: 0, y: 14 }
                        }
                        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                        transition={
                          reduce
                            ? { duration: 0 }
                            : { duration: 0.4, ease: EASE_OUT }
                        }
                      >
                        <div className={styles.scroll}>
                          <div className={styles.reveal}>
                            <h2
                              id="tbb-chat-title"
                              className={styles.revealTitle}
                              ref={revealRef}
                              tabIndex={-1}
                            >
                              This isn&rsquo;t switched on yet.
                            </h2>
                            <p className={styles.revealLead}>
                              You have found the preview, and it would rather
                              tell you the truth than pretend: there is no
                              assistant behind this box yet. No model, no
                              request &mdash; and nothing you typed left this
                              page.
                            </p>
                            <p className={styles.revealBody}>
                              What is real is the design you just walked
                              through: six ways in, one question box, and a book
                              that is already written. When the assistant goes
                              live it will read this book properly, answer from
                              it, and show you where every answer came from
                              &mdash; and reach past it when the question needs
                              more.
                            </p>
                            <p className={styles.revealReadout}>
                              no api connected &middot; nothing transmitted
                            </p>
                            <div className={styles.revealActions}>
                              <button
                                type="button"
                                className={styles.primary}
                                onClick={() => setRevealed(false)}
                              >
                                Back to the preview
                              </button>
                              <button
                                type="button"
                                className={styles.quiet}
                                onClick={close}
                              >
                                or close the assistant
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.section>
                    ) : (
                      <motion.section
                        key="tbb-chat-compose"
                        className={styles.view}
                        initial={false}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                        transition={
                          reduce
                            ? { duration: 0 }
                            : { duration: 0.28, ease: EASE_OUT }
                        }
                      >
                        <div className={styles.scroll}>
                          <motion.div
                            className={styles.hero}
                            initial={
                              reduce
                                ? { opacity: 0 }
                                : { opacity: 0, y: 16, filter: "blur(8px)" }
                            }
                            animate={
                              reduce
                                ? { opacity: 1 }
                                : { opacity: 1, y: 0, filter: "blur(0px)" }
                            }
                            transition={
                              reduce
                                ? { duration: 0 }
                                : { duration: 0.46, ease: EASE_OUT }
                            }
                          >
                            <h2 id="tbb-chat-title" className={styles.title}>
                              Ask the book anything.
                            </h2>
                          </motion.div>
                        </div>

                        <motion.footer
                          className={styles.foot}
                          initial={
                            reduce ? { opacity: 0 } : { opacity: 0, y: 18 }
                          }
                          animate={
                            reduce ? { opacity: 1 } : { opacity: 1, y: 0 }
                          }
                          transition={
                            reduce
                              ? { duration: 0 }
                              : { duration: 0.5, delay: 0.24, ease: EASE_OUT }
                          }
                        >
                          <div className={styles.composer}>
                            <div className={styles.composerField}>
                              <label
                                className="sr-only"
                                htmlFor="tbb-chat-field"
                              >
                                Your question
                              </label>
                              <textarea
                                id="tbb-chat-field"
                                ref={setFieldNode}
                                className={styles.input}
                                value={draft}
                                rows={1}
                                placeholder={fieldPlaceholder}
                                onChange={(event) => {
                                  setDraft(event.target.value);
                                  resizeField();
                                }}
                                onKeyDown={onFieldKeyDown}
                                autoComplete="off"
                              />
                            </div>

                            <div className={styles.composerBar}>
                              {/* A real fieldset rather than a div with
                                  role="group" — it groups the six modes for
                                  assistive tech natively, the same choice the
                                  Spotlight makes for its field and shortcut
                                  controls. One mode at a time is the whole
                                  semantics, and `aria-pressed` on each pill is
                                  what makes the active state real to a screen
                                  reader rather than a colour to interpret. */}
                              <fieldset
                                className={styles.modes}
                                aria-label="How it should think"
                              >
                                {MODES.map((mode) => {
                                  const active = modeId === mode.id;
                                  return (
                                    <button
                                      key={mode.id}
                                      type="button"
                                      className={styles.mode}
                                      aria-pressed={active}
                                      title={mode.blurb}
                                      onClick={() =>
                                        setModeId((current) =>
                                          current === mode.id ? null : mode.id,
                                        )
                                      }
                                    >
                                      <span
                                        className={styles.modeGlyph}
                                        aria-hidden="true"
                                      >
                                        <mode.Glyph
                                          size={15}
                                          strokeWidth={1.75}
                                        />
                                      </span>
                                      {mode.label}
                                    </button>
                                  );
                                })}
                              </fieldset>

                              <button
                                type="button"
                                className={styles.send}
                                onClick={reveal}
                                aria-label="Send"
                              >
                                <ArrowUp
                                  size={18}
                                  strokeWidth={2.25}
                                  aria-hidden="true"
                                />
                              </button>
                            </div>

                            <p className={styles.caption}>
                              {activeMode ? activeMode.blurb : IDLE_CAPTION}
                            </p>
                          </div>
                        </motion.footer>
                      </motion.section>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
