---
id: 0001
title: Implement the search experience — Apple Spotlight on home, ExpandableSearchBar in chapters
stage: green
date: 2026-09-11
surface: agent
model: claude (Command Code agent)
feature: 007-search-experience
branch: none (no version control in this project)
user: afnanzahed@gmail.com
command: none (freeform chat — supplied two reference components and the mechanics they should drive)
labels: ["search", "docusaurus", "frontend", "edu-site", "spotlight", "a11y", "spec-007"]
links:
  spec: specs/007-search-experience/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/007-search-experience/spec.md (new)
  - specs/007-search-experience/plan.md (new)
  - specs/007-search-experience/tasks.md (new)
  - specs/README.md (007 index row)
  - edu-site/src/lib/search.ts (new — shared engine)
  - edu-site/src/lib/stages.ts (new — STAGE_LINKS + stageNumberFromRoute)
  - edu-site/src/components/Search/SearchUXContext.tsx (new — provider: open state, ⌘K, auto-open, scroll lock)
  - edu-site/src/components/Search/AppleSpotlight/index.tsx (new)
  - edu-site/src/components/Search/AppleSpotlight/styles.module.css (new)
  - edu-site/src/components/Search/ExpandableSearchBar/index.tsx (new)
  - edu-site/src/components/Search/ExpandableSearchBar/styles.module.css (new)
  - edu-site/src/components/Search/SearchResultRow/index.tsx (new)
  - edu-site/src/components/Search/SearchResultRow/styles.module.css (new)
  - edu-site/src/theme/SearchBar/index.tsx (rewritten — route split)
  - edu-site/src/theme/Root.tsx (mounts SearchUXProvider; comment updated)
  - edu-site/src/components/SiteMenu/SiteDrawer.tsx (stage entries from STAGE_LINKS)
  - edu-site/src/components/stage-icons/index.tsx (additive StageGlyph export)
  - edu-site/src/css/custom.css (old navbar-search block retired; trigger + scroll-lock)
  - edu-site/src/css/a11y.css (stale search selectors retired)
  - PROJECT-MAP.md (src/lib row; Search/ in the component inventory)
tests:
  - npm run typecheck — clean
  - npx biome check src/lib src/components/Search src/theme/SearchBar — clean (007 files)
  - npm run build — five gates + Docusaurus build green
  - node scripts/axe.mjs http://localhost:4173/stage-01-spec-aware-vibe-engineering/foundations — 0 violations all impacts
  - node scripts/axe.mjs (home) — 1 serious violation, pre-existing .tbb-hero__eyebrow aria-label (HomepageHero, untouched by 007)
  - headless Playwright smoke (temporary script, deleted): 13/13 PASS — auto-open once/session, Escape, Ctrl+K, 4 shortcuts, results (4 rows "frontend"), Enter → /stage-01.../03-frontend, bar circle + focus, results (5 rows "backend"), Enter → /04-backend, no second auto-open, trigger reopen, reduced-motion open
  - grep -rn "navbar__search" edu-site/src — no matches
---

## Prompt

Hi there, there is a search bar in the book...the external mechanics of the book will work like this: 'use client';

import { cn } from '@/lib/utils';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  Calendar,
  ChevronRight,
  Files,
  Folder,
  Globe,
  Image,
  LayoutGrid,
  Mail,
  MessageSquare,
  Music,
  Search,
  Settings,
  StickyNote,
  Terminal,
  Twitter
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface Shortcut {
  label: string;
  icon: React.ReactNode;
  link: string;
}

interface SearchResult {
  icon: React.ReactNode;
  label: string;
  description: string;
  link: string;
}

const SVGFilter = () => {
  return (
    <svg width="0" height="0">
      <filter id="blob">
        <feGaussianBlur stdDeviation="10" in="SourceGraphic" />
        <feColorMatrix
          values="
      1 0 0 0 0
      0 1 0 0 0
      0 0 1 0 0
      0 0 0 18 -9
    "
          result="blob"
        />
        <feBlend in="SourceGraphic" in2="blob" />
      </filter>
    </svg>
  );
};

interface ShortcutButtonProps {
  icon: React.ReactNode;
  link: string;
}

const ShortcutButton = ({ icon, link }: ShortcutButtonProps) => {
  return (
    <a href={link} target="_blank">
      <div className="rounded-full cursor-pointer hover:shadow-lg opacity-30 hover:opacity-100 transition-[opacity,shadow] duration-200">
        <div className="size-16 aspect-square flex items-center justify-center">{icon}</div>
      </div>
    </a>
  );
};

interface SpotlightPlaceholderProps {
  text: string;
  className?: string;
}

const SpotlightPlaceholder = ({ text, className }: SpotlightPlaceholderProps) => {
  return (
    <motion.div
      layout
      className={cn('absolute text-gray-500 flex items-center pointer-events-none z-10', className)}
    >
      <AnimatePresence mode="popLayout">
        <motion.p
          layoutId={`placeholder-${text}`}
          key={`placeholder-${text}`}
          initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {text}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
};

interface SpotlightInputProps {
  placeholder: string;
  hidePlaceholder: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholderClassName?: string;
}

const SpotlightInput = ({
  placeholder,
  hidePlaceholder,
  value,
  onChange,
  placeholderClassName
}: SpotlightInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input when the component mounts
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex items-center w-full justify-start gap-2 px-6 h-16">
      <motion.div layoutId="search-icon">
        <Search />
      </motion.div>
      <div className="flex-1 relative text-2xl">
        {!hidePlaceholder && (
          <SpotlightPlaceholder text={placeholder} className={placeholderClassName} />
        )}

        <motion.input
          ref={inputRef}
          layout="position"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent outline-none ring-none"
        />
      </div>
    </div>
  );
};

interface SearchResultCardProps extends SearchResult {
  isLast: boolean;
}

const SearchResultCard = ({ icon, label, description, link, isLast }: SearchResultCardProps) => {
  return (
    <a href={link} target="_blank" className="overflow-hidden w-full group/card">
      <div
        className={cn(
          'flex items-center text-black justify-start hover:bg-white gap-3 py-2 px-2 rounded-xl hover:shadow-md w-full',
          isLast && 'rounded-b-3xl'
        )}
      >
        <div className="size-8 [&_svg]:stroke-[1.5] [&_svg]:size-6 aspect-square flex items-center justify-center">
          {icon}
        </div>
        <div className="flex flex-col">
          <p className="font-medium">{label}</p>
          <p className="text-xs opacity-50">{description}</p>
        </div>
        <div className="flex-1 flex items-center justify-end opacity-0 group-hover/card:opacity-100 transition-opacity duration-200">
          <ChevronRight className="size-6" />
        </div>
      </div>
    </a>
  );
};

interface SearchResultsContainerProps {
  searchResults: SearchResult[];
  onHover: (index: number | null) => void;
}

const SearchResultsContainer = ({ searchResults, onHover }: SearchResultsContainerProps) => {
  return (
    <motion.div
      layout
      onMouseLeave={() => onHover(null)}
      className="px-2 border-t flex flex-col bg-neutral-100 max-h-96 overflow-y-auto w-full py-2"
    >
      {searchResults.map((result, index) => {
        return (
          <motion.div
            key={`search-result-${index}`}
            onMouseEnter={() => onHover(index)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.2,
              ease: 'easeOut'
            }}
          >
            <SearchResultCard
              icon={result.icon}
              label={result.label}
              description={result.description}
              link={result.link}
              isLast={index === searchResults.length - 1}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

interface AppleSpotlightProps {
  shortcuts?: Shortcut[];
  isOpen?: boolean;
  handleClose?: () => void;
}

const AppleSpotlight = ({
  shortcuts = [
    {
      label: 'Apps',
      icon: <LayoutGrid />,
      link: '/docs/components'
    },
    {
      label: 'Files',
      icon: <Folder />,
      link: '/docs/texts'
    },
    {
      label: 'Actions',
      icon: <Activity />,
      link: '/docs/buttons'
    },
    {
      label: 'Clipboard',
      icon: <Files />,
      link: '/docs/backgrounds'
    }
  ],
  isOpen = true,
  handleClose = () => {}
}: AppleSpotlightProps) => {
  const [hovered, setHovered] = useState(false);
  const [hoveredSearchResult, setHoveredSearchResult] = useState<number | null>(null);
  const [hoveredShortcut, setHoveredShortcut] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);
  };

  const searchResults: SearchResult[] = [
    {
      icon: <Twitter />,
      label: 'Twitter',
      description: 'Follow me on Twitter',
      link: 'https://x.com/samitkapoorr'
    },
    {
      icon: <Globe />,
      label: 'Safari',
      description: 'Open Safari web browser',
      link: 'https://x.com/samitkapoorr'
    },
    {
      icon: <Mail />,
      label: 'Mail',
      description: 'Open Mail application',
      link: 'https://x.com/samitkapoorr'
    },
    {
      icon: <Calendar />,
      label: 'Calendar',
      description: 'View your calendar events',
      link: 'https://x.com/samitkapoorr'
    },
    {
      icon: <StickyNote />,
      label: 'Notes',
      description: 'Open Notes application',
      link: 'https://x.com/samitkapoorr'
    },
    {
      icon: <Image />,
      label: 'Photos',
      description: 'Browse your photo library',
      link: 'https://x.com/samitkapoorr'
    },
    {
      icon: <Settings />,
      label: 'System Settings',
      description: 'Open System Preferences',
      link: 'https://x.com/samitkapoorr'
    },
    {
      icon: <Terminal />,
      label: 'Terminal',
      description: 'Open Terminal application',
      link: 'https://x.com/samitkapoorr'
    },
    {
      icon: <Folder />,
      label: 'Finder',
      description: 'Open Finder file manager',
      link: 'https://x.com/samitkapoorr'
    },
    {
      icon: <MessageSquare />,
      label: 'Messages',
      description: 'Open Messages application',
      link: 'https://x.com/samitkapoorr'
    },
    {
      icon: <Music />,
      label: 'Music',
      description: 'Open Music application',
      link: 'https://x.com/samitkapoorr'
    }
  ];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
            filter: 'blur(20px) url(#blob)',
            scaleX: 1.3,
            scaleY: 1.1,
            y: -10
          }}
          animate={{
            opacity: 1,
            filter: 'blur(0px) url(#blob)',
            scaleX: 1,
            scaleY: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            filter: 'blur(20px) url(#blob)',
            scaleX: 1.3,
            scaleY: 1.1,
            y: 10
          }}
          transition={{
            stiffness: 550,
            damping: 50,
            type: 'spring'
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          onClick={handleClose}
        >
          <SVGFilter />

          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
              setHovered(false);
              setHoveredShortcut(null);
            }}
            onClick={(e) => e.stopPropagation()}
            style={{ filter: 'url(#blob)' }}
            className={cn(
              'w-full flex items-center justify-end gap-4 z-20 group',
              '[&>div]:bg-neutral-100 [&>div]:text-black [&>div]:rounded-full [&>div]:backdrop-blur-xl',
              '[&_svg]:size-7 [&_svg]:stroke-[1.4]',
              'max-w-3xl'
            )}
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                layoutId="search-input-container"
                transition={{
                  layout: {
                    duration: 0.5,
                    type: 'spring',
                    bounce: 0.2
                  }
                }}
                style={{
                  borderRadius: '30px'
                }}
                className="h-full w-full flex flex-col items-center justify-start z-10 relative shadow-lg overflow-hidden border"
              >
                <SpotlightInput
                  placeholder={
                    hoveredShortcut !== null
                      ? shortcuts[hoveredShortcut].label
                      : hoveredSearchResult !== null
                      ? searchResults[hoveredSearchResult].label
                      : 'Search'
                  }
                  placeholderClassName={
                    hoveredSearchResult !== null ? 'text-black bg-white' : 'text-gray-500'
                  }
                  hidePlaceholder={!(hoveredSearchResult !== null || !searchValue)}
                  value={searchValue}
                  onChange={handleSearchValueChange}
                />

                {searchValue && (
                  <SearchResultsContainer
                    searchResults={searchResults}
                    onHover={setHoveredSearchResult}
                  />
                )}
              </motion.div>
              {hovered &&
                !searchValue &&
                shortcuts.map((shortcut, index) => (
                  <motion.div
                    key={`shortcut-${index}`}
                    onMouseEnter={() => setHoveredShortcut(index)}
                    layout
                    initial={{ scale: 0.7, x: -1 * (64 * (index + 1)) }}
                    animate={{ scale: 1, x: 0 }}
                    exit={{
                      scale: 0.7,
                      x:
                        1 *
                        (16 * (shortcuts.length - index - 1) + 64 * (shortcuts.length - index - 1))
                    }}
                    transition={{
                      duration: 0.8,
                      type: 'spring',
                      bounce: 0.2,
                      delay: index * 0.05
                    }}
                    className="rounded-full cursor-pointer"
                  >
                    <ShortcutButton icon={shortcut.icon} link={shortcut.link} />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { AppleSpotlight };
.........at the home page when the website will open, but at the Chapter sites, this will be: 'use client';

import React, { useEffect, useRef, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

import { cn } from '@/lib/utils';

export type ExpandableSearchBarProps = {
  expandDirection?: 'left' | 'right';
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  defaultOpen?: boolean;
  width?: number;
};

const COLLAPSED_SIZE = 40;

export default function ExpandableSearchBar(props: ExpandableSearchBarProps) {
  const {
    expandDirection = 'right',
    placeholder = 'Search...',
    onSearch,
    className = '',
    defaultOpen = false,
    width = 280,
  } = props;

  const [open, setOpen] = useState(defaultOpen);
  const [value, setValue] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const inputPadding = expandDirection === 'right' ? 'pl-11' : 'pl-10';
  const placeholderLeft = expandDirection === 'right' ? 'left-11' : 'left-10';

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (
        !containerRef.current?.contains(e.target as Node) &&
        open &&
        value === ''
      ) {
        setOpen(false);
        setValue('');
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open, value]);

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(id);
    } else {
      setValue('');
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value);
  };

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (
        !containerRef.current?.contains(e.target as Node) &&
        open &&
        value === ''
      ) {
        setOpen(false);
        setValue('');
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open, value]);

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(id);
    } else {
      setValue('');
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
        setValue('');
      }

      if (e.key === 'Enter' && open && value.trim()) {
        onSearch?.(value);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, value, onSearch]);

  return (
    <div
      ref={containerRef}
      className={cn('relative inline-block', className)}
      style={{ width: COLLAPSED_SIZE, height: COLLAPSED_SIZE }}
    >
      {/* Icon button (always visible, overlays left of bar) */}
      <button
        type='button'
        aria-label={open ? 'Close search' : 'Open search'}
        onClick={() => setOpen((s) => !s)}
        className={cn(
          'absolute inset-0 z-20 grid place-items-center rounded-full border',
          'bg-secondary text-foreground/80 hover:text-foreground transition-colors',
          'dark:bg-secondary dark:text-foreground/80 dark:hover:text-foreground'
        )}
      >
        {open ? <X className='size-4' /> : <Search className='size-4' />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.form
            key='form'
            onSubmit={handleSubmit}
            className={cn(
              'absolute top-0 h-10 rounded-full border bg-background text-foreground shadow-sm overflow-hidden flex items-center',
              expandDirection === 'left' ? 'right-0' : 'left-0'
            )}
            initial={{ width: COLLAPSED_SIZE, opacity: 0.98 }}
            animate={{ width: width, opacity: 1 }}
            exit={{
              width: COLLAPSED_SIZE,
              opacity: 0,
              transition: { type: 'spring', stiffness: 260, damping: 26 },
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            {/* Absolutely positioned left search icon */}
            <span className='absolute left-3 z-10 text-muted-foreground'>
              <Search className='size-4' />
            </span>

            <div className='relative flex-1 min-w-0 flex items-center'>
              <input
                ref={inputRef}
                type='text'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className={cn(
                  'w-full bg-transparent text-sm outline-none placeholder-transparent whitespace-nowrap overflow-x-auto',
                  inputPadding
                )}
              />

              <AnimatePresence>
                {open && !value && (
                  <motion.span
                    key='ph'
                    className={cn(
                      'pointer-events-none absolute top-1/2 -translate-y-1/2 w-full truncate text-muted-foreground/80 text-sm select-none text-left',
                      placeholderLeft
                    )}
                    initial={{ opacity: 1, x: 0 }}
                    animate={{ opacity: 0.9, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {placeholder}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence initial={false}>
              {open && (
                <motion.button
                  key='go'
                  type='submit'
                  className='h-10 w-10 grid place-items-center text-muted-foreground hover:text-foreground'
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  aria-label='Search'
                >
                  <Search className='size-4' />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

## Response snapshot

Ported both supplied components into the live Docusaurus site as feature 007-search-experience, keeping their look as supplied and changing only what the stack requires:

- One shared engine (`src/lib/search.ts`) extracted from the retired navbar SearchBar — same scoring (title → heading → body, limit 8, 150ms debounce), one lazy fetch of `/search-index.json`; `src/lib/stages.ts` single-sources the four stage labels/routes (SiteDrawer now consumes it too).
- `AppleSpotlight` on the home route: blob SVG filter, spring entrance/exit, animated placeholder, 64px shortcut circles (now the four stages), live result cards. Auto-opens once per browser session (`sessionStorage`); ⌘K/Ctrl+K and the navbar trigger reopen it. Added the repo's a11y contract the paste lacked: labelled modal dialog, Escape, Tab cycle, focus restore, listbox/option keyboard handling, reduced-motion guard, scroll lock.
- `ExpandableSearchBar` on docs routes: 40px circle → spring-expanded pill (right-anchored), animated placeholder, plus a results dropdown built from the shared result row; combobox/listbox keyboard handling; 40px visual with a 44px invisible hit area.
- `theme/SearchBar` is now a thin route split (`@theme/Navbar/Search` untouched); `Root` mounts the `SearchUXProvider`; the old `navbar__search*` CSS/a11y selectors retired with the surface they styled; Tailwind → CSS Modules on existing `--tbb-*` tokens (no new dependencies); no backend or index-script changes.

## Outcome

- ✅ Impact: search now works as specified — Spotlight on the home route, expandable bar on chapter routes — one engine, one result-card language, no new dependencies, free tier untouched.
- 🧪 Tests: typecheck clean; biome clean on the 007 files; `npm run build` green (five gates + build); axe 0 violations on a chapter page (1 pre-existing home violation, in HomepageHero, untouched); 13/13 headless Playwright smoke checks passed; `navbar__search` gone from src/.
- 📁 Files: see frontmatter — 8 new files (artifacts + 4 component sets + engine/stages + provider), 7 modified, 1 index row.
- 🔁 Next prompts: owner's visual preview pass; decide on the two pre-existing defects surfaced by the audit (`.tbb-hero__eyebrow` aria-label, `axe.mjs` `Set.reduce` crash); decide whether an ADR should record the search-surface decision.
- 🧠 Reflection: `npm run lint` was already failing repo-wide before this feature — the working copy mixes CRLF files with a biome config that mandates LF (and several untouched files have organizeImports/format diffs). 007's files are LF and biome-clean; converting the rest is a separate decision.

## Evaluation notes (flywheel)

- Failure modes observed: initial AppleSpotlight export mismatch (named export vs default import) caught by typecheck; biome a11y rules pushed the hover wrapper from `div` → `fieldset` (semantic group) and the backdrop close from `stopPropagation` → target check.
- Graders run and results (PASS/FAIL): typecheck PASS; biome (007 files) PASS; build PASS; axe chapter page PASS; axe home FAIL (pre-existing, not 007); smoke PASS.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): owner preview in Edge at localhost:3000; if the blob filter misbehaves in a real browser, drop `url(#blob)` from the CSS filter value and keep the blur.
