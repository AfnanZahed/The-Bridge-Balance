# Job 19a: what "Reading" can mean, and Composio's free plan (RESEARCH, READ-ONLY)
Effort: max. Live repository C:/Users/Dell/Desktop/Book; never `.claude/worktrees/`; no git. Write only the one file named below. Job 19b is editing site files at the same time; do not touch them.

## Part 1: can the book call its core skill "Reading"?
The owner (a Pakistani, not a native English speaker) wants to name the book's core skill with the word "Reading", in contrast to "Writing" code or syntax. They ask what "reading" actually means, and its hard and soft limits: does it include understanding, understanding the logic, understanding architectural decisions, and being able to make very good architectural and engineering (not just development) decisions? Answer in plain, easy English, with a source (URL or repo path) for every fact.
a. The dictionary senses of "read" and "reading" (Oxford, Cambridge, Merriam-Webster), including the figurative ones (read a situation, read a map, a close reading of a text).
b. "Reading literacy" in international education standards: the OECD PISA definition, exactly, and whether it includes understanding, evaluating and reflecting.
c. "Code reading" and "program comprehension" in software engineering research and practice (for example Spinellis, "Code Reading"; program comprehension models; code review guidance from large engineering organisations): does it include understanding logic, intent, architecture and design decisions? Judging correctness and quality?
d. The limits. Hard limits: what "reading" never covers. Soft limits: what it can stretch to with context. Directly: does "reading" cover making great architectural and engineering decisions? If not, which word honestly covers that part?
e. How a Pakistani student hears it: Urdu "parhna" (also used for "to study") versus "samajhna".
f. The book's own definition and rules: `curriculum-state/canon/thesis.md` (the skill's definition, around lines 61 to 76), `curriculum-state/canon/naming.md` (Rule 1: a name must explain itself to someone who has never programmed), CS-20 in `curriculum-state/canon/course-structure.md` (students write code by hand first), and the homepage hero heading in `edu-site/src/components/HomepageHero/index.tsx` ("engineering judgment").
g. Recommendation: three candidate reader-facing names, including "Reading" alone and the owner's "Reading Literacy". For each: the one-line definition a student would see, pros and cons, whether it passes naming.md Rule 1, and whether "Reading versus Writing" is an honest contrast when students still write specifications and write code by hand first.

## Part 2: Composio's free plan
From composio.dev/pricing and docs.composio.dev only: what the free plan includes (tool calls per month, connected accounts, rate limits), what it excludes, and what makes you start paying. Then the exact setup steps to (a) add Composio's MCP connector in the Claude desktop app so Claude can run posting tools, and (b) let DeepSeek in Command Code use Composio through the SDK or CLI with an API key (where the key comes from, and how to store it without putting it in any repo file).

## Output
`_scratch/job-briefs/2026-09-23/job19a-reading-and-composio.md`, at most 80 lines, plain English. Part 1 ends with a five-line "What this means for the name" summary. Report: the path.
